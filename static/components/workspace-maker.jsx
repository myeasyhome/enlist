

// BOXES

// Enter email and passowrd
// Workspace name and total members

class UserBox extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="user-box">
        <input className="data-input" type="text" name="f-name" placeholder="First name" onChange={this.props.changeHandler}/>
        <input className="data-input" type="text" name="l-name" placeholder="Last name" onChange={this.props.changeHandler}/>
        <input className="data-input" type="email" name="email" placeholder="Email address" onChange={this.props.changeHandler}/>
        <input className="data-input" type="password" name="password" placeholder="Password" onChange={this.props.changeHandler}/>
      </div>
    )
  }
}

class WorkspaceBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="workspace-box">
        <input className="data-input" type="text" name="w-name" placeholder="Workspace name" onChange={this.props.changeHandler} />
      </div>
    )
  }
}

class SubmitBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button id="finish-btn" type="submit" onClick={this.props.submitHandler.bind(this)}>Finish</button>
    )
  }
}

class ArrowButton extends React.Component {
  constructor(props) {
    super(props);
  }

  createId() {
    return `move-btn-${this.props.direction}`;
  }

  // Apply classes depending on stageChange
  setClasses() {
    let classes = "move-btn";

    if (this.props.cStage == 1) {
      if (this.createId() == "move-btn-left") {
        classes += " move-btn-disabled";
      } else {
        classes += " move-btn-active";
      }
    } else if (this.props.cStage == 3) {
      if (this.createId() == "move-btn-right") {
        classes += " move-btn-disabled";
      } else {
        classes += " move-btn-active";
      }
    } else {
      classes += " move-btn-active";
    }
    return classes;
  }

  render() {
    return (
      <button className={this.setClasses()} id={this.createId()} onClick={this.props.clickHandler} type="button">
        <i className={this.props.icon}></i>
      </button>
    )
  }
}


class BoxController extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="boxes-controller">
        <ArrowButton icon="fas fa-arrow-left" direction="left" clickHandler={this.props.clickHandler} cStage={this.props.cStage} />
        <ArrowButton icon="fas fa-arrow-right" direction="right" clickHandler={this.props.clickHandler} cStage={this.props.cStage} />
      </div>
    )
  }
}

// Decides which box needs to be render
function CBox (props) {
  if (props.cStage == 1) {
    return <UserBox changeHandler={props.changeHandler.bind(this)} />
  } else if (props.cStage == 2) {
    return <WorkspaceBox changeHandler={props.changeHandler.bind(this)} />
  } else {
    return <SubmitBox submitHandler={props.submitHandler.bind(this)} />
  }
}


// GOVERNOR

class WorkspaceMaker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {formData: {'f-name': "", 'l-name': "", 'email': "", 'password': "", 'w-name': "", 'users': ""}, stage: 1}
  }

  handleSubmit(event) {
    console.log("Submit");
    event.preventDefault();
  }

  inputChange(event) {
    let newDic = this.state.formData;

    newDic[event.target.name] = event.target.value
    this.setState({formData: newDic});
  }

  stageChange(event) {
    // Detect the id of the clicked button
    // If the left button is clicked, we substract one to the current stage, else, we add one

    if (event.target.id == "move-btn-left" && this.state.stage > 1) {
      this.setState({stage: this.state.stage - 1})
    }
    else if (event.target.id == "move-btn-right" && this.state.stage < 3) {
      this.setState({stage: this.state.stage + 1})
    }
  }

  render() {
    return (
      <div id="workspace-maker-container">

        <div id="left-box">

          <div id="left-sub-box">
            <h1 id="left-header">Create a new workspace</h1>
            <form onSubmit={this.handleSubmit}>

              <div id="box-container">
                <CBox cStage={this.state.stage} changeHandler={this.inputChange.bind(this)} submitHandler={this.handleSubmit.bind(this)} />
              </div>

              <BoxController clickHandler={this.stageChange.bind(this)} cStage={this.state.stage}/>
            </form>
          </div>
        </div>

        <div id="right-box">
          <h1>Data</h1>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <WorkspaceMaker />,
  document.getElementById('container')
);
