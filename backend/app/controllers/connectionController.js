const { User, Activity } = require('../models')

const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')

const { formatDate, formatTime } = require('../selectors/formatDate')

const connectionController = {

    getUser: async (req, res) => {
        const data = req.body
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

        if (user === null) {
            res.status(400).json({
                error: "Votre adresse mail n'est pas valide",
            })
            return
        }
        
        validPwd = bcrypt.compareSync(data.password, user.password)
        if (!validPwd) {
            res.status(400).json({
                error: 'Le mot de passe est incorrect',
            })
            return
        }

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

        if(process.env.DEPLOYED_APP && process.env.DEPLOYED_APP == 'false'){
            res.cookie('token', token, { 
                httpOnly: true,
            })
        } else {
            res.cookie('token', token, { 
                httpOnly: true, 
                domain: process.env.DOMAIN,
                sameSite: 'none',
                secure: true,
            })
        }
        
        res.status(200).json({
            user: {
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                pseudo: user.pseudo,
                points: user.reward_count,
                grade: user.user_grade.name,
                test: 'test 1',
            },
            activities: formatedaUserActivities,
        })

    },
}

module.exports = connectionController
