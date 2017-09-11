import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

export default class HeaderSideBar extends Component {
  render() {
    return (<div className="admin-header-side" id="container">
      <ul id='dropdown1' className='dropdown-content'>
        <li><a href="#!"> {this.props.username}</a></li>
        <li className="divider"></li>
        <li><a onClick={this.props.onClick} href="#"><i className="material-icons">exit_to_app</i> Logout</a></li>
      </ul>
      <div id="menu">
        <div style={{ float: 'right', color: '#fff', padding: 5 }}>
          <a style={{ float: 'right', marginLeft: 5, backgroundColor: '#2962ff' }}
            className='dropdown-button btn' href='#' data-activates='dropdown1'>Account</a>
        </div>
        <div className="col s3">
          <ul id="slide-out" className="side-nav fixed show-on-large-only">
            <div style={{ textAlign: 'center', color: '#fff', backgroundColor: 'blue', marginTop: -16 }}>
              <div className="row style={{backgroundColor: '#25758c'}}">
                <span className="card-title"><h4><i className="material-icons">library_books</i> Admin</h4></span>
                <li className="divider"></li>
                <p></p>
                <img style={{ borderRadius: 50, border: '2px solid black' }}
                  width="100px"
                  height="100px"
                  src="https://images.vexels.com/media/users/3/130527/isolated/preview/845f79841ea58765d623a68bf434d5ed-girl-cartoon-head-character-by-vexels.png"
                  alt="HelloBooks" /><br />
                <i className="material-icons">account_circle</i> <b>{this.props.fullName}</b>
              </div><br />
            </div>
            <li className="divider"></li>
            <li id="menu-list"><Link to="/add-book">Add a book <i className="material-icons">chevron_right</i></Link></li>
            <li id="menu-list"><a href="#!">Add Category<i className="material-icons">chevron_right</i></a></li>
            <li id="menu-list"><a href="#!">Edit Books<i className="material-icons">chevron_right</i></a></li>
            <li id="menu-list"><a href="#!">Edit Books<i className="material-icons">chevron_right</i></a></li>
            <li id="menu-list"><a href="#!">Edit Books<i className="material-icons">chevron_right</i></a></li>
            <li id="menu-list"><a href="#!">Edit Books<i className="material-icons">chevron_right</i></a></li>
          </ul>
        </div></div>
      <div id="content">
        <a href="#" data-activates="slide-out" className="button-collapse hide-on-large-only"><i style={{ color: '#fff', fontSize: 40 }} className="material-icons">menu</i></a>

      </div>
    </div>)
  }
}

HeaderSideBar.PropTypes = {
  fullName: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired
}