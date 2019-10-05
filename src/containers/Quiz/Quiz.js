import React, { Component } from "react";
import classes from "./Quiz.css";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz.js";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import axios from "../../axios/axios-quiz";
import Loader from '../../components/UI/Loader/Loader';

class Quiz extends Component {
  state = {
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    quiz: [],
    loading: true
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
     if(!results[question.id]) {
       results[question.id] = 'success';
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
    results[question.id] = 'error'
    this.setState({ 
      answerState: {[answerId]: 'error'},
      results
   })
   }
  
  }
  isQuizFinished(){
    return this.state.activeQuestion + 1 === this.state.quiz.length
  }

  retryEvent = () =>{
     this.setState({
       activeQuestion: 0,
       answerState: null,
       isFinished: false,
       results: {}
     })
  }
  async componentDidMount() {
    // console.log(`Quiz ID = ${this.props.match.params.id}`)
   
        try {
      const res = await axios.get(`/quizes/${this.props.match.params.id}.json`)
      const quiz = res.data
     
      this.setState({
          quiz, 
          loading: false
      })
      
  } catch (error) {
      console.log(error)
  }
      
 
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Take the survey</h1>
          {  this.state.loading ? <Loader/> : 
            this.state.isFinished
            ? <FinishedQuiz 
               results={this.state.results}
               quiz={this.state.quiz}
               onRetry={this.retryEvent}
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
