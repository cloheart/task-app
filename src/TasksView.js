import React, { Component } from 'react';

import './TasksView.css';
import TaskNode from "./TaskNode";


class TasksView extends Component {

  constructor(props) {
    super(props);

    //bind methods
    //this.fnCreateTaskNode = this.fnCreateTaskNode.bind(this);

    this.fnCreateTaskNodes = this.fnCreateTaskNodes.bind(this);
    this.fnTest = this.fnTest.bind(this);
    this.fnToggleTaskActive = this.fnToggleTaskActive.bind(this);
    this.fnDeleteTask = this.fnDeleteTask.bind(this);
    this.fnChangeTaskPriority = this.fnChangeTaskPriority.bind(this);
  }

  //call parent method to delete selected class
  fnDeleteTask(key) {
    this.props.fnDeleteTask(key);
  }

  fnToggleTaskActive(key) {
    this.props.fnToggleTaskActive(key);
  }

  fnChangeTaskPriority(key, priority) {
    this.props.changePriority(key, priority);
  }

  fnTest() {
    console.log(this.props);
    this.props.test();
  }

  //this method will create individual task view objects (nodes)
  fnCreateTaskNodes(task)
  {
    return(
      <TaskNode task={task}
              fnTest={this.fnTest}
              fnToggleTaskActive={this.fnToggleTaskActive}
              fnChangeTaskPriority ={this.fnChangeTaskPriority}
              fnDeleteTask={this.fnDeleteTask}
              />
    )
  }


  render() {
    //get props task array
    const objPropsTaskArr = this.props.pTasks;

    //create array of task nodes
    const objTaskNodeArr = objPropsTaskArr.map(this.fnCreateTaskNodes);

    //conditional rendering here would be nice to display a message if the tasks are empty!
    return(

      <div className="tasks-view">
        <div className="tasks-view-header">All Tasks</div>
        {objTaskNodeArr}
      </div>

    )
  }

}

export default TasksView;
