import { useState } from "react";
import TypeWriter from "react-typewriter";
import RobotMessage from "./roboMessage";

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
                    <input className="outline outline-1"></input>
                    {
                        i === state-1 ?
                        <button className="font-serif bg-black text-white rounded-md p-2 act" onClick={()=> setState(j=> j+1)}>Submit</button>
                    : <></>
                    }
                </div>);
            } else{
                out.push(<div className="py-4" key={i}>
                        <TypeWriter onTypingEnd={()=>incState()} typing={1}>{messages[i]}</TypeWriter>
                    </div>);
            
            }
        }
        return out;
    }

    return (
        <div className="Landing flex flex-col justify-center items-center min-h-full min-w-full transition-all">
            <div className="py-1 m-0 font-serif text-5xl text-left tracking-wide">
                AdvocAI
            </div>
            <div className="py-0 m-0 font-serif text-2xl italic">
                Your AI Lawyer.
            </div>
            <button className="font-serif bg-black text-white rounded-md p-2" onClick={()=>setState(1)}>Help me.</button>
            {get_messages()}
        </div>
      )
}