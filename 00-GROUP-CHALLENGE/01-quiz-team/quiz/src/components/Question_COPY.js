import React, { useState } from 'react';
import './../css/Question.css'
import Option from './Option'
import Timer from './Timer'
import QUESTION_SESSION from './../mockdata/Questions'

function Question() {
    const [question] = useState(QUESTION_SESSION[0]);

    const typeOfAnswer = () => {
        if(question[0].type === 'multiple') return (
        <div>
            <h2 className="question__title">Question: {question[0].category}</h2>
            <p className="">{question[0].question}</p>
            <p>Choose the correct answer</p>
            <Option option={question[0].correct_answer}/>
            <Option option={question[0].incorrect_answers[0]}/>
            <Option option={question[0].incorrect_answers[1]}/>
            <Option option={question[0].incorrect_answers[2]}/>
        </div>
        );
        else if(question[0].type === Boolean)return (
            <div>
                <h2 className="question__title">Question: {question[0].category}</h2>
                <p className="">{question[0].question}</p>
                <p>True or false</p>
                <Option option={question[0].correct_answer}/>
                <Option option={question[0].incorrect_answers}/>
            </div>
            )
    }

    return (
        <>
            <div className="question__container">
                <div className="question__item">
                        {typeOfAnswer()}
                </div>
                <Timer />
            </div>
        </>
    )
}

export default Question;




