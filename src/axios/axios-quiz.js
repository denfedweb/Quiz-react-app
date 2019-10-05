import axios from 'axios';


export default axios.create({
    baseURL: 'https://denfed-react-quiz.firebaseio.com/'
})