import React, { Component } from "react";
import {Link,Redirect} from 'react-router-dom'
class Modal extends Component {
  state={
    redirect:false,
    body: this.props.body || 'WRONG CREDENTIALS',
    btnClass: 'button'
  }
  componentDidMount() {
    if(this.state.body === 'WRONG CREDENTIALS') {
      this.setState({btnClass: this.state.btnClass+' is-loading'})
    }
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
          </header>
          <section className='modal-card-body'>{this.state.body}</section>
          
          <footer className='modal-card-foot'>
          <button onClick={()=>{this.setState({redirect:true})}} className='button is-danger'>Retry</button>
            
            
          </footer>
        </div>
      </div>
    );
  }
}

export default Modal;
