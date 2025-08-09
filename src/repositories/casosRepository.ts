import { NotFoundError } from '../errors/notFound';
import { Case } from '../models/case';
import { knex } from 'knex';

export type CaseFilters = {
	status?: string;
	agente_id?: string;
	q?: string;
};

async function findAll(filters?: CaseFilters): Promise<Case[]> {
	const query = knex<Case>('cases');
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
	return knex<Case>('cases')
		.where({ id })
		.first()
		.then((foundCase) => {
			if (foundCase === undefined) throw new NotFoundError('Case', id);
			return foundCase;
		});
}

async function createCase(newCase: Omit<Case, 'id'>): Promise<Case> {
	return knex<Case>('cases')
		.insert(newCase)
		.returning('*')
		.then((rows) => rows[0]);
}

async function updateCase(
	id: number,
	updatedCase: Partial<Case>,
): Promise<Case> {
	await knex<Case>('cases')
		.where({ id })
		.update(updatedCase)
		.then((count) => {
			if (count === 0) throw new NotFoundError('Case', id);
		});
	return findById(id);
}

async function deleteCase(id: number): Promise<void> {
	return knex<Case>('cases')
		.where({ id })
		.delete()
		.then((count) => {
			if (count === 0) throw new NotFoundError('Case', id);
		});
}

export default {
	findAll,
	findById,
	createCase,
	updateCase,
	deleteCase,
};
