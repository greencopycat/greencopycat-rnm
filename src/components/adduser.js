import React, { Component } from 'react';
import '../assets/css/adduser.css';

const api_url = 'http://localhost:3002/adduser';

class Adduser extends Component {
  messge = '';
  constructor(props) {
    super(props);
    this.state = {
      inserted: {}
    }
  }
  render() {
    if(this.state.inserted.ok === 1) {
      this.message = <p className="show">Success! User has been inserted to the database.</p>;
    } else
    if(this.state.inserted.ok === 0){
      this.message = <p className="show">Failed! Something went wrong, please check again.</p>;
    } else {
      this.message = <p></p>
    }
    return (
      <div className="container">
        <h4 className="heading4">Add User</h4>
        <div className="form-box">
          <form onSubmit={this.addUser}>
            <div className="row">
              <label>First Name</label>: <input type="text" name="firstname" required />
            </div>
            <div className="row">
              <label>Last Name</label>: <input type="text" name="lastname" required />
            </div>
            <div className="row">
              <label>DOB</label>: <input type="text" name="dob" required pattern="[0-9]{2}/[0-9]{2}/[0-9]{4}" placeholder="mm/dd/yyyy"/>
            </div>
            <div className="row">
              <label>Gender</label>: <select name="gender"><option value="male">Male</option><option value="female">Female</option></select>
            </div>
            <div className="row flex flex-end">
              <input type="reset" value="Reset" /><input type="submit" value="Submit" />
            </div>
          </form>
          <div className="msg-box">
            {this.message}
          </div>
        </div>
      </div>
    )
  }

  addUser = (e) => {
    e.preventDefault();
    let { firstname, lastname, dob, gender } = e.target.elements;
    let query = '';
    query += firstname.value ? '&first_name=' + encodeURIComponent(firstname.value.trim()) : '';
    query += lastname.value ? '&last_name=' + encodeURIComponent(lastname.value.trim()) : '';
    query += dob.value ? '&dob=' + encodeURIComponent(dob.value.trim()) : '';
    query += gender.value ? '&gender=' + encodeURIComponent(gender.value.trim()) : '';
    query = query.replace(/^&/, '?');

    fetch(api_url + query)
      .then(res=>res.json())
      .then(data=>this.setState({ inserted: data }));
  }
}

export default Adduser;
