import knex from '../db/db';
import { FutureDateError } from '../errors/futureDate';
import { NotFoundError } from '../errors/notFound';
import { Agent } from '../models/agent';

export type AgentFilters = {
	cargo?: string;
	sort?: 'dataDeIncorporacao' | '-dataDeIncorporacao';
};

async function findAll(filters?: AgentFilters): Promise<Agent[]> {
	const query = knex<Agent>('agentes');
	let builder;

	if (filters?.cargo) {
		builder = (builder ?? query).where('cargo', filters.cargo);
	}

	if (filters?.sort) {
		const column = 'dataDeIncorporacao';
		const direction = filters.sort.startsWith('-') ? 'desc' : 'asc';
		builder = (builder ?? query).orderBy(column, direction);
	}

	return (builder ?? query).select('*');
}

async function findById(id: number): Promise<Agent> {
	const result = await knex<Agent>('agentes').where({ id }).first();
	if (!result) {
		throw new NotFoundError('Agent', id);
	}
	return result;
}

async function createAgent(newAgent: Omit<Agent, 'id'>): Promise<Agent> {
	const date = new Date(newAgent.dataDeIncorporacao);
	if (date.getTime() > Date.now()) {
		throw new FutureDateError(date);
	}

	const result = await knex<Agent>('agentes').insert(newAgent).returning('*');
	if (result.length === 0) {
		throw new Error('Failed to create agent');
	}
	return result[0];
}

async function updateAgent(
	id: number,
	updatedAgent: Partial<Agent>,
): Promise<Agent> {
	const result = await knex<Agent>('agentes')
		.where({ id })
		.update(updatedAgent);

	if (result === 0) {
		throw new NotFoundError('Agent', id);
	}
	return findById(id);
}

async function deleteAgent(id: number): Promise<void> {
	const result = await knex<Agent>('agentes').where({ id }).del();
	if (result === 0) {
		throw new NotFoundError('Agent', id);
	}
}

export default {
	findAll,
	findById,
	createAgent,
	updateAgent,
	deleteAgent,
};
