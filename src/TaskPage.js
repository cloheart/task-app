import React, { Component } from 'react';
import TasksView from "./TasksView";
import TaskForm from "./TaskForm";
import './TaskPage.css';

//set up sample data
const objSampleTaskArr = [
  {
    title: 'Go to a movie!',
    description:'Sometimes when we need something to do, we decide to go check out a new movie film! There are a lot of good movies... but also quite a few bad ones. Soemtimes they are so bad that I feel like leaving... the last time I left was Fast and the Furious 17.',
    priority: 2,
    active: false,
    dueDate:"2018-05-27 00:00:00",
    key: Date.now()
  },
  {
    title: 'Change cat litter',
    description:'Cats are wonderful creatures that I love very much... but...',
    priority: 0,
    active: false,
    dueDate:"2018-04-23 00:00:00",
    key: Date.now()+2
  },
  {
    title: 'Finish this project!',
    description:'Woah, this has been a journey!',
    priority: 1,
    active: false,
    dueDate:"2018-03-21 00:00:00",
    key: Date.now()+1
  }
];

class TaskPage extends Component {

  constructor(props){
    super(props);

    this.state = {
      tasks:objSampleTaskArr
    };

    //bind actions
    this.fnAddNewTask = this.fnAddNewTask.bind(this);
    this.fnDeleteTask = this.fnDeleteTask.bind(this);
    this.fnToggleTaskActive = this.fnToggleTaskActive.bind(this);
    this.fnChangeTaskPriority = this.fnChangeTaskPriority.bind(this);
    this.fnTest = this.fnTest.bind(this);
  }

  //add a new task
  fnAddNewTask(pTask){
    console.log('fnAddTask()-> Adding new task');

    //if new task title is not empty - simple safeguard
    if(pTask.title !== ""){

      //create new array with previous state tasks (slice() so we have a
      //  new version of the state array)
      const objTempTaskArr = this.state.tasks.slice();

      //push new task to array
      objTempTaskArr.push(pTask);

      //set state with new task array
      this.setState({
        tasks: objTempTaskArr
      });

    }
    //if title empty, throw error
    else
    {
      alert('You have to have a title!');
    }

  }

  //delete a task
  fnDeleteTask(key) {
    console.log('fnDeleteTask()-> Deleting task');

    //create new array with previous state tasks
    const objTempTaskArr = this.state.tasks.slice();

    //create filtered array without the task with the matching key
    const objFilteredTaskArr = objTempTaskArr.filter(function (task) {
      return (task.key !== key);
    });

    //set state with new task array
    this.setState({
      tasks: objFilteredTaskArr
    })
  }

  //toggle the active state of a task
  fnToggleTaskActive(key){
    console.log('fnToggleActive()-> Toggling active class');

    //create temp array with state tasks
    let objTempTaskArr = this.state.tasks.slice();

    //find index of the selected task
    const index = objTempTaskArr.findIndex((task) => task.key === key);

    //get the selected task object out of the temp array
    const objSelectedTask = objTempTaskArr.find((task) => task.key === key);

    //filter temp array to remove the task with the matching key
    objTempTaskArr = objTempTaskArr.filter(function (task) {
      return (task.key !== key);
    });

    //switch active boolean
    objSelectedTask.active = !objSelectedTask.active;

    //put the selected task back in the array where we found it
    objTempTaskArr.splice(index, 0, objSelectedTask);

    //set state with new task array
    this.setState({
      tasks: objTempTaskArr
    })
  }

  fnChangeTaskPriority(key, priority){
    console.log('fnChangeTaskPriority()-> Changing task priority');
    //console.log('fnChangeTaskPriority()-> Changing ' + key + ' to ' + priority);

    //create temp array with state tasks
    let objTempTaskArr = this.state.tasks.slice();

    //find index of the selected task
    const index = objTempTaskArr.findIndex((task) => task.key === key);

    //get the selected task object out of the temp array
    const objSelectedTask = objTempTaskArr.find((task) => task.key === key);

    //filter temp array to remove the task with the matching key
    objTempTaskArr = objTempTaskArr.filter(function (task) {
      return (task.key !== key);
    });

    //set new priority value
    objSelectedTask.priority = priority;

    //put the selected task back in the array where we found it
    objTempTaskArr.splice(index, 0, objSelectedTask);

    //set state with new task array
    this.setState({
      tasks: objTempTaskArr
    })
  }

  fnTest(){
    alert('This is a test!');
  }

/*
<div className="task-form">
Task Form!
  <form onSubmit={this.fnCreateNewTask}>
  <input
    type="text"
    ref={(a) => this._inputTitle = a}
    placeholder="title"></input>
  <textarea
    ref={(a) => this._inputDescription = a}
    placeholder="description"></textarea>

  <button type="submit">add</button>
  </form>
  </div>
*/

  render() {
    return (

        <div className="content">

        <TaskForm fnAddNewTask={this.fnAddNewTask}/>


          <TasksView pTasks={this.state.tasks}
                    fnDeleteTask={this.fnDeleteTask}
                    fnToggleTaskActive={this.fnToggleTaskActive}
                    changePriority ={this.fnChangeTaskPriority}
                    fnTest={this.fnTest} />
          </div>
    )
  }
}

export default TaskPage;
