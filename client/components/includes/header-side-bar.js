import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AddNewBook from '../admin/pages/add-new-book';
import { logout, editProfile } from '../../actions/auth_actions';


class HeaderSideBar extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);

  }
  logout(event) {

    event.preventDefault();

    this.props.actions.logout();

    this.context.router.push('/');

  }
  render() {
    return (<div className="header-side" id="container">


      <div id="menu">
        <nav>
          <div className="nav-wrapper">
            <ul className="right hide-on-med-and-down">
              <li><a href="#!"><i className="material-icons">search</i></a></li>
              <li><a href="#!"><i className="material-icons">view_module</i></a></li>
              <li><a href="#!"><i className="material-icons">refresh</i></a></li>
              <li><a className="dropdown-button" href="#" data-activates="dropdown2"><i className="material-icons">more_vert</i></a></li>
            </ul>
            <ul id="dropdown2" className="dropdown-content">
              <li><Link to="/profile">Profile</Link></li>
              <li><a onClick={this.props.actions.logout} href="#!">Logout</a></li>
            </ul>
          </div>

        </nav>
        <div className="col s3">
          <ul id="slide-out" className="side-nav fixed show-on-large-only">
            <div style={{ textAlign: 'center', color: '#000', backgroundColor: '#25758c', marginTop: -16 }}>
              <div className="row style={{backgroundColor: '#25758c'}}">
                <span className="card-title"><h4><i className="material-icons">library_books</i> <a href="dashboard">Dashboard</a></h4></span>
                <li className="divider"></li>
                <p></p>
                <img style={{ borderRadius: 50, border: '2px solid black' }}
                  width="100px"
                  height="100px"
                  src="https://images.vexels.com/media/users/3/130527/isolated/preview/845f79841ea58765d623a68bf434d5ed-girl-cartoon-head-character-by-vexels.png"
                  alt="HelloBooks" /><br />
                <i className="material-icons">account_circle</i> <b>{this.props.user.fullname}</b>
              </div><br />
            </div>
            <li className="divider"></li>
            <li id="menu-list"><a href='rented-books'>Rent History <i className="material-icons">chevron_right</i></a></li>
            <li id="menu-list"><a href="/dashboard">Rent a Book <i className="material-icons">chevron_right</i></a></li>
            <li id="menu-list"><a href="rented-books">Rented Books <i className="material-icons">chevron_right</i></a></li>
            <li id="menu-list"><a href="profile">My Profile <i className="material-icons">chevron_right</i></a></li>
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

function mapStateToProps(state) {
  return {
    user: state.auth.user.currentUser
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      logout,
      editProfile
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderSideBar)
