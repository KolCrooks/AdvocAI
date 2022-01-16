import React from 'react';
import './intro.css';


function Intro() {
    return(
        <body>
            <div class="title">
                <h1>Devil's Avocado</h1>
            </div>
            <div class="inputArea">
                <h3 class="inquiry-prompt">Enter Your Legal Inquiry: </h3>
                <textarea class="inquiry-textarea"></textarea>
                <button class="btn">Submit</button>
            </div>
        </body>
    )
}

export default Intro;