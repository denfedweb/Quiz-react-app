import React from 'react';
import classes from './FinishedQuiz.css';

const FinishedQuiz = props =>(


    <div className={classes.FinishedQuiz}>
      <ul>
          <li>
              <strong>1. </strong>
              how are you finished
              <i className={'fa fa-times ' + classes.error} />
             
          </li>
          <li>
              <strong>2. </strong>
              how are you finished
              <i className={'fa fa-check ' + classes.success} />
             
          </li>
      </ul>
      <p>Сorrect 4 out of 10</p>
      <div>
          <button>Repeat</button>
      </div>
    </div>
)

export default FinishedQuiz