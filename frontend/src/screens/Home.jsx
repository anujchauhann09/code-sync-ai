import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/user.context.jsx';
import axios from '../config/axios.js';
import {useNavigate} from 'react-router-dom';

const Home = () => {
    const { user } = useContext(UserContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [projectName, setProjectName] = useState('');
    const [project, setProject] = useState([]);

    const navigate = useNavigate();

    const createProject = () => {
        setIsModalOpen(true); 
    };

    useEffect(() => {
        axios.get('/projects/all').then((res) => setProject(res.data.projects)).catch((error) => console.log(error));
    }, []);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log("Project Name:", projectName); 

        axios.post('projects/create', {
            name: projectName
        }).then((res) => {
            console.log(res)
            setIsModalOpen(false); 
            setProjectName(''); 
        }).catch((err) => {
            console.log(err);
        })
    };

    return (
        <main className="p-4">
            <div className="projects flex flex-col flex-wrap gap-3 justify-start items-start space-y-2">
                <button
                    onClick={createProject}
                    className="project p-4 border border-slate-300 rounded-md bg-blue-500 text-white hover:bg-blue-600 w-auto"
                >
                    <i className="ri-link"></i> Create Project
                </button>

                {project.map((project) => (
                    <div key={project._id} onClick={() => { navigate(`/project`, { state: {project} }) }} className="project flex flex-col items-start gap-2 p-4 w-auto border border-slate-300 rounded-md min-w-52 hover:bg-slate-100 ">
                        <h2 className='font-semibold'>{project.name}</h2>
                        
                        <div className='flex gap-2'>
                            <p><i className="ri-user-line"></i> <small>Collaborators</small> : {project.users.length}</p>
                        </div>
                    </div>
                ))}
            </div>


            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-md shadow-lg w-80">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Create New Project</h2>
                        <form onSubmit={handleFormSubmit}>
                            <div className="mb-4">
                                <label
                                    htmlFor="projectName"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Project Name
                                </label>
                                <input
                                    type="text"
                                    id="projectName"
                                    value={projectName}
                                    onChange={(e) => setProjectName(e.target.value)}
                                    className="w-full border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter project name"
                                    required
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </main>
    );
};

export default Home;