const Sequelize = require('sequelize');
const { QueryTypes } = require('sequelize');
const sequelize = require('../database.js');

const { Activity, User } = require('../models');

const joinActivityController = {
  joinActivity: async (req, res) => {
    console.log('body', req.body);
    const user = await User.findOne({
      where: {
        pseudo: req.body.pseudo
      },
      include: [{
        model: Activity,
        as: 'activities',
      }],
    });
    console.log(user.activities);

    const verifResult = await sequelize.query(
      `SELECT id FROM "user_has_activity" WHERE "activity_id"=:activity_id AND "user_id"=:user_id;`,
      {
        replacements: {
          activity_id: req.body.id,
          user_id: user.dataValues.id
        },
        type: QueryTypes.INSERT
      }
    );

    if (verifResult[0][0]) {
      res.status(403).json({
        error: "alreadyRegistered"
      })
      return;
    }

    try{
      const result = await sequelize.query(
        `INSERT INTO "user_has_activity" ("user_id", "activity_id") VALUES (':user_id', ':activity_id');`,
        {
          replacements: {
            activity_id: req.body.id,
            user_id: user.dataValues.id
          },
          type: QueryTypes.INSERT
        }
      );
      res.json({
        result: "success"
      })
      const participant_count = await Activity.findByPk(req.body.id);
      newParticipant_count = participant_count.dataValues.participant_count + 1;
      // on incrémente le participant_count
      Activity.update({ participant_count: newParticipant_count }, {
        where: {
          id: req.body.id,
        }
      });
    } catch (error) {
      res.status(403).json({
        error: "errorServer"
      })
      return;
    }
    

},
};

module.exports = joinActivityController;
