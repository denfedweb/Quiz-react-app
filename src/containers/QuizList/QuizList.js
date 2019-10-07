import React, { Component }from 'react';
import classes from './QuizList.css';
import {NavLink} from 'react-router-dom';
import Loader from '../../components/UI/Loader/Loader';
// import axios from '../../axios/axios-quiz';
import {connect} from 'react-redux';
import {fetchQuizes} from '../../store/actions/quiz';

 class QuizList extends Component{

   
    renderQuizes(){

        return this.props.quizes.map((quiz) => {
           
            return (
                
                <li
                key={quiz.id}
                >
                    <NavLink
                    to={`/quiz/${quiz.id}`}

                    >
                        {quiz.name}
                    </NavLink>
                </li>
            )
        })
    }

   async componentDidMount () { //для вывода данных от сервера используется эта функция что бы дом дерево загрузилось 

    this.props.fetchQuizes()
    
      
    }
   
    render() {
    let renderLoader = this.props.loading

        return (
            <div className={classes.QuizList}>
                <h1>Quiz List</h1>
               {renderLoader && this.props.quizes.length !== 0 ? <Loader/> : <ul>
                    {this.renderQuizes()}
                </ul>} 
               
            </div>
        )
    }
}


function mapStateToProps(state) {
     return {
       quizes: state.quiz.quizes,
       loading: state.quiz.loading
     }
  }

function mapDispatchToProps(dispatch) {
     return {
    fetchQuizes: () => dispatch(fetchQuizes())
     }
  }
export default connect(mapStateToProps, mapDispatchToProps)(QuizList)