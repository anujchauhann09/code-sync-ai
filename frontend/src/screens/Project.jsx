import axios from '../config/axios.js';
import React, {useEffect, useState, useContext, createRef} from 'react';
import { UserContext } from '../context/user.context.jsx';
import { useLocation } from 'react-router-dom';
import { initiliazeSocket, receiveMessage, sendMessage } from '../config/socket.js';

const Project = () => {
    const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState([]);
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');

    const messageBox = createRef();
    const { user } = useContext(UserContext);

    const location = useLocation();
    // console.log(location.state);

    const [project, setProject] = useState(location.state.project || {});

    const handleUserClick = (id) => {
        setSelectedUserId(prevSelectedUserId => {
            const newSelectedUserId = new Set(prevSelectedUserId);

            if(newSelectedUserId.has(id)) {
                newSelectedUserId.delete(id);
            }
            else {
                newSelectedUserId.add(id);
            }

            Array.from(newSelectedUserId);
            return newSelectedUserId;
        });
    };

    const handleAddCollaborator = () => {
        if (Array.from(selectedUserId).length !== 0) {
            console.log(`Added collaborator with ID: ${Array.from(selectedUserId)}`);

            axios.put('/projects/add-user', {
                projectId: location.state.project._id,
                users: Array.from(selectedUserId)
            }).then(res => {
                // console.log(res.data);
                setIsModalOpen(false);
                setSelectedUserId([]);
            }).catch(err => {
                console.log(err);
            });
        }
    };

    function handleSendMessage() {
        sendMessage('project-message', {
            message,
            sender: user
        });

        appendOutgoingMessage(message);
        setMessage('');
    }

    function appendIncomingMessage(messageObject) {
        const messageBox = document.querySelector('.message-box');
        const message = document.createElement('div');

        message.classList.add('incoming', 'message', 'max-w-56', 'flex', 'flex-col', 'p-2', 'bg-slate-50', 'w-fit', 'rounded-md');
        message.innerHTML = `
            <small class='opacity-65 text-xs'>${messageObject.sender.email}</small>

            <p class='text-sm break-words'>${messageObject.message}</p>
        `;

        messageBox.appendChild(message);
        scrollToBottom();
    }

    function appendOutgoingMessage(message) {
        const messageBox = document.querySelector('.message-box');
        const newMessage = document.createElement('div');

        newMessage.classList.add('outgoing', 'message', 'max-w-56', 'ml-auto', 'flex', 'flex-col', 'p-2', 'bg-slate-50', 'w-fit', 'rounded-md');
        newMessage.innerHTML = `
            <small class='opacity-65 text-xs'>${user.email}</small>

            <p class='text-sm break-words'>${message}</p>
        `;

        messageBox.appendChild(newMessage);
        scrollToBottom();
    }

    function scrollToBottom() {
        messageBox.current.scrollTop = messageBox.current.scrollHeight;
    }

    useEffect(() => {
        initiliazeSocket(project._id);

        receiveMessage('project-message', data => {
            appendIncomingMessage(data);

            console.log(data);
        })

        axios
            .get(`/projects/get-project/${location.state.project._id}`)
            .then((res) => {
                // console.log(res.data.project)
                setProject(res.data.project || {}); 
            })
            .catch((error) => {
                console.error('Failed to fetch projects:', error);
                setProject({}); 
            });

        axios
            .get('/users/all')
            .then((res) => {
                setUsers(res.data.users || []); 
            })
            .catch((error) => {
                console.error('Failed to fetch users:', error);
                setUsers([]); 
            });
    }, []);

    return (
        <main className='h-screen w-screen flex'>
            <section className="left relative flex flex-col h-screen min-w-96 bg-slate-300">
                <header className='flex justify-between items-center p-2 px-4 w-full bg-slate-100 absolute top-0'>
                <   button className="flex gap-1" onClick={() => setIsModalOpen(true)}>
                        <i className="ri-add-fill"></i>
                        <p>Add collaborator</p>
                    </button>

                    <button onClick={() => setIsSidePanelOpen(!isSidePanelOpen)} className='p-2 outline-0'>
                        <i className="ri-group-fill"></i>
                    </button>
                </header>

                <div className="conversation-box flex flex-col flex-grow pt-16 py-12 h-full relative">
                <div 
                    ref={messageBox}
                    
                    className="message-box p-1 flex-grow flex flex-col gap-1 overflow-auto max-h-full">
                </div>
                
                <div className="input-field w-full flex absolute bottom-0">
                        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Enter message' className='p-2 outline-0 px-4 border-none flex-grow' />
                        <button onClick={handleSendMessage} className='px-5 bg-slate-950 text-white'>
                            <i className="ri-send-plane-fill"></i>
                        </button>
                    </div>
                </div>

                <div className={`side-panel flex flex-col gap-2 w-full h-full bg-slate-50 absolute transition-all ${isSidePanelOpen ? 'translate-x-0' : '-translate-x-full'} top-0`}>
                    <header className='flex justify-between items-center p-2 px-3 bg-slate-200'>
                        <h1 className='text-lg font-semibold'>Collaborators</h1>

                        <button className='p-2' onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}>
                            <i className='ri-close-fill'></i>
                        </button>
                    </header>

                    <div className="users flex flex-col gap-2">
                        {
                            project.users && project.users.map(user => {
                                return (
                                    <div key={user._id} className="user cursor-pointer hover:bg-slate-200 p-2 flex items-center gap-2">

                                        <div className='aspect-square rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600'>
                                            <i className="ri-user-fill absolute"></i>
                                        </div>

                                        <h2 className='font-semibold text-lg'>{user.email}</h2>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </section>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-5 w-11/12 md:w-1/3">
                        <header className='flex justify-between items-center p-1'>
                            <h2 className="text-lg font-semibold mb-4">Select users</h2>
                            <button
                                className="mb-2 mr-2 text-lg"
                                onClick={() => setIsModalOpen(false)}
                            >
                                <i className='ri-close-fill'></i>
                            </button>
                        </header>
                        <div className="users-list max-h-96 overflow-auto">
                            <ul className="space-y-2">
                                {users.map((user) => (
                                    <li
                                        key={user._id}
                                        onClick={() => handleUserClick(user._id)}
                                        className={`p-3 rounded-lg cursor-pointer hover:bg-slate-200 ${
                                            Array.from(selectedUserId).indexOf(user._id) !== -1 ? 'bg-slate-300' : ''
                                        }`}
                                    >
                                        <i className='ri-user-fill mr-1'></i>
                                        {user.email}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button
                            className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg"
                            onClick={handleAddCollaborator}
                            disabled={selectedUserId === null}
                        >
                            Add Collaborator
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}

export default Project;