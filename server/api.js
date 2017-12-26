const express = require('express');
const apiRouter = express.Router();

const minionsRouter = require('./minions.js')
apiRouter.use('/minions',minionsRouter);

const ideasRouters = require('./ideas.js')
apiRouter.use('/ideas',ideasRouters);

const meetingsRouter = require('./meetings.js')
apiRouter.use('/meetings',meetingsRouter);

module.exports = apiRouter;
