const { Activity, User, UserGrade } = require('../models')

const Sequelize = require('sequelize')
const Op = Sequelize.Op

const cancelActivityController = {

    cancelActivity: async (req, res) => {
        const { activityId, userId } = req.body

        try {
            const user = await User.findOne({
                where: {
                    id: userId,
                },
                attributes: [
                    'id',
                    'firstname',
                    'lastname',
                    'pseudo',
                    'reward_count',
                ],
                include: [
                    {
                        association: 'activities',
                        attributes: ['id'],
                        include: [
                            {
                                association: 'creator',
                                attributes: ['id'],
                            },
                        ],
                    },
                    {
                        association: 'user_grade',
                    },
                ],
            })

            // check if user has activity as creator role
            const userHasActivity = user.activities.find(
                activity => activity.creator.id === userId && activity.id === activityId
            )
            if(!userHasActivity) {
                res.status(403).json({
                    error: 'this user has not created this activity',
                })
                return
            }

            // find activity
            const activity = await Activity.findOne({
                attributes: [
                    'id',
                    'participant_count',
                    'activity_status_id',
                ],
                where: {
                    id: activityId,
                },
                include: [
                    {
                        association: 'users',
                        attributes: ['id'],
                    }
                ],
            })

            // change activity status
            activity.activity_status_id = 2
            await activity.save()

            // Remove motivation points to user
            const newUserRewardCount = user.reward_count - 100
            user.reward_count = newUserRewardCount

            // Check and update user grade
            const grades = await UserGrade.findAll({
                where: {
                    point: {
                        [Op.lte]: newUserRewardCount,
                    },
                },
                order: [['point', 'DESC']],
            })
            const newGrade = grades[0].id
            user.user_grade_id = newGrade

            await user.save()

            res.status(200).json({
                user: {
                    points: newUserRewardCount,
                    grade: newGrade,
                },
                activity: {
                    id: activity.id,
                    participantCount: activity.participant_count,
                    activityStatusId: 2,
                }
            })

            return

        } catch (error) {
            res.status(403).json({
                error: 'errorServer',
            })
        }
    },
}

module.exports = cancelActivityController
