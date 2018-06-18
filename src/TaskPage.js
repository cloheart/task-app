import React, { Component } from 'react';
import TasksView from "./TasksView";
import TaskForm from "./TaskForm";
import './TaskPage.css';

//set up sample data
const objSampleTaskArr = [
  {
    title: 'Add functionality to task nodes',
    description:'I would have liked to finish functionality of the actual tasks, like being able to add sub-tasks, etc.',
    priority: 3,
    active: false,
    dueDate:"2018-06-18 00:00:00",
    key: Date.now()+2
  },
  {
    title: 'Finish the footer...',
    description:'It is there to show that I have control over to grid setup.',
    priority: 2,
    active: false,
    dueDate:"2018-05-27 00:00:00",
    key: Date.now()
  },
  {
    title: 'Make task form closeable',
    description:'I would have liked to make the task form itself toggleable like the individual tasks are.',
    priority: 1,
    active: false,
    dueDate:"2018-04-23 00:00:00",
    key: Date.now()+1
  },
  {
    title: 'React radio buttons',
    description:'React handles radio buttons differently than I expected. I am able to change the hover property, but changing label color on change proved to be more difficult. The syntax for the css selector would take time.',
    priority: 2,
    active: false,
    dueDate:"2018-06-18 00:00:00",
    key: Date.now()+2
  },
  {
    title: 'Change the radio button colors...',
    description:'I know it is doable, but time is a resource I am running out of!',
    priority: 2,
    active: false,
    dueDate:"2018-06-18 00:00:00",
    key: Date.now()+2
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

  render() {
    return (

        <div className="content">
          <h1>Tasks</h1>
          <div className="task-page">

          <TasksView pTasks={this.state.tasks}
                    fnDeleteTask={this.fnDeleteTask}
                    fnToggleTaskActive={this.fnToggleTaskActive}
                    changePriority ={this.fnChangeTaskPriority}
                    fnTest={this.fnTest} />

          <TaskForm fnAddNewTask={this.fnAddNewTask}/>
          </div>
        </div>
    )
  }
}

export default TaskPage;
