const express = require('express')
const cors = require('cors');
const session = require('express-session'); 
const app = express()

app.use(cors());

app.use(session({
    secret: 'new-session-key',
    resave: false,
    saveUninitialized: false,
  }));

  function requireAuth(req, res, next) {
    if (req.session.user) {
      next(); // User is authenticated, proceed to the next middleware/route
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  }

const User = require('./models/user.js')

const Task = require('./models/model')



const mongoose = require('mongoose')

const bcrypt = require('bcrypt')

//const { error } = require('console')

const connstring = "mongodb+srv://Admin:Phea2001@cluster0.oobtlwi.mongodb.net/"

mongoose.connect(connstring, {useNewUrlParser: true, useUnifiedTopology: true})

.then(() => {

    //const db = client.db()

    console.log('Connected successfully')

})

.catch((error) => {

    console.error('Connection failed', error);

})

app.use(express.json()) //middleware

 

const saltRound = 10

app.post('/createaccount', (req, res) => {

    bcrypt.hash(req.body.password, saltRound)

    .then(hash => {

        const user = new User({

            username: req.body.username,

            password: hash,

            name: req.body.name,

            surname: req.body.surname,

            emailAddress: req.body.emailAddress,

        })

        user.save()

        .then(result =>{

            res.status(201).json({message: 'User saved'})

        })

        .catch(error =>{

            res.status(500).json({error: 'Failed to save user!'})

        })

    })

    .catch(error => {

        res.status(500).json({error: error, message: 'Failed to hash...'})

    })

})

 

app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    User.findOne({ username })
      .then((user) => {
        if (!user) {
          return res.status(401).json({ error: 'Authentication failed' });
        }
  
        bcrypt.compare(password, user.password)
          .then((match) => {
            if (match) {
              // Store user information in the session
              req.session.user = user;
              res.status(200).json({ message: 'Authentication successful :)' });
            } else {
              res.status(401).json({ error: 'Please check password or username :(' });
            }
          })
          .catch((err) => {
            res.status(500).json({ err: 'Failed to authenticate' });
          });
      })
      .catch((err) => {
        res.status(500).json({ error: 'User not found.' });
      });
  });
  
 

//the '/' represents the path

app.post('/addTasks', async (req,res) =>{

    const newTask = req.body

    console.log(req.body)

    try{

        const newTaskData = await Task.create(newTask)

        res.status(201, newTask).json(newTaskData)

    }

    catch{

        res.status(500).json({error: 'An error occurred'})

    }

})

 

app.get('/tasks', (req, res) => {

Task.find()

.then((newTask) => {

    res.json({

        message: 'Task found!',

        newTask: newTask

        })

    })

})

 

app.delete('/delete/:id', (req,res) => {

Task.deleteOne ({id: req.params.id})

.then((result) => {

    res.status(200).json({message: 'Task removed'})

    })

})


  

 

module.exports = app;

