import { NotFoundError } from '../errors/notFound';
import { Case } from '../models/case';
import knex from '../db/db';

export type CaseFilters = {
	status?: string;
	agente_id?: string;
	q?: string;
};

async function findAll(filters?: CaseFilters): Promise<Case[]> {
	const query = knex<Case>('casos');
	let builder;

	if (filters?.status) {
		builder = (builder ?? query).where('status', filters.status);
	}
	if (filters?.agente_id) {
		builder = (builder ?? query).where('agente_id', filters.agente_id);
	}
	if (filters?.q) {
		const text = `%${filters.q.toLowerCase()}%`;
		builder = (builder ?? query).where(function () {
			this.whereRaw('LOWER(titulo) LIKE ?', [text]).orWhereRaw(
				'LOWER(descricao) LIKE ?',
				[text],
			);
		});
	}

	return await (builder ?? query).select();
}

async function findById(id: number): Promise<Case> {
	const result = await knex<Case>('casos').where({ id }).first();
	if (!result) {
		throw new NotFoundError('Case', id);
	}
	return result;
}

async function createCase(newCase: Omit<Case, 'id'>): Promise<Case> {
	const agenteExists = await knex('agentes')
		.where({ id: newCase.agente_id })
		.first();
	if (!agenteExists) {
		throw new NotFoundError('Agent', newCase.agente_id);
	}

	return (await knex<Case>('casos').insert(newCase).returning('*'))[0];
}

async function updateCase(
	id: number,
	updatedCase: Partial<Case>,
): Promise<Case> {
	if (updatedCase.agente_id) {
		const agenteExists = await knex('agentes')
			.where({ id: updatedCase.agente_id })
			.first();
		if (!agenteExists) {
			throw new NotFoundError('Agent', updatedCase.agente_id);
		}
	}

	const result = await knex<Case>('casos').where({ id }).update(updatedCase);
	if (result === 0) {
		throw new NotFoundError('Case', id);
	}
	return findById(id);
}

async function deleteCase(id: number): Promise<void> {
	const result = await knex<Case>('casos').where({ id }).delete();
	if (result === 0) {
		throw new NotFoundError('Case', id);
	}
}

export default {
	findAll,
	findById,
	createCase,
	updateCase,
	deleteCase,
};
