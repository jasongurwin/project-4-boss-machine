const express = require('express');
const meetingsRouter = express.Router();
const { getAllFromDatabase, getFromDatabaseById,addToDatabase, updateInstanceInDatabase,
  deleteFromDatabasebyId, deleteAllFromDatabase } = require('./db.js');

meetingsRouter.get('/', (req,res,next) => {
  res.send(getAllFromDatabase('meetings'))
})



module.exports = meetingsRouter;
