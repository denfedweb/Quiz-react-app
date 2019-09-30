import React, { Component } from 'react';
import classes from './Layout.css';
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle';
import Drawer from '../../components/Navigation/Drawer/Drawer.js';

class Layout extends Component{

    state={
        menu: false
    }

    toggleMenuEvent = () =>{
        this.setState({
            menu: !this.state.menu
        })
    }
    menuCloseEvent = () =>{
        this.setState({
            menu: false
        })
    }
    render(){
        return (
            <div className={classes.Layout}>
                <Drawer 
                isOpen={this.state.menu}
                onClose={this.menuCloseEvent}
                />
                <MenuToggle 
                onToggle={this.toggleMenuEvent}
                isOpen={this.state.menu}
                />
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

export default Layout