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

minionsRouter.get('/:id/work', (req,res,next) => {

  const minionWork = getAllFromDatabase('work').filter(workByMinion => workByMinion.minionId === req.params.minionId);
  res.send(minionWork)

});


minionsRouter.post('/:id/work', (req,res,next) => {

  const work = addToDatabase('work',req.body)
  res.status(201).send(work)
});


minionsRouter.param('workId', (req, res, next, id) => {
  const work = getFromDatabaseById('work', id);
  if (work) {
    req.work = work;
    next();
  } else {
    res.status(404).send();
  }
});

minionsRouter.put('/:id/work/:workId', (req, res, next) => {
  if (req.params.id !== req.body.minionId) {
    res.status(400).send();
  } else {
    updatedWork = updateInstanceInDatabase('work', req.body);
    res.send(updatedWork);
  }
});

minionsRouter.delete('/:id/work/:workId', (req, res, next) => {
  const deleted = deleteFromDatabasebyId('work', req.params.workId);
  if (deleted) {
    res.status(204);
  } else {
    res.status(500);
  }
  res.send();
});




module.exports = minionsRouter;
