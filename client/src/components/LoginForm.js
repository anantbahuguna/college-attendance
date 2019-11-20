import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Modal from "./Modal";
import axios from "axios";
import { Link } from "react-router-dom";
// import * as actions from '../actions/formActions'
class LoginForm extends Component {
  state = {
    showModal: false,
    inst: "",
    enroll: "",
    password: "",
    dob: "",
    isValid: "",
    redirect: false,
    btnLoad: false,
    btnClass: 'button is-block is-info is-fullwidth'
  };
  componentDidMount() {
    if (this.state.btnLoad) {
      console.log('load btn')
      var element = document.getElementById("btn-load");
      element.classList.add("is-loading");
    }
  }
  _formHandler() {
    if (
      this.state.inst !== "" &&
      this.state.enroll !== "" &&
      this.state.password !== "" &&
      this.state.dob !== "" &&
      this.state.dob !== "dd/mm/yyyy"
    ) {
      this.setState({ btnClass: this.state.btnClass+' is-loading' });
      

      axios
        .post("/login", {
          inst: this.state.inst,
          enroll: this.state.enroll,
          password: this.state.password,
          dob: this.state.dob
        })
        .then(
          res => {
            console.log(res.data);
            this.setState({ isValid: res.data });
          },
          error => {
            console.log(error);
          }
        )
        .then(() => {
          if (this.state.isValid) {
            setTimeout(() => {
              this.setState({ redirect: true });
            }, 7000);
          } else {
            console.log('stop load btn',this.state.showModal)
            this.setState({ showModal: true, btnClass: 'button is-block is-info is-fullwidth' });
          }
        });
    }
  }
  render() {
    if (this.state.isValid && !this.state.redirect) {
      return <Modal body='Setting things up!!' />;
    }
    if (this.state.redirect) {
      return <Redirect to='/home' />;
    }
    if (this.state.showModal) {
      return <Redirect to='/error' />;
    }
    return (
      <div className='columns is-flex is-vcentered is-centered'>
        <div className='column is-two-thirds-mobile is-one-third-tablet is-one-quarter-desktop'>
          <div className='box'>
            <div id='form1'>
              <div className='field'>
                <label className='label'>Institute</label>
                <div className='control'>
                  <div className='select is-fullwidth'>
                    <select
                      name='inst'
                      value={this.state.inst}
                      onChange={e =>
                        this.setState({
                          inst: e.target.value
                        })
                      }
                    >
                      <option>JIIT</option>
                      <option>J128</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className='field'>
                <label className='label'>Enrollment Number</label>
                <div className='control'>
                  <input
                    className='input'
                    type='text'
                    name='enroll'
                    id='enroll'
                    value={this.state.enroll}
                    onChange={e =>
                      this.setState({
                        enroll: e.target.value
                      })
                    }
                    required
                  />
                </div>
              </div>
              <div className='field'>
                <label className='label'>Password</label>
                <div className='control'>
                  <input
                    className='input'
                    type='password'
                    name='password'
                    value={this.state.password}
                    onChange={e =>
                      this.setState({
                        password: e.target.value
                      })
                    }
                    required
                  />
                </div>
              </div>
              <div className='field'>
                <label className='label'>Date of Birth</label>
                <div className='control'>
                  <input
                    className='input'
                    type='date'
                    name='dob'
                    value={this.state.dob}
                    onChange={e =>
                      this.setState({
                        dob: e.target.value
                      })
                    }
                    required
                  />
                </div>
              </div>
              <div className='field'>
                <button
                  type='submit'
                  id='btn-load'
                  className={this.state.btnClass}
                  onClick={() => {
                    this._formHandler();
                  }}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
          <article className='message is-warning'>
            <div className='message-body'>
              <strong>
                Entering Wrong password for more than 3 times will lock your
                account!
              </strong>
            </div>
          </article>
        </div>
        {this.state.showModal ? <Modal body='WRONG CREDENTIALS!' /> : <br />}
      </div>
    );
  }
}

export default LoginForm;
