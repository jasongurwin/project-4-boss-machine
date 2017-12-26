const express = require('express');
const minionsRouter = express.Router();
const { getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase,
  deleteFromDatabasebyId, deleteAllFromDatabase } = require('./db.js');

//Checks to see if ID in is valid
minionsRouter.param('id', (req,res,next,id) => {

  const minion = getFromDatabaseById('minions', id)

  if (minion) {
    req.minion = minion;
    next();
  } else {
    res.status(404).send();
  }

});

minionsRouter.get('/', (req,res,next) => {
  res.send(getAllFromDatabase('minions'));
});

minionsRouter.post('/', (req,res,next) => {
  const minion = addToDatabase('minions',req.body)
  res.status(201).send(minion)

});

minionsRouter.get('/:id', (req,res,next) => {
  res.send(req.minion)

 });

minionsRouter.put('/:id', (req,res,next) => {

  const newMinion = req.body
  const minion = updateInstanceInDatabase('minions', newMinion)

  res.status(200).send(minion)
});

minionsRouter.delete('/:id', (req,res,next) => {

  const deletedMinion = deleteFromDatabasebyId('minions', req.params.id)

  if (deletedMinion) {
    res.status(204).send(deletedMinion)
  } else {
    res.status(500).send(deletedMinion)
  }


});

module.exports = minionsRouter;
