import React, { Component, Fragment } from 'react';
import classes from './Drawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop.js';
import {NavLink} from 'react-router-dom'


  const links = [
      {to:'/', label: 'List', exact: true},
      {to:'/auth', label: 'Auth', exact: false},
      {to:'/quiz-creator', label: 'Create test', exact: false},
  ]

class Drawer extends Component {
    clickEvent= () => {
        this.props.onClose()
    }
    renderLinks(){
        return links.map((link, index) =>{
            return (
                <li key={index}>
                   <NavLink
                   to={link.to}
                   exact={link.exact}
                   activeClassName={classes.active}
                   onClick={this.clickEvent}
                   >{link.label}</NavLink>
                </li>
            )
        })
    }
    render() {
        const cls = [classes.Drawer]
        if (!this.props.isOpen) {
            cls.push(classes.close)
        }
        return (
            <Fragment>
         <nav className={cls.join(' ')}>
             <ul>
                 {this.renderLinks()}
             </ul>
         </nav>
         {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null} 
         </Fragment>
        )
    }
}


export default Drawer