import React, { Component } from "react";
import Card from "../components/Card";
import "bulma/css/bulma.css";
class Attendance extends Component {
  state = {
    subjects: [],
    attendance: []
  };
  componentDidMount() {
    console.log('hello')
    fetch("/showAttendance").then(res => {
      console.log(res);
      return res.json()
    }).then(data =>{
      //var subj = subjects
      console.log(data[9])
      var subjects = data.slice(0,data.length/2)
      var attendance = data.slice(data.length/2,data.length)
      console.log(subjects,attendance)
      this.setState({subjects})
      this.setState({attendance})

    })
  }
  render() {
    return this.state.subjects.map((subj, i) => {
      return <Card subject={subj} attend={this.state.attendance[i]}></Card>;
    });
  }
}

export default Attendance;
