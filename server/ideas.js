const express = require('express');
const ideasRouters = express.Router();
const { getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase,
  deleteFromDatabasebyId, deleteAllFromDatabase } = require('./db.js');

ideasRouters.get('/', (req,res,next) => {
  res.send(getAllFromDatabase('ideas'))
})

ideasRouters.get('/:id', (req,res,next) => {
  if (getFromDatabaseById('ideas',req.params.id)) {
    res.send(getFromDatabaseById('ideas',req.params.id));
  } else {
    res.status(404).send();
  }

});


module.exports = ideasRouters;
