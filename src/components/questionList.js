import React, { useState } from 'react';
import '../App.css';

function QuestionList(props) {
    const [answerId, setAnswerId] = useState(null);

    function setAnswer(index) {
        setAnswerId(index)
    }
    const { questions, correct, selectedAnswer, reset, previousQuestion, nextQuestion, attemptMessage, questionNum, previousQues } = props;

    return (
        <>
            <ol>
                {questions.slice(previousQues, questionNum).map((item, i) => {
                    return (
                        <li key={item.id}>
                            <h2>
                                {item.question}
                            </h2>
                            <br />

                            {item.answers.map((answer, index) => {
                                return (
                                    <button
                                        className={`answers ${answerId === index && correct ? "correct-answer " : answerId === index && !correct && "wrong-answer"}`}

                                        key={index}
                                        onClick={() => {
                                            selectedAnswer(answer, item.id);
                                            setAnswer(index)

                                        }}
                                    // style={{ backgroundColor: answerId === index && correct ? "green" : "red" }}      
                                    >
                                        {answer}
                                    </button>
                                );
                            })}
                            <br />
                        </li>
                    );
                })}
            </ol>
            <p>{attemptMessage ? attemptMessage : null}</p>

            {previousQues === 0 ? null : <button id="prev" onClick={previousQuestion}>Previous</button>}
            {questions.length > questionNum ? <button id="next" onClick={() => {
                nextQuestion()
                setAnswerId(null)
            }}>Next</button> : null}
            <button id="reset" onClick={reset}>Reset</button>
        </>
    );
}
export default QuestionList;