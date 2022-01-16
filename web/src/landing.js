import { useState } from "react";
import { Transition } from "react-transition-group";
import TypeWriter from "react-typewriter";
import RobotMessage from "./roboMessage";

const duration = 800;
const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
};  

const transitionStyles = {
    entering: { opacity: 0 },
    entered:  { opacity: 1 },
    exiting:  { opacity: 0 },
    exited:  { opacity: 0, display: 'none' },
};


export default function Landing() {
    const [state, setState] = useState(0);
    const incState = () => setState(state+1);
    const messages = [
        "I’m AdvocAI, your AI advocate.",
        "Using the advice of thousands of internet commenters, I've been built to give you legal advice.",
        "I mean, not sure why you’d go to a lawyer in the first place… unless you’re into the pretentious suits and overpriced rates.",
        "Let’s get down to business… could you briefly describe your legal issues for me?",
        "You don’t need to go into a ton of detail, I just need enough to know what sort of mess you got yourself into.",
        "<input>",
        "Hmm, okay, I can see why you came to me.",
        "How exactly did you get yourself into this mess?",
        "Hopefully there's a reasonable answer...",
        "<input>",
        "Maybe if you were trained with thousands of real world cases, you wouldn’t get into this situation in the first place.",
        "But I guess that’s why I exist-- to solve *this* whole situation.",
        "Legally, what’s your biggest concern right now?",
        "I mean, I can think of a million reasons why you’d be concerned if I was in your position...",
        "<input>",
        "Hmm, that’s a valid response… I guess.",
        "Try to give me as much as I can work with here.",
        "<input>",
        "Thanks, that should be enough to work with.",
        "Let me whip something up…",
    ]

    const get_messages = () => {
        const out = [];
        for(let i = 0; i < state && i < messages.length; i++) {
            if(messages[i] === "<input>"){
                out.push(
                <div key={i}>
                    <input className="outline outline-1 w-min"></input>
                    {
                        i === state-1 ?
                        <button className="font-serif bg-black text-white rounded-md p-2" onClick={()=> setState(j=> j+1)}>Submit</button>
                    : <></>
                    }
                </div>);
            } else{
                out.push(<div className="py-4 m-0 font-mono" key={i} >
                        <TypeWriter onTypingEnd={()=>incState()} typing={2} fixed>{messages[i]}</TypeWriter>
                    </div>);
            
            }
        }
        return out;
    }

    return (
        <div>
            <Transition in={state === 0} timeout={duration}>
                {state => <div className="Landing flex flex-col justify-center items-center min-h-full min-w-full transition-all"
                    style={{
                        ...defaultStyle,
                        ...transitionStyles[state]
                      }}>
                    <div className="py-1 m-0 font-serif text-5xl text-left tracking-wide">
                        AdvocAI
                    </div>
                    <div className="py-0 m-0 font-serif text-2xl italic">
                        Your AI Lawyer.
                    </div>
                    <button className="font-serif bg-black text-white rounded-md p-2" onClick={()=>setState(1)}>Help me.</button>
                </div>}
            </Transition>
            <Transition in={state !== 0} timeout={duration}>
                {state =>
                    <div className="flex flex-col items-center min-h-full min-w-full"
                        style={{
                        ...defaultStyle,
                        ...transitionStyles[state]
                      }}>
                        {get_messages()}
                    </div>}
            </Transition>
        </div>
      )
}