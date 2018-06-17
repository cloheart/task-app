import React, { Component } from 'react';
import TasksView from "./TasksView";
import './TaskPage.css';

//set up sample data
const objSampleTaskArr = [
  {
    title: 'Go to a movie!',
    description:'Sometimes when we need something to do, we decide to go check out a new movie film! There are a lot of good movies... but also quite a few bad ones.',
    priority: 2,
    active: true,
    key: Date.now()
  },
  {
    title: 'Change cat litter',
    description:'Cats are wonderful creatures that I love very much... but...',
    priority: 3,
    active: false,
    key: Date.now()+2
  },
  {
    title: 'Finish this project!',
    description:'Woah, this has been a journey!',
    priority: 1,
    active: false,
    key: Date.now()+1
  }
];

class TaskPage extends Component {

  constructor(props){
    super(props);

    this.state = {
      tasks:objSampleTaskArr
    };

    this.fnAddTask = this.fnAddTask.bind(this);
    this.fnDeleteTask = this.fnDeleteTask.bind(this);
    this.fnToggleActive = this.fnToggleActive.bind(this);
    this.fnChangeTaskPriority = this.fnChangeTaskPriority.bind(this);
  }

  //add a new task
  fnAddTask(e){
    console.log('fnAddTask()-> Adding new task');

    //get new task title from input
    const inputTaskTitle = this._inputTask.value;

    //if new task title is not empty
    if(inputTaskTitle !== ""){

      //create new task object
      const objNewTask = {
        title: inputTaskTitle,
        priority: 0,
        isActive : false,
        key: Date.now()
      };

      //create new array with previous state tasks (slice() so we have a
      //  new version of the state array)
      const objTempTaskArr = this.state.tasks.slice();

      //push new task to array
      objTempTaskArr.push(objNewTask);

      //set state with new task array
      this.setState({
        tasks: objTempTaskArr
      });

      //reset task title input value
      this._inputTask.value = "";
    }
    //if title empty, throw error
    else
    {
      alert('You have to have a title!');
    }

    //prevent default form action
    e.preventDefault();
  }

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

  fnToggleActive(key){
    console.log('fnToggleActive()-> Toggling active class');

    //create array with state tasks
    const objTempTaskArr = this.state.tasks.slice();

    //find index
    const index = objTempTaskArr.findIndex((task) => task.key === key);
    console.log('selected index:');
    console.log(index)

    //get the selected task
    const objSelectedTask = objTempTaskArr.find((task) => task.key === key);
    console.log('selected task:');
    console.log(objSelectedTask);

    console.log("deleting key " + key +' ' + objSelectedTask.key);
    //create filtered array without the task with the matching key
    const objFilteredTaskArr = objTempTaskArr.filter(function (task) {
      return (task.key !== key);
    });
    console.log("Filtered array: " +objFilteredTaskArr);


    console.log(objSelectedTask);
    let currentState = objSelectedTask.active;
    console.log(currentState);

    objSelectedTask.active = !objSelectedTask.active;
    console.log(objSelectedTask)

    objFilteredTaskArr.splice(index, 0, objSelectedTask);
    console.log(objFilteredTaskArr);

    //set state with new task array
    this.setState({
      tasks: objFilteredTaskArr
    })
  }

  fnChangeTaskPriority(key, priority){
    console.log('fnChangeTaskPriority()-> Changing task priority');

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
/*


    console.log(objSelectedTask);
    let currentState = objSelectedTask.active;
    console.log(currentState);





    */
  }

  render() {
    return (

        <div className="content">
        Task Form!
          <form onSubmit={this.fnAddTask}>
          <input type="text" ref={(a) => this._inputTask = a}
            placeholder="Enter a new task"></input>
          <button type="submit">add</button>
          </form>


          <TasksView pTasks={this.state.tasks}
                    delete={this.fnDeleteTask}
                    toggleActive={this.fnToggleActive}
                    changePriority ={this.fnChangeTaskPriority} />
          </div>
    )
  }
}

export default TaskPage;
