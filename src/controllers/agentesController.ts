import { Request, Response } from 'express';
import agentRepository, {
	AgentFilters,
} from '../repositories/agentesRepository';
import AgentSchema from '../models/agent';
import z from 'zod';
import { InvalidIDError } from '../errors/invalidID';
import { parseId } from '../utils';

export const sortFilter = z.enum(['dataDeIncorporacao', '-dataDeIncorporacao']);

async function getAllAgents(req: Request, res: Response) {
	const filters = req.query as AgentFilters;

	if (filters.cargo !== undefined)
		AgentSchema.shape.cargo.parse(filters.cargo);
	if (filters.sort !== undefined) sortFilter.parse(filters.sort);

	const agents = await agentRepository.findAll(filters);
	res.json(agents);
}

async function getAgentById(req: Request, res: Response) {
	const agentId = parseId('agent', req.params.id);

	const foundAgent = await agentRepository.findById(agentId);
	res.json(foundAgent);
}

async function createAgent(req: Request, res: Response) {
	const newAgent = AgentSchema.omit({ id: true }).parse(req.body);
	const createdAgent = await agentRepository.createAgent(newAgent);
	res.status(201).json(createdAgent);
}

async function overwriteAgent(req: Request, res: Response) {
	const agentId = parseId('agent', req.params.id);

	const updatedData = AgentSchema.omit({ id: true }).parse(req.body);
	const updatedAgent = await agentRepository.updateAgent(
		agentId,
		updatedData,
	);
	res.json(updatedAgent);
}

async function updateAgent(req: Request, res: Response) {
	const agentId = parseId('agent', req.params.id);

	const updatedData = AgentSchema.omit({ id: true })
		.partial()
		.parse(req.body);
	const updatedAgent = await agentRepository.updateAgent(
		agentId,
		updatedData,
	);
	res.json(updatedAgent);
}

async function deleteAgent(req: Request, res: Response) {
	const agentId = parseId('agent', req.params.id);

	await agentRepository.deleteAgent(agentId);
	res.status(204).send();
}

export default {
	getAllAgents,
	getAgentById,
	createAgent,
	overwriteAgent,
	updateAgent,
	deleteAgent,
};
