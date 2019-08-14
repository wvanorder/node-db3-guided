const express = require('express');

const userModel = require('./user-model.js');

const router = express.Router();

router.get('/',(req, res) => {
  userModel.getUsers().then(users => {
    res.status(200).json(users);
  })
  .catch(err => {
    res.status(500).json({ message: 'Internal server error' });
  })
});

router.get('/:id', async (req, res) => {
  const id = req.params.id
 userModel
  .getById(id)
  .then(user => {
    if(user) {
      res.json(user)
    } else {
      res.status(404).json({ message: 'user does not exist' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'internal server error' })
  })
});

router.get('/:id/posts',(req, res) => {
  const { id } = req.params;

  userModel.getUserPosts(id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ message: 'internal server error' })
    })
});

router.post('/', (req, res) => {
  const user = req.body;

  const id = userModel.add(user)
    .then(user => {
      res.status(201).json({ created: id })
    })
    .catch( err => {
      res.status(500).json({ message: 'Failed to create new user' });
    })
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  
  try {
    const count = await userModel.update(id, changes);

    if (count) {
      res.json({ update: count });
    } else {
      res.status(404).json({ message: 'Could not find user with given id' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to update user' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const count = await userModel.remove(id);

    if (count) {
      res.json({ removed: count });
    } else {
      res.status(404).json({ message: 'Could not find user with given id' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete user' });
  }
});

module.exports = router;