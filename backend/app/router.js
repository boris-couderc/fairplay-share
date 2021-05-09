const express = require('express');
const router = express.Router();

const activityController = require('./controllers/activityController');
const connectionController = require('./controllers/connectionController');
const sportsController = require('./controllers/sportsController');
const newActivityController = require('./controllers/newActivityController');
const registrationController = require("./controllers/registrationController");
const messageController = require("./controllers/messageController");
const joinActivityController = require("./controllers/joinActivityController");
const quitActivityController = require("./controllers/quitActivityController");
const cancelActivityController = require("./controllers/cancelActivityController");
const authorizationMiddleware = require("./middleware/authorization");

router.post('/api/newactivity', authorizationMiddleware, newActivityController.createNewActivity);
router.post('/api/registration', registrationController.addUser);
router.post('/api/connexion', connectionController.getUser);
router.get('/api/activities?', activityController.getLastActivities);
router.post('/api/activity/join',authorizationMiddleware,joinActivityController.joinActivity);
router.post('/api/activity/quit', authorizationMiddleware, quitActivityController.quitActivity);
router.post('/api/activity/cancel', authorizationMiddleware, cancelActivityController.cancelActivity);
router.get('/api/activity/:id', authorizationMiddleware, activityController.getOneActivity); 
router.get('/api/place?', activityController.getActivitiesByUserLocalisation);
router.get('/api/activities/user/:id', authorizationMiddleware, activityController.getActivitiesByUser);
router.get('/api/sports', sportsController.getSports);
router.get('/api/sports/localisation?',sportsController.getSportsByLocalisation,);
router.get('/api/activities/sports?', activityController.getActivitesByUserLocalisationAndSports,);
router.post('/api/activity/:id/messages/',authorizationMiddleware, messageController.addMessageToActivity);

router.use((req, res) => { res.status(404).send('Service does not exists here ...') });

module.exports = router;
