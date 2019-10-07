import axios from '../../axios/axios-quiz';
import {FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS, FETCH_QUIZES_ERROR} from './actionTypes.js'

export function fetchQuizes(){
    return async dispatch => {
        dispatch(fetchQuizesStart())
       try {
        const res = await axios.get('/quizes.json')
        const quizes = []
        Object.keys(res.data).forEach((key, id) => {
            
              quizes.push({
                  id: key,
                  name: `Test ${id + 1}` //добавить нормальное имя потом, что бы при при добавлении теста появлялся inpuт
              })
        })
        dispatch(fetchQuizesSuccess(quizes))
        
    } catch (error) {
        dispatch(fetchQuizesError(error))
    }
    }
}


export function fetchQuizesStart(){
return {
    type: FETCH_QUIZES_START
}
}

export function fetchQuizesSuccess(quizes){ 
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes
    }
}

export function fetchQuizesError(error){
    return {
        type: FETCH_QUIZES_ERROR,
        error
    }
}