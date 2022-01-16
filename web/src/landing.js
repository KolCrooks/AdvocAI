import { useState, useEffect, useRef } from "react";
import { Transition } from "react-transition-group";
import {HiCheck} from "react-icons/hi"
import TypeWriter from "react-typewriter";
import TextareaAutosize from 'react-textarea-autosize';
import { Ellipsis } from "react-awesome-spinners";
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

const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };
function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

export default function Landing() {
    const [state, setState] = useState(0);
    const incState = () => setState(state+1);
    const forceUpdate = useForceUpdate();

    const [dialog, setDialog] = useState([
        "> I’m AdvocAI, your AI advocate.",
        "> Using the advice of thousands of internet commenters, I've been built to give you legal advice.",
        "> I mean, not sure why you’d go to a lawyer in the first place… unless you’re into the pretentious suits and overpriced rates.",
        "> Let’s get down to business… could you briefly describe your legal issues for me?",
        "> You don’t need to go into a ton of detail, I just need enough to know what sort of mess you got yourself into.",
        "<input=question>",
        "> Hmm, okay, I can see why you came to me.",
        "> How exactly did you get yourself into this mess?",
        "> Hopefully there's a reasonable answer...",
        "<input=cause>",
        "> Maybe if you were trained with thousands of real world cases, you wouldn’t get into this situation in the first place.",
        "> But I guess that’s why I exist-- to solve *this* whole situation.",
        "> Legally, what’s your biggest concern right now?",
        "> I mean, I can think of a million reasons why you’d be concerned if I was in your position...",
        "<input=concern>",
        "> Hmm, that’s a valid response… I guess.",
        "> Is there anything else I should know?", 
        "> Try to give me as much as I can work with here.",
        "<input=details>",
        "> Thanks, that should be enough to work with.",
        "> Let me whip something up",
        ""
    ]);

    const [message, setMessage] = useState({});
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const get_messages = () => {
        const out = [];
        for (let i = 0; i < state && i < dialog.length; i++) {
            if (dialog[i].startsWith('<input')){
                const tag = dialog[i].split('<input=')[1].split('>')[0];
                out.push(
                <div key={i} className="flex resize-none flex-column flex-none">
                    <TextareaAutosize id={i + "_QUESTION"} autoFocus className="resize-none text-right flex-wrap p-1.5 h-min half-margin w-full outline-1 border-none rounded-md outline font-md text-gray-500 transition-all"
                        onKeyDown={e => {// Enter pressed
                            if (e.keyCode == 13)
                            {
                                //method to prevent from default behaviour
                                e.preventDefault();
                            }}}
                        disabled={i !== state-1}
                        style={{outline: i !== state-1 ? 'none' : 'solid'}}></TextareaAutosize>
                    <button className="font-serif text-black rounded-full ml-4 mr-20 transition-opacity" disabled={i !== state-1}
                        style= {{
                            opacity: i === state-1 ? 1 : 0,
                        }}
                    onClick={()=> {
                        if(i !== state-1) return; 
                            setMessage(m => {m[tag] = document.getElementById(i + "_QUESTION").value; return {...m}});
                        
                        setState(j=> j+1)
                    }}><HiCheck size={30} /></button>
                    
                </div>);
            } else{
                out.push(<div className={"ai-output py-4 w-3/4" + (i === dialog.length-1 ? ' text-center' : '')} key={i}>
                        <TypeWriter onTypingEnd={()=>incState()} typing={2}>
                            {dialog[i]}
                        </TypeWriter>
                    </div>);
            
            }
        }
        if(state === dialog.length-1) {
            // DO FINAL THING
            if(response === '' && !loading) {
                setLoading(true);
                const question = message.question;
                const body = `${message.cause}\n ${message.details}\n ${message.concern}`;

                fetch(`https://valley-22.herokuapp.com/completion?question=${question}&body=${body}`)
                    .then(res => res.json())
                    .then(res => {
                        dialog[dialog.length - 1] = `${res.data}`;
                        console.log(dialog);
                        setLoading(r=> false);
                        setResponse(res.data);
                    })
            }
        }
        return out;
    }
    
    

    return (
        <div className="Landing flex flex-col min-h-full min-w-full"> 
            <Transition in={state === 0} timeout={duration}>
                {state => <div className=""
                    style={{
                        ...defaultStyle,
                        ...transitionStyles[state] 
                      }}>
                    <div className="flex flex-col justify-center items-center grow transition-all absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="py-1 m-0 font-serif text-5xl text-left tracking-wide">
                            AdvocAI
                        </div>
                        <div className="py-0 m-0 font-serif text-2xl italic ">
                            Your AI Advocate.
                        </div>
                        <div className="pt-3">
                            <button className="font-serif bg-black text-white rounded-md p-2 m-2" onClick={()=>setState(1)}>Consult</button>
                        </div>
                    </div>
                    <div className="flex justify-between items-end bottom-0 absolute w-full">
                        <div className="flex alight-left justify-left align-center pb-5 pl-5 h-full">A project by Team Valley</div>
                        <div className="flex text-xs align-text-bottom align-center justify-center pb-2 h-full opacity-60">Disclaimer: The information provided on this website does not, and is not intended to, constitute real legal advice.</div>    
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
                    <div>
                        <div className="p-16"></div>
                        {get_messages()}
                        <div className="p-20"></div>
                        <AlwaysScrollToBottom/>
                    </div>
                </div>}
            </Transition>
            
        </div>
      )
}