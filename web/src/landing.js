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
        "Hello World!",
        "<input>",
        "I am a robot",
        "cool, right?",
        "<input>",
        "Hi",
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
                out.push(<div className="py-4 m-0" key={i}>
                        <TypeWriter onTypingEnd={()=>incState()} typing={1}>{messages[i]}</TypeWriter>
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