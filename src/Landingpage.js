import React from "react";
import { useNavigate } from "react-router-dom"; 

const LandingPage = ({ setSubject }) => {
    const navigate = useNavigate();

    const handleSubjectClick = (subject) => {
        setSubject(subject); 
        navigate('/quiz'); 
    };

    return (
        <div className="us">
            <h1 className="quizpod">QUIZPOD</h1>
            <img className="landingimage" src={require('./image/image4.png')} alt="landingpageimage" />
            <div className="landingtext">
                <h2 className="imagetext">PRACTICE</h2>
                <h2 className="imagetext">ANALYZE AND</h2>
                <h2 className="imagetext">REPEAT</h2>
            </div>
            <div className="white-line"></div>
            <div className="subjectdisplay1">
                <button className="subject maths" onClick={() => handleSubjectClick('maths')}>
                    MATHS
                </button>
                <button className="subject science" onClick={() => handleSubjectClick('science')}>
                    SCIENCE
                </button>
                <button className="subject english" onClick={() => handleSubjectClick('english')}>
                    ENGLISH
                </button>
            </div>
            <div className="subjectdisplay2">
                <button className="subject computer" onClick={() => handleSubjectClick('computer')}>
                    COMPUTER
                </button>
                <button className="subject sst" onClick={() => handleSubjectClick('sst')}>
                    SST 
                </button>
                <button className="subject gk" onClick={() => handleSubjectClick('gk')}>
                    GK
                </button>
            </div>
        </div>
    );
};

export default LandingPage;
