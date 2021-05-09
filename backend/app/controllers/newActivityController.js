const { Activity, User, UserGrade } = require('../models')

const Sequelize = require('sequelize')
const Op = Sequelize.Op

const newActivityController = {
    createNewActivity: async (req, res) => {
        try {
            const sport_id = parseInt(req.body.sport_id)
            const min_participant = parseInt(req.body.min_participant)
            const {
                title,
                description,
                creator_id,
                date,
                time,
                duration,
            } = req.body
            const dataPlace = req.body.place

            const newActivity = await Activity.create(
                {
                    title,
                    description,
                    date,
                    time,
                    duration,
                    min_participant,
                    creator_id,
                    activity_status_id: 3,
                    participant_count: 1,
                    sport_id,
                    activity_place: {
                        address: dataPlace.address,
                        city: dataPlace.city,
                        zip_code: dataPlace.zip_code,
                        region: dataPlace.region,
                        lat: dataPlace.latitude,
                        lng: dataPlace.longitude,
                        private: false,
                        indoor: false,
                    },
                },
                { include: ['activity_place'] },
            )

            // Add motivation points to user
            const user = await User.findByPk(creator_id)
            const new_reward_count = user.dataValues.reward_count + 100
            user.reward_count = new_reward_count

            // Check and update user grade
            const grades = await UserGrade.findAll({
                where: {
                    point: {
                        [Op.lte]: new_reward_count,
                    },
                },
                order: [['point', 'DESC']],
            })
            user.user_grade_id = grades[0].id

            await user.save()
            await newActivity.addUser(user)

            res.status(201).send(newActivity)
            
        } catch (error) {
            console.trace(error)
            res.status(500).json(error.toString())
        }
    },
}

module.exports = newActivityController
