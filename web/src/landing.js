import { useState } from "react";
import { Transition } from "react-transition-group";
import {HiCheck} from "react-icons/hi"
import TypeWriter from "react-typewriter";
import "./index.css";

const duration = 800;
const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
};  

const transitionStyles = {
    entering: { opacity: 0 },
    entered:  { opacity: 1 },
    exiting:  { opacity: 0 },
    exited:   { opacity: 0, display: 'none' },
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
        "<input=question>",
        "Hmm, okay, I can see why you came to me.",
        "How exactly did you get yourself into this mess?",
        "Hopefully there's a reasonable answer...",
        "<input=cause>",
        "Maybe if you were trained with thousands of real world cases, you wouldn’t get into this situation in the first place.",
        "But I guess that’s why I exist-- to solve *this* whole situation.",
        "Legally, what’s your biggest concern right now?",
        "I mean, I can think of a million reasons why you’d be concerned if I was in your position...",
        "<input=concern>",
        "Hmm, that’s a valid response… I guess.",
        "Is there anything else I should know?", 
        "Try to give me as much as I can work with here.",
        "<input=details>",
        "Thanks, that should be enough to work with.",
        "Let me whip something up…",
    ]

    const [message, setMessage] = useState({});
    const [response, setResponse] = useState("")

    const get_messages = () => {
        const out = [];
        for (let i = 0; i < state && i < messages.length; i++) {
            if (messages[i].startsWith('<input')){
                const tag = messages[i].split('<input=')[1].split('>')[0];
                out.push(
                <div key={i} className="flex resize-none flex-column flex-none">
                    <textarea autoFocus className="resize-none flex-wrap outline outline-1 text-right w-full outline-0 border-none font-mono text-area-padding"></textarea>
                    {
                        i === state-1 ?
                        <button className="font-serif bg-black text-white rounded-md" 
                        onClick={()=> {
                            setMessage(m => {m[tag] = document.getElementById(i + "_QUESTION").value; return {...m}});
                            setState(j=> j+1)
                        }}><HiCheck /></button>
                    : <></>
                    }
                </div>);
            } else{
                out.push(<div className="ai-output py-4 flex-non" key={i}>
                        <TypeWriter onTypingEnd={()=>incState()} typing={2}>{messages[i]}</TypeWriter>
                    </div>);
            
            }
        }
        if(state === messages.length-1) {
            // DO FINAL THING
            if(response === ''){
                const question = message.question;
                const body = `${message.cause}\n ${message.details}\n ${message.concern}`;
                fetch(`http://127.0.0.1:8000/completion?question=${question}&body=${body}`)
                    .then(res => res.json())
                    .then(res => setResponse(res.data))
            }
        }
        return out;
    }

    return (
        <div className="Landing flex flex-col min-h-full min-w-full"> 
            <Transition in={state === 0} timeout={duration}>
                {state => <div className="flex flex-col grow"
                    style={{
                        ...defaultStyle,
                        ...transitionStyles[state] 
                      }}>
                    <div className="flex flex-col justify-center items-center grow transition-all">
                        <div className="py-1 m-0 font-serif text-5xl text-left tracking-wide">
                            AdvocAI
                        </div>
                        <div className="py-0 m-0 font-serif text-2xl italic ">
                            Your AI Lawyer.
                        </div>
                        <div className="pt-3">
                            <button className="font-serif bg-black text-white rounded-md p-2" onClick={()=>setState(1)}>Consult</button>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex alight-left justify-left align-center pb-5 pl-5 h-full">A project by Team Valley</div>
                        <div className="flex text-xs align-text-bottom align-center justify-center pb-2 h-full">Disclaimer: The information provided on this website does not, and is not intended to, constitute real legal advice.</div>    
                        <div className="flex alight-left justify-left pb-5 pl-5 opacity-0">A project by Team Valley</div>
                    </div>
                </div>}
            </Transition>
            <Transition in={state !== 0} timeout={duration}>
                {state =>
                    <div className="message-page flex flex-col text-padding min-h-full min-w-full"
                        style={{
                        ...defaultStyle,
                        ...transitionStyles[state]
                      }}>
                    <div p-2></div>
                    <div>
                        {get_messages()}
                    </div>
                </div>}
            </Transition>
            {response}
        </div>
      )
}