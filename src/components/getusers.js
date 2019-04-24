import React, { Component } from 'react';
import '../assets/css/getusers.css';
const api_url = "http://localhost:3002";
const api_method = "/all";

class Selector extends Component {
  render() {
    return (
      <div>
        <h4 className="heading4">Users</h4>
        <form className="field-row" onSubmit={this.props.lookup} action="http://localhost:3002/lookup">
          <label>Look Up</label>
          <select name="lookup_field" defaultValue="">
            <option value="" disabled>Select</option>
            <option value="last_name">Last Name</option>
            <option value="first_name">First Name</option>
            <option value="dob">DOB</option>
            <option value="gender">Gender</option>
          </select>
          <input type="text" name="lookup_value" />
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

class User extends Component {
  render() {
    return (
      <div className="info-card">
        <div className="row">
          <label>First Name</label>: <span>{this.props.firstname}</span>
        </div>
        <div className="row">
          <label>Last Name</label>: <span>{this.props.lastname}</span>
        </div>
        <div className="row">
          <label>DOB</label>: <span>{this.props.dob}</span>
        </div>
        <div className="row">
          <label>Gender</label>: <span>{this.props.gender}</span>
        </div>
        <button onClick={this.props.removeHandler} uid={this.props.uid}>Delete</button>
      </div>
    )
  }
}
class Getusers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      apidata:[],
      removal:{}
    }
  }
  componentDidMount() {
    this.get();
  }
  render() {
    return (
      <div className="container">
        <Selector lookup={this.lookup}/>
        <div className="content-box">
          {
            this.state.apidata.map((data, index) =>
              <User key={index} uid={data._id} firstname={data.first_name} lastname={data.last_name} dob={data.dob} gender={data.gender} removeHandler={this.removeHandler}/>
            )
          }
        </div>
      </div>
    )
  }
  get = (method, header) => {
    let mymethod = method || api_method;
    let path = api_url + mymethod;
    fetch(path, {
      data: {
        "last_name": "cheng"
      }
    })
      .then(res=>res.json())
      .then(data=>this.setState({apidata:data.users}));
  }
  lookup = (e) => {
    let search = '';
    e.preventDefault()
    if(e.target.lookup_field.value.length && e.target.lookup_value.value.length) {
      search = '?' + e.target.lookup_field.value + '=' + e.target.lookup_value.value;
    }
    this.get("/lookup" + search);
  }
  removeHandler = (e) => {
    e.preventDefault();
    let val = e.target.attributes.uid.value;
    fetch(api_url + '/remove?_id=' + val)
      .then(res=>res.json())
      .then(data=>{
        this.setState({
          removal: data
        });
      })
      .then(()=>{
        this.get();
      });
  }
}

export default Getusers;
