const express = require('express');
const ideasRouter = express.Router();
const { getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase,
  deleteFromDatabasebyId, deleteAllFromDatabase } = require('./db.js');

const checkMillionDollarIdea = require('./checkMillionDollarIdea.js')

  //Checks to see if ID in is valid
  ideasRouter.param('id', (req,res,next,id) => {

    const idea = getFromDatabaseById('ideas', id)

    if (idea) {
      req.idea = idea;
      next();
    } else {
      res.status(404).send();
    }

  });

ideasRouter.get('/', (req,res,next) => {
  res.send(getAllFromDatabase('ideas'))
})

ideasRouter.post('/',checkMillionDollarIdea, (req,res,next) => {
  const idea = addToDatabase('ideas',req.body)
  res.status(201).send(idea)
});

ideasRouter.get('/:id', (req,res,next) => {
  res.send(req.idea);
});

ideasRouter.put('/:id', checkMillionDollarIdea, (req,res,next) => {
  const newIdea = req.body
  const idea = updateInstanceInDatabase('ideas',newIdea)

  if (idea) {
    res.send(idea).status(200)
  } else {

    res.status(500).send();
  }
});

ideasRouter.delete('/:id', (req,res,next) => {

  const deleteIdea = deleteFromDatabasebyId('ideas', req.idea.id)

  if (deleteIdea) {
    res.status(204).send(deleteIdea)
  } else {
    res.status(500)
  }




});



module.exports = ideasRouter;
