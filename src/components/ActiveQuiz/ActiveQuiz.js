import React from 'react';
import classes from './ActiveQuiz.css';
import AnswersList from './AnswersList/AnswersList';

const ActiveQuiz = props => (
    <div className={classes.ActiveQuiz}>
        <p className={classes.Question}>
            <span>
                <strong>{props.currentQuestion}.</strong>&nbsp;
                {props.question}
            </span>
            <small>{props.currentQuestion} from {props.quizLength}</small>
        </p>

        <AnswersList 
        answers={props.answers}
        onAnswerClick={props.onAnswerClick}
        state={props.state}
        />
    </div>
)

export default ActiveQuiz