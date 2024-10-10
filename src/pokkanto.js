import React, { useState } from "react";
import QuizQuestion from "./QuizQuestion"; // Updated to import the question component

const KantoPokemonQuiz = () => {
    const [quizStarted, setQuizStarted] = useState(false);
    
    function startQuiz() {
        setQuizStarted(true);
    }

    return (
        <div>
            <h1>POKKANTO</h1>
            <p>POKKANTO is a simple quiz app that tests your knowledge of the original 151 Pokémon. You'll be shown a picture of a Pokémon and four possible names. You have to choose the correct name of the Pokémon from the options provided. You'll be given a score at the end of the quiz based on how many questions you answered correctly.</p>
            <p>Click the "Start Quiz" button to begin the quiz.</p>
            <button onClick={startQuiz}>Start Quiz</button>
            <div>
                {quizStarted && <QuizQuestion />} {/* Render the question when quiz is started */}
            </div>
        </div>
    );
};

export default KantoPokemonQuiz;
