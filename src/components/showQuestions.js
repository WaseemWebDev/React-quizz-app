import React, { useState, useEffect } from "react";
import { questions } from "./questions.js";
import QuestionList from "./questionList";
import '../App.css';

function ShowQuestions() {
    let [score, setScore] = useState(0);
    const [attemptMessage, setAttemptMessage] = useState("");
    const [start, setStart] = useState(false);
    let [questionNum, setQuestionNum] = useState(1);
    let [previousQues, setPreviousQues] = useState(0);
    let [wrongAnswer, setWrongAnswer] = useState(0);
    let [correct, setCorrect] = useState(true);
    let [count, setCountDown] = useState(60);
    let [pause, setPause] = useState(false);



    useEffect(() => {
        let interval = null;
        if (pause ===  false) {
            interval = setInterval(() => {
                setCountDown(--count);
            }, 1000);
        }
        if(count === 0){
            setPause(true)
            clearInterval(interval)
            reset()
        }
    
        return () => clearInterval(interval);

    }, [pause, count])

    function selectedAnswer(answer, index) {

        if (questions[index].correct === answer) {
            if (questions[index].done !== true) {
                setScore(++score);
                setCorrect(true)
                questions[index].done = true;
                setAttemptMessage("");

            } else {
                setAttemptMessage("you already attemped this question");
            }
        }
        else {
            if (questions[index].done !== true) {
                setWrongAnswer(++wrongAnswer);
                setCorrect(false);
                questions[index].done = true;
                setAttemptMessage("");
            }

        }
    }
    function nextQuestion() {
        setAttemptMessage("");
        if (questionNum < questions.length) {
            setQuestionNum(++questionNum);
            setPreviousQues(++previousQues);
        }
    }

    function previousQuestion() {
        if (previousQues !== 0) {
            setQuestionNum(--questionNum);
            setPreviousQues(--previousQues);
        }

    }
    function reset() {
        setWrongAnswer(0);
        setAttemptMessage("");
        setScore(0);
        setStart(false)
        setPreviousQues(0)
        setQuestionNum(1)
        for (let i = 0; i < questions.length; i++) {
            questions[i].done = false;
        }

    }



    return (
        <>
            {!start ? (
                <button id="start" onClick={() => {
                    setStart(true)
                setCountDown(60)
                setPause(false)
                }}>start</button>
            ) : (
                    <div>

                        <h3>Time Remaining : {count}</h3>
                        <h4>score {score}</h4>
                        <h4>Wrongs : {wrongAnswer}</h4>
                        <h4>Total Questions : {questionNum}/{questions.length}</h4>
                        <QuestionList
                            questions={questions}
                            correct={correct}
                            attemptMessage={attemptMessage}
                            selectedAnswer={selectedAnswer}
                            questionNum={questionNum}
                            previousQues={previousQues}
                            nextQuestion={nextQuestion}
                            previousQuestion={previousQuestion}
                            reset={reset}

                        />
                    </div>
                )}
        </>
    );
}
export default ShowQuestions;
