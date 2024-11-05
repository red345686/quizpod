import React, { useState, useEffect } from "react";
import QuizQuestion from "./QuizQuestion";
import Graph from "./graph";

const KantoPokemonQuiz = ({ subject }) => {
    const [quizData, setQuizData] = useState(null);
    const [quizStarted, setQuizStarted] = useState(false);
    const [score, setScore] = useState(0);
    const [timeperquestion, setTimePerQuestion] = useState([]);
    const [end, setEnd] = useState(false);
    const [timeLeft, setTimeLeft] = useState(Infinity);
    const [allTime, setAllTime] = useState(0);


    useEffect(() => {
        import(`./${subject}.json`)
            .then((data) => setQuizData(data.default))
            .catch((error) => console.error('Error loading subject data:', error));
    }, [subject]);

    function startQuiz() {
        setQuizStarted(true);
        setTimeLeft(parseInt(document.getElementById('timeInput').value));
        setAllTime(parseInt(document.getElementById('timeInput').value));
    }

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0) {
            setEnd(true);
        }
    }, [timeLeft]);

    if (!quizData) {
        return <p>Loading quiz data...</p>;
    }

    return (
        <div className="show us">
            <div>
                <img className="mascot" src={require('./image/mascot_start.gif')} alt="Quiz Mascot" />
                <h1 className="quizpod">QUIZPOD</h1>

                {!quizStarted && (
                    <div className="starting">
                        <p className="intro">Click the "Start Quiz" button to begin the quiz.</p>
                        <input type="number" id="timeInput" placeholder="Enter time in seconds" required />
                        <button onClick={startQuiz} className="quizbutton">Start Quiz</button>
                    </div>
                )}

                {quizStarted && !end && (
                    <QuizQuestion
                        score={score}
                        setScore={setScore}
                        timeperquestion={timeperquestion}
                        setTimePerQuestion={setTimePerQuestion}
                        timeLeft={timeLeft}
                        allTime={allTime}
                        end={end}
                        setEnd={setEnd}
                        quizData={quizData}
                    />
                )}

                {end && <Graph dataArray={timeperquestion} />}
            </div>
            <div className="rect"></div>
        </div>
    );
};

export default KantoPokemonQuiz;
