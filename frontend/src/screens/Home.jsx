import React, { useContext, useState } from 'react';
import { UserContext } from '../context/user.context.jsx';
import axios from '../config/axios.js';

const Home = () => {
    const { user } = useContext(UserContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [projectName, setProjectName] = useState('');

    const createProject = () => {
        setIsModalOpen(true); 
    };

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
            <div className="projects flex justify-start">
                <button
                    onClick={createProject}
                    className="project p-4 border border-slate-300 rounded-md bg-blue-500 text-white hover:bg-blue-600"
                >
                    <i className="ri-link"></i> Create Project
                </button>
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