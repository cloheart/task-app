import React, { Component } from 'react';

import './TaskForm.css';

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

class TaskForm extends Component {
  constructor(props) {
    super(props);

    //create state
    this.state = {
       selectedPriority: '0'
    };

    //bind functions
    this.fnCreateNewTask = this.fnCreateNewTask.bind(this);
    this.fnHandlePriorityChange = this.fnHandlePriorityChange.bind(this);
  }

  //fuction to handle form submission and creation of new task
  fnCreateNewTask(e) {

    //prevent default form action
    e.preventDefault();

    console.log('fnCreateNewTask()-> Creating new task');

    //get new task title from input
    const inputTaskTitle = this._inputTitle.value;

    //if new task title is not empty
    if(inputTaskTitle != ""){

      //get other input values
      const inputTaskDescription = this._inputDescription.value;

      //create new task object
      const objNewTask = {
        title: inputTaskTitle,
        description: inputTaskDescription,
        priority: this.state.selectedPriority,
        isActive : false,
        key: Date.now()
      };

      //send to parent method to add the new task
      this.props.fnAddNewTask(objNewTask);

      //reset task title input value
      this._inputTitle.value = "";
      this._inputDescription.value = "";

    }
  }

  //function to handle priority radio buttons
  fnHandlePriorityChange(e)
  {
    console.log('fnHandlePriorityChange()-> ' + this.state.selectedPriority);

    //set new state value
    this.setState({
      selectedPriority: e.currentTarget.value
    })

  }


  render() {

    const InputPriorityRadioButton = ({pVal}) => {
      const strPriorityOptionDescription = fnGetPriorityDescription(pVal);
      return(
        <label className={strPriorityOptionDescription}>
          <input type="radio" className="radio-btn" value={pVal} checked={this.state.selectedPriority == pVal}
            onChange={this.fnHandlePriorityChange} />
            {strPriorityOptionDescription}
        </label>
      );
    }

    return(

      <div className="task-form">
        New Task Form!
        <form onSubmit={this.fnCreateNewTask}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            ref={(a) => this._inputTitle = a}
            placeholder="enter title"></input>
        </div>
        <div className="form-group">
          <textarea
            className="form-control"
            ref={(a) => this._inputDescription = a}
            placeholder="enter description"></textarea>
        </div>
        <div className="form-group task-priority-options">
          <p>priority</p>
          <InputPriorityRadioButton pVal="3" />
          <InputPriorityRadioButton pVal="2" />
          <InputPriorityRadioButton pVal="1" />
          <InputPriorityRadioButton pVal="0" />
        </div>
        <div className="form-actions disp-flex">
          <button className="form-btn btn-right" type="submit">Submit</button>
        </div>
        </form>
        </div>

    )
  }

}

export default TaskForm;
