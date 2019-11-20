import React, { Component } from "react";
import {Link,Redirect} from 'react-router-dom'
class Modal extends Component {
  state={
    redirect:false,
    body: this.props.body || 'WRONG CREDENTIALS'
  }
  render() {
    if(this.state.redirect) {
     return <Redirect to='/' />   
    }
    return (
      
      <div className='modal is-active is-clipped'>
        <div className='modal-background'></div>
        <div className='modal-card'>
          <header className='modal-card-head'>
            <p className='modal-card-title'>{this.state.body}</p>
            <button className="delete" aria-label="close"></button>
          </header>
          <section className='modal-card-body'>{this.state.body}</section>
          
          <footer className='modal-card-foot'>
          <button onClick={()=>{this.setState({redirect:true})}} className='button'>Retry</button>
            
            
          </footer>
        </div>
      </div>
    );
  }
}

export default Modal;
