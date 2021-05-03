const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')

const { User, Activity } = require('../models')

const { formatDate, formatTime } = require('../selectors/formatDate')

const connectionController = {


    getUser: async (req, res) => {
        const data = req.body
        console.log(data.email)
        const user = await User.findOne({
            where: {  
                email: data.email,
            },
            include: [
                {
                  association: 'user_grade',
                  attributes: ['name'],
                }
            ]
        })

        // Test pour voir si l'email est valide
        if (user === null) {
            res.status(400).json({
                error: "Votre adresse mail n'est pas valide",
            })
            return
        }
        // Test pour voir si le mot de passe est correct
        
        // on compare le mot de passe en clair et le mot de passe hachée de la BDD
        validPwd = bcrypt.compareSync(data.password, user.password)
        if (!validPwd) {
            res.status(400).json({
                error: 'Le mot de passe est incorrect',
            })
            return
        }

        // chargement des activitées du user
        const userActivities = await Activity.findAll({
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
                /*
                {
                    association: 'activity_statut',
                    attributes: {
                        exclude: ['id'],
                    },
                },
                */
                {
                    association: 'activity_place',
                    attributes: ['city'],
                },
                /*
                {
                    association: 'creator',
                    attributes: ['pseudo'],
                },
                */
            ],
            where: {
                date: {
                    [Op.gte]: Sequelize.literal("NOW() - INTERVAL '1d'"),
                },
            },
            order: [
                ['date', 'ASC'],
                ['time', 'ASC']
            ],
        })

        let formatedaUserActivities = []
        if (userActivities) {
            formatedaUserActivities = userActivities.map((activity) => {
                return {
                    ...activity.dataValues,
                    date: formatDate(activity.date),
                    time: formatTime(activity.time),
                    duration: formatTime(activity.duration),
                }
            })
        }

        // create auth token
        const jwtSecret = process.env.JWT_SECRET
        const jwtContent = { userId: user.id }
        const jwtOptions = {
            algorithm: 'HS256',
            expiresIn: '3h',
        }
        const token = jsonwebtoken.sign(
            jwtContent,
            jwtSecret,
            jwtOptions,
        )
        res.cookie('token', token, { httpOnly: true })

        res.status(200).json({
            user: {
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                pseudo: user.pseudo,
                points: user.reward_count,
                grade: user.user_grade.name,
            },
            activities: formatedaUserActivities,
        })

    },
}

module.exports = connectionController
