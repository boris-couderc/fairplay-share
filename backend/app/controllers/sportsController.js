const { Sequelize } = require('sequelize')
const sequelize = require('../database.js')
const Op = Sequelize.Op

const { Sport } = require('../models')
const { distanceCalculSQL } = require('../selectors/distanceCalculSQL')

const sportsController = {
    defaultLimitDistance: 100, // en km

    getSports: async (req, res) => {
        console.log('----------> getSport')
        try {
            const sports = await Sport.findAll()
            if (!sports) {
                res.status(204).json("Error : can't find Sports")
            } else {
                res.json(sports)
            }
        } catch (error) {
            console.trace(error)
            res.status(500).json(error.toString())
        }
    },

    getSportsByLocalisation: async (req, res) => {
        console.log('----------> getSportsByLocalisation')

        let lat = parseFloat(req.query.lat)
        let lng = parseFloat(req.query.lng)

        if (!lat || !lng) {
            res.status(404).json(
                "Error : can't find Sports without Localisation",
            )
        }

        try {
            const sports = await Sport.findAll({
                include: [
                    {
                        association: 'activities',
                        attributes: ['id'],
                        where: {
                            [Op.and]: [
                                sequelize.where(
                                    sequelize.literal(distanceCalculSQL(lat, lng)),
                                    {
                                        [Op.lte]:
                                        sportsController.defaultLimitDistance,
                                    },
                                ),
                                {
                                    activity_status_id: 3,
                                },
                                {
                                    date: {
                                        [Op.gte]: Sequelize.literal(
                                            "NOW() - INTERVAL '1d'",
                                        ),
                                    },
                                },
                            ],
                        },
                    },
                ],
                order: ['id'],
            })
            if (!sports) {
                res.status(204).json("Error : can't find Sports")
            } else {
                res.json(sports)
            }
        } catch (error) {
            console.trace(error)
            res.status(500).json(error.toString())
        }
    },
}

module.exports = sportsController
