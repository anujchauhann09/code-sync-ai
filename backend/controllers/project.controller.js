import projectModel from "../models/project.model.js";
import * as projectService from "../services/project.service.js";
import { validationResult } from "express-validator";
import userModel from "../models/user.model.js";

export const createProjectController = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try {
        const { name } = req.body;
        const loggedInUser = await userModel.findOne({ email: req.user.email });

        const userId = loggedInUser._id;

        const newProject = await projectService.createProject({name, userId});

        return res.status(201).json({newProject});
    } catch (error) {
        return res.status(401).json({errors: error.message});
    }
}

export const getAllProjectController = async (req, res) => {
    try {
        const loggedInUser = await userModel.findOne({email: req.user.email});

        const userAllProjects = await projectService.getAllProject({userId: loggedInUser._id});

        return res.status(200).json({projects: userAllProjects});
    } catch (error) {
        console.log(error);
        return res.status(400).json({error: error.message});
    }
}

export const addUserToProjectController = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({erros: errors.array()});
    }

    try {
        const {projectId, users} = req.body;

        const loggedInUser = await userModel.findOne({email: req.user.email});

        const project = await projectService.addUserToProject({projectId, users, userId: loggedInUser._id});

        return res.status(200).json({project});
    } catch (error) {
        console.log(error)
        return res.status(400).json({error: error.message});
    }
}

export const getProjectByIdController = async (req, res) => {
    const {projectId} = req.params;

    try {
        const project = await projectService.getProjectById(projectId);

        return res.status(200).json({project});
    } catch (error) {
        console.log(error);
        return res.status(400).json({error: error.message});
    }
}