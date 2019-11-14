import React, { Component } from 'react'
// import * as actions from '../actions/formActions'
class LoginForm extends Component {
    componentDidMount() {
        // actions.saveInputListener()
  //       axios.get('http://localhost:5000/')
  // .then(function (response) {
  //   console.log(response);
  // })
    }
    render() {
        return (
          <div className='columns is-flex is-vcentered is-centered'>
            <div className='column is-two-thirds-mobile is-one-third-tablet is-one-quarter-desktop'>

                <div className="box">
                <form id='form1' action='http://localhost:5000/login' method="post">
                  <div className="field">
                    <label className="label">Institute</label>
                    <div className="control">
                      <div className="select is-fullwidth">
                        <select name='inst'>
                          <option>JIIT</option>
                          <option>J128</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Enrollment Number</label>
                    <div className="control">
                      <input className="input" type="text" name="enroll" id="enroll" required />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                      <input
                        className="input"
                        type="password"
                        name="password"
                        required
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Date of Birth</label>
                    <div className="control">
                      <input className="input" type="date" name="dob" required />
                    </div>
                  </div>
                  <div className="field">
                        <button
                        type="submit"
                        className="button is-block is-info is-fullwidth"
                      >
                        Login
                      </button>
                  </div>

                </form>
              </div>
              <article className="message is-warning">

    <div className="message-body">
       <strong>Entering Wrong password for more than 3 times will lock your account!</strong>
    </div>
  </article>
            </div>
            </div>

        )
    }
}

export default LoginForm
