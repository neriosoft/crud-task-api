const express = require('express');
const app = express();

const mongoose = require('./database/mongoose');
const TaskList = require('./database/models/tasklist');
const Task = require('./database/models/task');

/*
####################################################################
CORS - Cross Origin Request Security | 3rd party - app.use(cors());
Backend - http://localhost:3000
Frontend - http://localhost:4200
####################################################################
*/
app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:4200');
    //Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    //Request header you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');
    //Set to true if you need the website to include cookies in the request sent
    //res.setHeader('Access-Control-Allow-Credentials', true);
    return next();
  });

//next middleware
app.use(express.json());  // or 3rd party library - bodyParser

/*
###############################################
REST API endpoints/RESTFUL webservices
TaskList routes - Create, Update. ReadTaskListById, ReadAlltaskList
Task - Create, Update. ReadTaskById, ReadAlltask
###############################################
*/

//select all tasklist
app.get('/tasklists', (req,res) => {
    TaskList.find({})
    .then((lists) => {
      res.status(200).send(lists)})
    .catch((error) => {
      console.log(error);
      res.status(500)
    });
});

/*
############################
  Fetch a task by id
############################
*/
app.get('/tasklists/:tasklistId', (req, res) => {
    let tasklistId = req.params.tasklistId;
    TaskList.find({_id: tasklistId})
    .then((taskList) => {
      res.status(200).send(taskList)
    })
    .catch((error) => {
      console.log(error);

    })
  }
);

/*
############################
  Full Update
############################
*/

app.put('/tasklists/:tasklistId', (req, res) => {
  TaskList.findOneAndUpdate({_id: req.params.tasklistId}, {$set: req.body})
  .then((taskList) => {
    res.status(200).send(taskList)
  })
  .catch((error) => {
    console.log(error);

  })
});

/*
############################
  Patial Update
############################
*/
app.patch('/tasklists/:tasklistId', (req, res) => {
  TaskList.findOneAndUpdate({_id: req.params.tasklistId}, {$set: req.body})
  .then((taskList) => {
    res.status(200).send(taskList)
  })
  .catch((error) => {
    console.log(error);

  })
});
/*
############################
  Delete tasklist by id
############################
*/
app.delete('/tasklists/:tasklistId', (req, res) => {
  TaskList.findByIdAndDelete( req.params.tasklistId )
  .then((taskList) => {
    res.status(201).send(taskList)
  })
  .catch((error) => {
    console.log(error);

  })
});
/*
############################
 create tasklist
############################
*/
app.post('/tasklists',(req, res) => {
  //console.log('This is post request on tasklist')
  let taskListObject = { 'title': req.body.title};
  TaskList(taskListObject).save()
  .then((lists) => {
    res.status(201).send(lists)
  })
  .catch((error) => {
    console.log(error);
    res.status(500);
  })
});
/*
###########################################################
CRUD Operation for task. A task should belong to a tasklist
###########################################################
*/
//All task
app.get('/tasklists/:tasklistId/tasks', (req,res) => {
    Task.find({_taskListId: req.params.tasklistId})
    .then((tasks) => {
      res.status(201).send(tasks)
    })
    .catch((error) => {
      console.log(error);
      res.status(500);
    })
})

//Create a task
app.post('/tasklists/:tasklistId/tasks',(req, res) => {
  //console.log('This is post request on tasklist')
  let taskObject = { 'title': req.body.title, '_taskListId':req.params.tasklistId};
  Task(taskObject).save()
  .then((task) => {
    res.status(201).send(task)
  })
  .catch((error) => {
    console.log(error);
    res.status(500);
  })
});

//One task within a tasklist
app.get('/tasklists/:tasklistId/tasks/:taskId', (req,res) => {
  Task.findOne({_taskListId: req.params.tasklistId, _id: req.params.taskId})
  .then((task) => {
    res.status(201).send(task)
  })
  .catch((error) => {
    console.log(error);
    res.status(500);
  })
})

//Update one task belonging to a tasklist
app.patch('/tasklists/:tasklistId/tasks/:taskId', (req, res) => {
  Task.findOneAndUpdate({_taskListId: req.params.tasklistId, _id: req.params.taskId}, {$set: req.body})
  .then((task) => {
    res.status(200).send(task)
  })
  .catch((error) => {
    console.log(error);

  })
});

//find one task belonging to a tasklist and delete
app.delete('/tasklists/:tasklistId/tasks/:taskId', (req, res) => {
  Task.findOneAndDelete({_taskListId: req.params.tasklistId, _id: req.params.taskId})
  .then((task) => {
    res.status(200).send(task)
  })
  .catch((error) => {
    console.log(error);

  })
});

app.listen(3000, ()=> console.log('Server started on port 3000')
);