import React, { useState } from 'react';
import KantoPokemonQuiz from './KantoPokemonQuiz';
import LandingPage from './Landingpage';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
    const [subject, setSubject] = useState("");

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage setSubject={setSubject} />} />
                <Route path="/quiz" element={<KantoPokemonQuiz subject={subject} />} />
            </Routes>
        </Router>
    );
};

export default App;