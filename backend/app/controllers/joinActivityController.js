const Sequelize = require('sequelize')
const { QueryTypes } = require('sequelize')
const sequelize = require('../database.js')
const Op = Sequelize.Op

const { Activity, User, UserGrade } = require('../models')

const joinActivityController = {

    joinActivity: async (req, res) => {
        const { activityId, userId } = req.body

        try {
            // check user and his activities
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
                    },
                    {
                        association: 'user_grade',
                    }
                ],
            })
            
            // check if user if not already registered
            const userActivitiesIds = user.activities.map(activity => activity.id)

            const alreadyJoin = userActivitiesIds.find(
                (id) => id == activityId,
            )
            if(alreadyJoin) {
                res.status(403).json({
                    error: 'already join',
                })
                return
            }

            // find activity
            const activity = await Activity.findOne({
                attributes: [
                    'id',
                    'participant_count',
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

            // join activity to user
            await user.addActivity(activity)
            activity.participant_count = activity.users.length + 1
            await activity.save()

            
            // Add motivation points to user
            const newUserRewardCount = user.reward_count + 10
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

module.exports = joinActivityController
