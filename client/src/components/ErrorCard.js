import React, { Component } from "react";
import { Link } from "react-router-dom";
class ErrorCard extends Component {
  render() {
    return (
      <div className='columns is-flex is-vcentered is-centered'>
        <div className='column is-two-thirds-mobile is-one-third-tablet is-one-quarter-desktop'>
          <div className='card'>
            <header className='card-header'>
              <p className='card-header-title'>Wrong Credentials</p>
              <a
                href='#'
                className='card-header-icon'
                aria-label='more options'
              >
                <span className='icon'>
                  <i className='fas fa-angle-down' aria-hidden='true'></i>
                </span>
              </a>
            </header>
            <div className='card-content'>
              <div className='content'>
                <button class='button is-link'>
                  <Link to='/'>Home</Link>
                </button>

                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ErrorCard;
