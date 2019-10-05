import React from 'react';
import classes from './Loader.css';

const Loader = props =>{
    
    
    return (
        <div className={classes.Loader}>
        <div className={classes.face}>
          <div className={classes.circle}/>
        </div>
        <div className={classes.face}>
          <div className={classes.circle}/>
        </div>
      </div>
    )
}


export default Loader