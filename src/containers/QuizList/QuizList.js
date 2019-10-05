import React, { Component }from 'react';
import classes from './QuizList.css';
import {NavLink} from 'react-router-dom';
import Loader from '../../components/UI/Loader/Loader';
import axios from '../../axios/axios-quiz';

export default class QuizList extends Component{

    state = {
        quizes: [],
        loading: true
    }
    
    renderQuizes(){

        return this.state.quizes.map((quiz) => {
           
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
    try {
        const res = await axios.get('/quizes.json')
        const quizes = []
        Object.keys(res.data).forEach((key, id) => {
            
              quizes.push({
                  id: key,
                  name: `Test ${id + 1}` //добавить нормальное имя потом, что бы при при добавлении теста появлялся inpuт
              })
        })
        this.setState({
            quizes, 
            loading: false
        })
        
    } catch (error) {
        console.log(error)
    }
      
    }
   
    render() {
    let renderLoader = this.state.loading

        return (
            <div className={classes.QuizList}>
                <h1>Quiz List</h1>
               {renderLoader ? <Loader/> : <ul>
                    {this.renderQuizes()}
                </ul>} 
               
                </div>
        )
    }
}