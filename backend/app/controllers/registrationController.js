const { User, UserGrade } = require('../models')

const bcrypt = require('bcrypt')
const saltRounds = 10
const jsonwebtoken = require('jsonwebtoken')

const registrationController = {
    
    addUser: async (req, res) => {
        const data = req.body
        const emailChecker = await User.findOne({
            where: {
                email: data.email,
            },
        })
        const pseudoChecker = await User.findOne({
            where: {
                pseudo: data.pseudo,
            },
        })

        if (!emailChecker && !pseudoChecker) {
            const hashPassword = await bcrypt.hash(data.password, saltRounds)
            try {
                const newUser = await User.create(
                    {
                        pseudo: data.pseudo,
                        email: data.email,
                        firstname: data.firstname,
                        lastname: data.lastname,
                        password: hashPassword,
                        avatar: '',
                        reward_count: 0,
                        admin: false,
                        user_grade_id: 1,
                        user_place: {
                            city: data.place.city,
                            address: `${data.place.number} ${data.place.street}`,
                            department: data.place.department,
                            region: data.place.region,
                            google_place_key: '',
                            zip_code: data.place.postal_code,
                            lat: data.place.latitude,
                            lng: data.place.longitude,
                        }
                    },
                    {
                        include: ['user_place'],
                    },
                )

                const newUserGrade = await UserGrade.findByPk(1);

                const jwtSecret = process.env.JWT_SECRET
                const jwtContent = { userId: newUser.id }
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

                res.status(201).json({
                    user: {
                        id: newUser.id,
                        firstname: newUser.firstname,
                        lastname: newUser.lastname,
                        pseudo: newUser.pseudo,
                        points: newUser.reward_count,
                        grade: newUserGrade.name,
                    },
                })
            } catch (error) {
                console.log(error)
            }
        } else if (emailChecker) {
            res.status(409).json({
                error: 'mail',
            })
        } else {
            res.status(409).json({
                error: 'pseudo',
            })
        }
    },
}

module.exports = registrationController
