import React, {useState} from 'react';
import { useLocation } from 'react-router-dom';

const Project = () => {
    const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

    const location = useLocation();

    // console.log(location.state);

    return (
        <main className='h-screen w-screen flex'>
            <section className="left relative flex flex-col h-full min-w-96 bg-slate-300">
                <header className='flex justify-end p-2 px-4 w-full bg-slate-100'>
                    <button onClick={() => setIsSidePanelOpen(!isSidePanelOpen)} className='p-2 outline-0'>
                        <i className="ri-group-fill"></i>
                    </button>
                </header>

                <div className="conversation-box flex flex-col flex-grow">
                    <div className="message-box p-1 flex-grow flex flex-col gap-1">
                        <div className="incoming max-w-56 message flex flex-col p-2 bg-slate-50 w-fit rounded-md">
                            <small className='opacity-65 text-xs'>example@gmail.com</small>
                            <p className='text-sm break-words'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati quam magni facere at expedita aut officia eius omnis, rerum voluptate?</p>
                        </div>

                        <div className="outgoing max-w-56 message ml-auto flex flex-col p-2 bg-slate-50 w-fit rounded-md">
                            <small className='opacity-65 text-xs'>example@gmail.com</small>
                            <p className='text-sm break-words'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis debitis eius vero consequatur dolore aut unde mollitia optio dicta enim quis repudiandae, ipsa facilis numquam alias laboriosam nostrum adipisci. Aliquid.</p>
                        </div>
                    </div>
                    
                    <div className="input-field w-full flex">
                        <input type="text" placeholder='Enter message' className='p-2 outline-0 px-4 border-none flex-grow' />
                        <button className='px-5 bg-slate-950 text-white'>
                            <i class="ri-send-plane-fill"></i>
                        </button>
                    </div>
                </div>

                <div className={`side-panel flex flex-col gap-2 w-full h-full bg-slate-50 absolute transition-all ${isSidePanelOpen ? 'translate-x-0' : '-translate-x-full'} top-0`}>
                    <header className='flex justify-end p-2 px-3 bg-slate-200'>
                        <button className='p-2' onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}>
                            <i className='ri-close-fill'></i>
                        </button>
                    </header>

                    <div className="users flex flex-col gap-2">
                        <div className="user cursor-pointer hover:bg-slate-200 p-2 flex items-center gap-2">

                            <div className='aspect-square rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600'>
                                <i className="ri-user-fill absolute"></i>
                            </div>

                            <h2 className='font-semibold text-lg'>Username</h2>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Project;