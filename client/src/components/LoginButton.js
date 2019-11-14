import React, { Component } from "react";
import {observer} from 'mobx-react'

@observer
class LoginButton extends Component {
  render() {
      var {show}
    return (
      <div>
        <a className='button is-primary'>
          <strong>Sign up</strong>
        </a>
      </div>
    );
  }
}

export default LoginButton;
