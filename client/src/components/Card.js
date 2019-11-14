import React, { Component } from "react";

class Card extends Component {
  render() {
    return (
      <div className='columns is-flex is-vcentered is-centered'>
        <div className='column is-two-thirds-mobile is-one-third-tablet is-one-quarter-desktop'>
          <div className='card'>
            <header className='card-header'>
              <p className='card-header-title'>{this.props.subject}</p>
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
                {this.props.attend} %

                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
