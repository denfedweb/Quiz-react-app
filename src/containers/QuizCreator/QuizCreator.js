import React, { Component, Fragment }from 'react';
import classes from './QuizCreator.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Select from '../../components/UI/Select/Select';
import {createControl} from '../../form/formFramework';

function createOptionControl(number){
    return createControl({
        label: `Option ${number}`,
        errorMessage: 'Value cannot be empty',
        id: number
    }, {required: true})
}

function createFormControls(){
return {
    question: createControl({
        label: 'Enter a question',
        errorMessage: 'The question cannot be empty'
    }, {required: true}),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4)
}
}

export default class QuizCreator extends Component{
    state = {
        quiz: [],
        rightAnswerId: 1,
        formControls: createFormControls()
    }
    submitEvent = e => {
        e.preventDefault();
    }
    addQuestionEvent = () => {

    }
    createQuizEvent = () => {

    }
    changeEvent = (val, controlName) => {
     
    }
    renderControls(){
        return Object.keys(this.state.formControls).map((controlName, key) =>{
            const control = this.state.formControls[controlName]

            return (
                <Fragment key={key}>
                <Input
                label={control.label}
                value={control.value}
                valid={control.valid}
                shouldValidate={!!control.validation}
                touched={control.touched}
                errorMessage={control.errorMessage}
                onChange={e => this.changeEvent(e.target.value,controlName)}
                />
                {key === 0 ? <hr/> : null}
                </Fragment>
            )
        })
    }
    selectChangeEvent = e => {
        this.setState({
            rightAnswerId: +e.target.value
        })
    }
    render() {
        const select = <Select
        label="Choose the correct answer"
        value={this.state.rightAnswerId}
        onChange={this.selectChangeEvent}
        options={[
            {text: 1, value: 1},
            {text: 2, value: 2},
            {text: 3, value: 3},
            {text: 4, value: 4}
        ]}
        />

        return (
            <div className={classes.QuizCreator}>
               <div> 
                   <h1>Create test</h1> 
                   <form onSubmit={this.submitEvent}>
                   { this.renderControls() }
                   {select}

                   <Button
                   type="primary"
                   onClick={this.addQuestionEvent}
                   >
                       Add Question
                   </Button>
                   <Button
                   type="success"
                   onClick={this.createQuizEvent}
                   >
                       Create Test
                   </Button>
                   </form>
                </div>
            
            </div>
        )
    }
}