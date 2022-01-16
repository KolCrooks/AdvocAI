import React from 'react';
import './intro.css';


function Intro() {
    return(
        <div class="intro">
            <div class="title">
                <h1>Devil's Avocado</h1>
            </div>
            <div class="inputArea">
                <h3 class="inquiry-prompt">Enter Your Legal Inquiry: </h3>
                <textarea class="inquiry-textarea"></textarea>
                <button class="btn">Submit</button>
            </div>
            <div class="outputArea">
                <h3 class="output-prompt">Your attorney suggests: </h3>
                <textarea readonly="readonly" class="output-textarea"></textarea>
            </div>
        </div>
    )
}

export default Intro;