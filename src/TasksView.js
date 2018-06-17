import React, { Component } from 'react';

import './TasksView.css';

class TasksView extends Component {

  constructor(props) {
    super(props);

    //bind fnCreateTaskNode method for deleting
    this.fnCreateTaskNode = this.fnCreateTaskNode.bind(this);
  }

  //this method will create individual task view objects (nodes)
  //ideally, this would be its own file - but figuring out how to call the delete
  //  function from the parent component(from childs child) was not as simple as I had hoped
  fnCreateTaskNode(task) {

    console.log('isactive? ' + task.isActive);
    //active class toggle
    const classActive = task.active ? "active" : "";

    //base class name for task priority - will append high, medium, or low
    let classPriorityBase = task.priority > 0 ? "task-priority-" : "";

    //priority description - high medium or low
    let strTaskPriorityDesc = '';

    //set priority description
    switch(task.priority) {
      case 3:
        strTaskPriorityDesc = 'high';
        break;
      case 2:
        strTaskPriorityDesc = 'medium';
        break;
      case 1:
        strTaskPriorityDesc = 'low';
          break;
    }

    //append description to base
    classPriorityBase +=  strTaskPriorityDesc;

    //create string to hold classes
    const classes = `task ${classPriorityBase} ${classActive}`;
    const taskHeadClasses = `task-head ${classActive}`;

    return(
      <div key={task.key} className={classes}>
        <div onClick={() => this.fnToggleTaskActive(task.key)} className={taskHeadClasses}>
          <div className="task-head-title">{task.title} </div>

        <div>

        </div>
        </div>
        <div className="task-body">
          <div className="task-body-priority">
          {strTaskPriorityDesc !== '' &&
            <span className="task-priority-text">{strTaskPriorityDesc} priority</span>
          }
          </div>
          <div className="">{task.description}</div>
          <div className="task-actions">
            <div class="task-action-change-priority">
              <button class="task-action-button button-task-change-priority">change priority</button>
              <div class="task-action-change-priority-options">
                <a className="task-action-change-priority-option-high"
                    onClick={() =>this.fnChangeTaskPriority(task.key, 3)}
                    href="#">
                    high
                </a>
                <a className="task-action-change-priority-option-medium"
                    onClick={() =>this.fnChangeTaskPriority(task.key, 2)}
                    href="#">
                    medium
                </a>
                <a className="task-action-change-priority-option-low"
                    onClick={() =>this.fnChangeTaskPriority(task.key, 1)}
                    href="#">
                    low
                </a>
                <a className="task-action-change-priority-option"
                    onClick={() =>this.fnChangeTaskPriority(task.key, 0)}
                    href="#">
                    none
                </a>
              </div>
            </div>
            <div class="task-action-delete">
              <button className="task-action-button button-task-delete"
                      onClick={() => this.fnDeleteTask(task.key)}>
                delete
              </button>
            </div>
          </div>
        </div>
      </div>
    )

  }

  //call parent method to delete selected class
  fnDeleteTask(key) {
    this.props.delete(key);
  }

  fnToggleTaskActive(key) {
    this.props.toggleActive(key);
  }

  fnChangeTaskPriority(key, priority) {
    this.props.changePriority(key, priority);
  }

  render() {
    //get props task array
    const objPropsTaskArr = this.props.pTasks;

    //create array of task nodes
    const objTaskNodeArr = objPropsTaskArr.map(this.fnCreateTaskNode);

    return(

      <div className="tasks-view">
        <div className="tasks-view-header">All Tasks</div>
        {objTaskNodeArr}
      </div>

    )
  }

}

export default TasksView;
