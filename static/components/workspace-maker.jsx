

class Inputs extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="inputs-box">

        <input className="data-input" type="text" name="f-name" placeholder="First name" onChange={this.props.changeHandler} required/>
        <input className="data-input" type="text" name="l-name" placeholder="Last name" onChange={this.props.changeHandler}/>
        <input className="data-input" type="text" name="w-name" placeholder="Workspace name" onChange={this.props.changeHandler} />
        <input className="data-input" type="email" name="email" placeholder="Email address" onChange={this.props.changeHandler} required />
        <input className="data-input" type="password" name="password" placeholder="Password" onChange={this.props.changeHandler}  required/>

      </div>

    )
  }
}

class SubmitHandler extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div id="submit-box">
        <button className={this.props.btnClass} id="finish-btn" type="submit" onClick={this.props.submitHandler.bind(this)}>Create</button>
      </div>
    )
  }
}

class WorkspaceMaker extends React.Component {

  constructor(props) {
    super(props);

    this.state = {formData: {'f-name': undefined, 'l-name': undefined, 'email': undefined, 'password': undefined, 'w-name': undefined}, validData: false}
  }

  handleSubmit(event) {
    console.log(this.state.formData);

    fetch('/create_workspace', {
      method: 'POST',
      headers: {

        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.formData)
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log(data);

      if (data['status'] == "success") {
        // If the API call went well
        console.log("Si");
      }
    }).catch((err) => {
      console.log("Error");
    })
    event.preventDefault();
  }

  inputChange(event) {
    let newDic = this.state.formData;

    newDic[event.target.name] = event.target.value
    this.setState({formData: newDic});
  }

  canSubmit() {
    let valid = true;

    Object.keys(this.state.formData).forEach((key) => {

      let required = ['f-name', 'email', 'password', 'w-name'];

      if (required.includes(key)) {
        if (this.state.formData[key] == null) {
          valid = false;
        }
      }
    })
    console.log(valid);

    if (valid) {
      return "finish-btn-active";
    }
    return "finish-btn-inactive"
  }

  render() {
    return (
      <div id="workspace-maker-container">
        <div id="left-box">
          <h1 id="left-header">Create a new workspace</h1>

          <div id="inputs-container">

            <form onSubmit={this.handleSubmit}>
              <Inputs changeHandler={this.inputChange.bind(this)} />
            </form>
          </div>

          <SubmitHandler submitHandler={this.handleSubmit.bind(this)} btnClass={this.canSubmit()}/>

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
