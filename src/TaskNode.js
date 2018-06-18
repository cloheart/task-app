import React, { Component } from 'react';

import './TaskNode.css';

//simple function to return the correct description for the givin priority value
const fnGetPriorityDescription = (pVal) => {

  //attempted to clean this up, but moved on - also tried creating a 'util' class, but no luck
  //pVal == 3 ? return 'high' : (pVal == 2 ? return 'medium' : (pVal == 1 ? return 'low') : 'none'));

  if(pVal == 3)
  {
    return 'high'
  }
  else if(pVal == 2)
  {
    return 'medium'
  }
  else if(pVal == 1)
  {
    return 'low'
  }
  else
  {
    return 'none'
  }

}

//simple function to return the formatted due date string
const fnGetDueDateDescription = (pDate) => {
  let strDateDisplay = '';

  //if date is not empty
  if(pDate)
  {
    const objDueDate = new Date(pDate);
    const strMonth = objDueDate.getMonth() + 1;
    const strDay = objDueDate.getDate();

    strDateDisplay = strMonth + '-' + strDay;
    console.log('fnGetDueDateDescription() date: ' + strDateDisplay);
  }


  return strDateDisplay;
}

class TaskNode extends Component {

  constructor(props) {
    super(props);

    //bind
    this.fnTest = this.fnTest.bind(this);
    this.fnToggleTaskActive = this.fnToggleTaskActive.bind(this);
    this.fnDeleteTask = this.fnDeleteTask.bind(this);
    this.fnToggleTaskActive = this.fnToggleTaskActive.bind(this);
    this.fnChangeTaskPriority = this.fnChangeTaskPriority.bind(this);
  }

  fnTest() {
    this.props.fnTest();
  }

  //call parent method to delete selected class
  fnDeleteTask(key) {
    this.props.fnDeleteTask(key);
  }

  fnToggleTaskActive(key) {
    this.props.fnToggleTaskActive(key);
  }

  fnChangeTaskPriority(key, priority) {
    this.props.fnChangeTaskPriority(key, priority);
  }

  render() {

    //components - could be outside class if it wasn't calling a method... had trouble with 'this'
    //sfc component - priority option - builds list item for priority options
    const PriorityOptionNode = ({pKey, pValue}) => {
      //base value for priority option class
      let strClassName = "task-action-change-priority-option";

      const strPriorityOptionDescription = fnGetPriorityDescription(pValue);
      if(strPriorityOptionDescription !== '' && strPriorityOptionDescription !== 'none' )
      {
        strClassName += "-" + strPriorityOptionDescription;
      }

      return(
        <li key={pKey} className={strClassName} onClick={() =>this.fnChangeTaskPriority(pKey, pValue)}>
          {strPriorityOptionDescription}
        </li>
      );
    }

    //start render
    //get task object from props
    const pTask = this.props.task;

    //get whether or not the class is active
    const strClassActive = pTask.active ? "active" : "";

    //base class name for task priority - will append high, medium, low or none
    let classPriorityBase = "task-priority-";

    //priority description - high medium low or none
    let strTaskPriorityDesc = fnGetPriorityDescription(pTask.priority);

    //append priority description to class base
    classPriorityBase += strTaskPriorityDesc;

    //create string to hold classes
    const classes = `task ${classPriorityBase} ${strClassActive}`;
    const taskHeadClasses = `task-head ${strClassActive}`;

    const dueDate = fnGetDueDateDescription(pTask.dueDate);


    return (
      <div key={pTask.key} className={classes}>
        <div onClick={() => this.fnToggleTaskActive(pTask.key)} className={taskHeadClasses}>
          <div className="task-head-title">{pTask.title} </div>
        <div>

        </div>
        </div>
        <div className="task-body">
          <div className="task-body-details">
          {strTaskPriorityDesc !== '' &&  strTaskPriorityDesc !== 'none' &&
            <span>{strTaskPriorityDesc} priority</span>
          }
          {dueDate !== '' &&
            <span>{dueDate}</span>
          }
          </div>
          <div className="task-body-description">
            {pTask.description}
          </div>

          <div className="task-actions">
            <div class="task-action-change-priority">
              <button class="task-action-button button-task-change-priority">change priority</button>
              <div class="task-action-change-priority-options">
                <ul>
                  <PriorityOptionNode pKey={pTask.key} pValue='3' />
                  <PriorityOptionNode pKey={pTask.key} pValue='2' />
                  <PriorityOptionNode pKey={pTask.key} pValue='1' />
                  <PriorityOptionNode pKey={pTask.key} pValue='0' />
                </ul>
              </div>
            </div>
            <div class="task-action-delete">
              <button className="task-action-button button-task-delete"
                      onClick={() => this.fnDeleteTask(pTask.key)}>
                      delete
              </button>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TaskNode;
