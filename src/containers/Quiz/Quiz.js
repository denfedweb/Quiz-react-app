import React, { Component } from "react";
import classes from "./Quiz.css";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz.js";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";

class Quiz extends Component {
  state = {
    results: {},
    isFinished: true,
    activeQuestion: 0,
    answerState: null,
    quiz: [
      {
        question: 'What color is the sky?',
        rightAnswerId: 2,
        id: 1,
        answers: [
          {text: 'Black', id: 1},
          {text: 'Blue', id: 2},
          {text: 'Red', id: 3},
          {text: 'Green', id: 4}
        ]
      },
      {
        question: 'What year was the Green Mile movie released?',
        rightAnswerId: 4,
        id: 2,
        answers: [
          {text: 'in 1995', id: 1},
          {text: 'in 1997', id: 2},
          {text: 'in 2001', id: 3},
          {text: 'in 1999', id: 4}
        ]
      }
    ]
  };

  onAnswerClick = (answerId) => {
    
    if(this.state.answerState){
      const key = Object.keys(this.state.answerState)[0]
      if (this.state.answerState[key] === 'success') {
        return
      }
    }

   const question = this.state.quiz[this.state.activeQuestion]
   const results = this.state.results
   if(question.rightAnswerId === answerId) {
     if(!results[answerId]) {
       results[answerId] = 'success';
     }
     this.setState({ 
       answerState: {[answerId]: 'success'},
       results
    })
     setTimeout(() =>{
       if(this.isQuizFinished()){
        this.setState({ 
          isFinished: true
        })
       }else{
        this.setState({ 
          activeQuestion: this.state.activeQuestion + 1,
          answerState: null
       })
       }
      
     }, 500)
    
   }else{
    results[answerId] = 'error'
    this.setState({ 
      answerState: {[answerId]: 'error'},
      results
   })
   }
  
  }
  isQuizFinished(){
    return this.state.activeQuestion + 1 === this.state.quiz.length
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Take the survey</h1>
          {
            this.state.isFinished
            ? <FinishedQuiz 
               
              />
            : <ActiveQuiz 
            onAnswerClick={this.onAnswerClick}
            answers={this.state.quiz[this.state.activeQuestion].answers}
            question={this.state.quiz[this.state.activeQuestion].question}
            quizLength={this.state.quiz.length}
            currentQuestion={this.state.activeQuestion + 1}
            state={this.state.answerState}
            />
          }
          
        </div>
      </div>
    );
  }
}

export default Quiz;
