import React, { useState, useEffect } from "react";

const QuizQuestion = ({ score, setScore, timeperquestion, setTimePerQuestion, timeLeft, allTime, end, setEnd, quizData }) => {
    const [correct, setCorrect] = useState(false);
    const [incorrect, setIncorrect] = useState(false);
    const [index, setIndex] = useState(0);
    const [timeSpent, setTimeSpent] = useState(0);

    // Track time spent on the current question
    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => {
                setTimeSpent(prev => prev + 1);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [timeLeft]);

    // Draw the timer in the canvas
    useEffect(() => {
        const canvas = document.getElementById('timer');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            const radius = 60;
            const totalTime = allTime;
            const startAngle = -Math.PI / 2;
            const endAngle = 2 * Math.PI;

            function drawTimer() {
                // Clear the previous drawing
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Draw outer circle
                ctx.beginPath();
                ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, endAngle, false);
                ctx.lineWidth = 8;
                ctx.strokeStyle = "#000";
                ctx.stroke();

                // Draw progress arc for time remaining
                const remainingAngle = (timeLeft / totalTime) * endAngle;
                ctx.beginPath();
                ctx.arc(canvas.width / 2, canvas.height / 2, radius, startAngle, startAngle + remainingAngle, false);
                ctx.lineWidth = 8;
                ctx.strokeStyle = "#FF0000";
                ctx.stroke();

                // Draw the time left text in the center
                ctx.fillStyle = "#FEFEFE";
                ctx.font = "30px Arial";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(timeLeft, canvas.width / 2, canvas.height / 2); // Display the `timeLeft` value
            }

            drawTimer();
        }
    }, [timeLeft, allTime]); // Ensure the canvas updates every time `timeLeft` changes

    // Handle answering the question
    const handleAnswer = (option) => {
        if (option === quizData.questions[index].correctAnswer) {
            setCorrect(true);
            setScore(score + 1);
        } else {
            setIncorrect(true);
        }

        // Log the time spent on the question
        setTimePerQuestion([...timeperquestion, timeSpent]);
        handleNext();
    };

    // Move to the next question or end the quiz
    const handleNext = () => {
        if (index < quizData.questions.length - 1) {
            setIndex(index + 1);
            setCorrect(false);
            setIncorrect(false);
            setTimeSpent(0); // Reset time spent for the next question
        } else {
            setEnd(true); // End the quiz
        }
    };

    if (end) return null; // Stop rendering the quiz if `end` is true

    return (
        <div>
            <canvas id="timer" width="150" height="150"></canvas> {/* Timer canvas */}
            <p className="question">Q.) {quizData.questions[index].question}</p>
            <p className="Score">Score: {score}</p>
            <div className="options">
                {quizData.questions[index].options.map((option, i) => (
                    <button key={i} onClick={() => handleAnswer(option)}>
                        {i + 1}.) {option}
                    </button>
                ))}
            </div>

            {correct && <p>Correct!</p>}
            {incorrect && <p>Incorrect!</p>}
        </div>
    );
};

export default QuizQuestion;
