import { Request, Response } from 'express';
import casesRepository, { CaseFilters } from '../repositories/casosRepository';
import CaseSchema from '../models/case';
import agentsRepository from '../repositories/agentesRepository';
import z from 'zod';
import { InvalidIDError } from '../errors/invalidID';
import { parseId } from '../utils';

async function getAllCases(req: Request, res: Response) {
	const filters = req.query as CaseFilters;

	if (filters.status !== undefined)
		CaseSchema.shape.status.parse(filters.status);

	if (filters.agente_id !== undefined)
		CaseSchema.shape.agente_id.parse(filters.agente_id);

	if (filters.q !== undefined) z.string().min(3).parse(filters.q);

	const cases = await casesRepository.findAll(filters);
	res.json(cases);
}

async function getAgentByCaseId(req: Request, res: Response) {
	const caseId = parseId('case', req.params.id);

	const foundCase = await casesRepository.findById(caseId);
	const agent = await agentsRepository.findById(foundCase.agente_id);
	res.json(agent);
}

async function getCaseById(req: Request, res: Response) {
	const caseId = parseId('case', req.params.id);

	const foundCase = await casesRepository.findById(caseId);
	res.json(foundCase);
}

async function createCase(req: Request, res: Response) {
	const newCase = CaseSchema.omit({ id: true }).parse(req.body);
	const createdCase = await casesRepository.createCase(newCase);
	res.status(201).json(createdCase);
}

async function overwriteCase(req: Request, res: Response) {
	const caseId = parseId('case', req.params.id);

	const updatedData = CaseSchema.omit({ id: true }).parse(req.body);
	const updatedCase = await casesRepository.updateCase(caseId, updatedData);
	res.json(updatedCase);
}

async function updateCase(req: Request, res: Response) {
	const caseId = parseId('case', req.params.id);

	const updatedData = CaseSchema.omit({ id: true }).partial().parse(req.body);
	const updatedCase = await casesRepository.updateCase(caseId, updatedData);
	res.json(updatedCase);
}

async function deleteCase(req: Request, res: Response) {
	const caseId = parseId('case', req.params.id);

	await casesRepository.deleteCase(caseId);
	res.status(204).send();
}

export default {
	getAllCases,
	getCaseById,
	getAgentByCaseId,
	createCase,
	overwriteCase,
	updateCase,
	deleteCase,
};
