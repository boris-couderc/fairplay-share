const { Activity, User } = require('../models')

const Sequelize = require('sequelize')
const sequelize = require('../database.js')
const Op = Sequelize.Op

const { distanceCalculSQL } = require('../selectors/distanceCalculSQL')
const {
    formatActivities,
    formatActivity,
} = require('../selectors/formatActivities')
const { formatDate, formatTime } = require('../selectors/formatDate')

const activityController = {
    defaultNumCardInPage: 8,
    defaultLimitDistance: 100, // km

    getLastActivities: async (req, res) => {
        let page = parseInt(req.query.page)

        if (!page) {
            page = 1
        }
        try {
            const activities = await Activity.findAndCountAll({
                where: {
                    activity_status_id: 3,
                },
                attributes: {
                    exclude: [
                        'activity_status_id',
                        'activity_place_id',
                        'sport_id',
                        'creator_id',
                    ],
                },
                include: [
                    {
                        association: 'sport',
                        attributes: ['name', 'icon'],
                    },
                    {
                        association: 'activity_place',
                        attributes: ['city'],
                    },
                ],
                where: {
                    [Op.and]: [
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
                offset: (page - 1) * activityController.defaultNumCardInPage,
                limit: activityController.defaultNumCardInPage,
                order: [['created_at', 'DESC']],
            })
            if (!activities) {
                res.status(204).json("Error : can't find Activity")
            } else {
                formatedaActivities = formatActivities(activities.rows)
                if (formatedaActivities.length < 1) {
                    res.status(204).json("Error : can't find Activity")
                    return
                }
                res.json({
                    activities: formatedaActivities,
                    count: activities.count,
                })
            }
        } catch (error) {
            console.trace(error)
            res.status(500).json(error.toString())
        }
    },


    getOneActivity: async (req, res) => {
        let id = parseInt(req.params.id)

        try {
            const activity = await Activity.findOne({
                where: {
                    id: id,
                },
                attributes: {
                    exclude: [
                        'activity_place_id',
                        'sport_id',
                        'creator_id',
                    ],
                },
                include: [
                    {
                        association: 'sport',
                        attributes: ['name', 'icon'],
                    },
                    {
                        association: 'activity_place',
                        attributes: {
                            exclude: ['id', 'google_place_key'],
                        },
                    },
                    {
                        association: 'messages',
                        attributes: [
                            'activity_id',
                            'id',
                            'comment',
                            'created_at',
                        ],
                        include: [
                            {
                                association: 'user',
                                attributes: ['id', 'pseudo'],
                            },
                        ],
                    },
                    {
                        association: 'creator',
                        attributes: [
                            'id',
                            'pseudo',
                            'firstname',
                            'lastname',
                            'avatar',
                            'reward_count',
                        ],
                    },
                ],
                order: [['messages', 'created_at', 'DESC']],
            })
            if (!activity) {
                res.status(204).json("Error : can't find Activity")
            } else {
                formatedaActivity = formatActivity(activity)

                if (!formatedaActivity) {
                    res.status(204).json("Error : can't find Activity")
                    return
                }
                res.json(formatedaActivity)
            }
        } catch (error) {
            console.trace(error)
            res.status(500).json(error.toString())
        }
    },


    getActivitiesByUserLocalisation: async (req, res) => {
        let lat = parseFloat(req.query.lat)
        let lng = parseFloat(req.query.lng)
        let page = parseInt(req.query.page)
        let distance = parseInt(req.query.distance)

        if (!lat || !lng) {
            res.status(404).json(
                "Error : can't find Activity without Localisation",
            )
        }
        if (!page) {
            page = 1
        }
        if (!distance) {
            distance = activityController.defaultLimitDistance
        }

        try {
            const activities = await Activity.findAndCountAll({
                attributes: {
                    exclude: ['activity_place_id', 'sport_id', 'creator_id'],
                },
                include: [
                    {
                        association: 'sport',
                        attributes: ['name', 'icon'],
                    },
                    {
                        association: 'creator',
                        attributes: ['pseudo'],
                    },
                    {
                        association: 'activity_place',
                        attributes: {
                            include: [[sequelize.literal(distanceCalculSQL(lat, lng)), 'distance']],
                            exclude: [
                                'id',
                                'google_place_key',
                                'department',
                                'indoor',
                                'private',
                                'region',
                                'zip_code',
                            ],
                        },
                    },
                ],
                where: {
                    [Op.and]: [
                        sequelize.where(
                            sequelize.literal(distanceCalculSQL(lat, lng)),
                            {
                                [Op.lte]:
                                    distance,
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
                offset: (page - 1) * activityController.defaultNumCardInPage,
                limit: activityController.defaultNumCardInPage,
                order: [
                    ['date', 'ASC'],
                    ['time', 'ASC'],
                    ['created_at', 'ASC'],
                ],
            })

            if (!activities) {
                res.status(204).json("Error : can't find Activity")
                return
            }

            formatedaActivities = formatActivities(activities.rows)
            res.json({
                activities: formatedaActivities,
                count: activities.count,
            })
        } catch (error) {
            console.trace(error)
            res.status(500).json(error.toString())
        }
    },

    getActivitesByUserLocalisationAndSports: async (req, res) => {
        let lat = parseFloat(req.query.lat)
        let lng = parseFloat(req.query.lng)
        let page = parseInt(req.query.page)
        let sports = req.query.sports.split(',')
        let distance = parseInt(req.query.distance)

        sports.map((sport) => parseInt(sport))

        if (!lat || !lng) {
            res.status(404).json(
                "Error : can't find Activity without Localisation",
            )
        }
        if (!page) {
            page = 1
        }
        if (!distance) {
            distance = activityController.defaultLimitDistance
        }

        try {
            const activities = await Activity.findAndCountAll({
                include: [
                    {
                        association: 'sport',
                        attributes: ['name', 'icon'],
                    },
                    {
                        association: 'creator',
                        attributes: ['pseudo'],
                    },
                    {
                        association: 'activity_place',
                        attributes: {
                            include: [[sequelize.literal(distanceCalculSQL(lat, lng)), 'distance']],
                            exclude: [
                                'id',
                                'google_place_key',
                                'department',
                                'indoor',
                                'private',
                                'region',
                                'zip_code',
                            ],
                        },
                    },
                ],
                where: {
                    [Op.and]: [
                        sequelize.where(
                            sequelize.literal(distanceCalculSQL(lat, lng)),
                            {
                                [Op.lte]:
                                    distance,
                            },
                        ),
                        {
                            activity_status_id: 3,
                        },
                        {
                            sport_id: {
                                [Op.or]: sports,
                            },
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
                offset: (page - 1) * activityController.defaultNumCardInPage,
                limit: activityController.defaultNumCardInPage,
                order: [
                    ['date', 'ASC'],
                    ['time', 'ASC'],
                    ['created_at', 'ASC'],
                ],
            })

            if (!activities) {
                res.status(204).json("Error : can't find Activity")
                return
            }

            formatedaActivities = formatActivities(activities.rows)
            res.json({
                activities: formatedaActivities,
                count: activities.count,
            })
        } catch (error) {
            console.trace(error)
            res.status(500).json(error.toString())
        }
    },


    getActivitiesByUser: async (req, res) => {
        let page = parseInt(req.query.page)
        let userId = parseInt(req.params.id)

        if (!page) {
            page = 1
        }

        try {
            const user = await User.findByPk(userId, {
                attributes: [
                    'id',
                    'firstname',
                    'lastname',
                    'pseudo',
                    'reward_count',
                ],
                include: ['user_grade'],
            })

            if (!user) {
                console.trace(`can't find user`)
                res.status(500).json(`can't find user`)
                return
            }

            const activities = await Activity.findAll({
                include: [
                    {
                        association: 'users',
                        attributes: ['id', 'pseudo'],
                        where: {
                            id: user.id,
                        },
                    },
                    {
                        association: 'sport',
                        attributes: ['name', 'icon'],
                    },
                    {
                        association: 'activity_place',
                        attributes: ['city'],
                    },
                ],
                where: {
                    date: {
                        [Op.gte]: Sequelize.literal("NOW() - INTERVAL '1d'"),
                    },
                },
                order: [
                    ['date', 'ASC'],
                    ['time', 'ASC'],
                    ['created_at', 'ASC'],
                ],
            })

            let formatedaActivities = []
            if (activities) {
                formatedaActivities = activities.map((activity) => {
                    return {
                        ...activity.dataValues,
                        date: formatDate(activity.date),
                        time: formatTime(activity.time),
                        duration: formatTime(activity.duration),
                    }
                })
            }

            const userForFront = {
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                pseudo: user.pseudo,
                points: user.reward_count,
                grade: user.user_grade.name,
            }

            res.json({ activities: formatedaActivities, user: userForFront })
        } catch (error) {
            console.trace(error)
            res.status(500).json(error.toString())
        }
    },
}

module.exports = activityController
