import express from 'express';
import { createTeam, deleteTeam, getTeams } from '../controller/team.controller.js';
import { verifyToken } from '../middlewere/verify.token.js';

export const teamRoute = express.Router();

teamRoute.post('/',verifyToken, createTeam);

teamRoute.get('/', getTeams);

teamRoute.delete('/:id',verifyToken, deleteTeam);
