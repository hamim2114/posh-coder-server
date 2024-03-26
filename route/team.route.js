import express from 'express';
import { createTeam, deleteTeam, editTeams, getTeams } from '../controller/team.controller.js';
import { verifyToken } from '../middlewere/verify.token.js';

export const teamRoute = express.Router();

teamRoute.post('/add',verifyToken, createTeam);

teamRoute.get('/allTeams', getTeams);

teamRoute.put('/edit/:id', editTeams);

teamRoute.delete('/delete/:id',verifyToken, deleteTeam);
