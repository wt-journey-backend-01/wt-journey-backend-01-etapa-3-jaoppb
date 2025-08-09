import { DuplicateIDError } from '../errors/duplicateID';
import { NotFoundError } from '../errors/notFound';
import { Case } from '../models/case';
import agentsRepository from './agentesRepository';
import { v4 as uuid } from 'uuid';

const cases: Case[] = [
	{
		id: uuid(),
		titulo: 'homicidio',
		descricao:
			'Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.',
		status: 'aberto',
		agente_id: agentsRepository.findAll()[0].id,
	},
	{
		id: uuid(),
		titulo: 'furto',
		descricao:
			'Relato de furto de veículo às 14:20 do dia 12/07/2007 na região do bairro Centro.',
		status: 'solucionado',
		agente_id: agentsRepository.findAll()[1].id,
	},
];

export type CaseFilters = {
	status?: string;
	agente_id?: string;
	q?: string;
};

function findAll(filters?: CaseFilters): Case[] {
	let casesList = cases;
	if (filters?.status) {
		casesList = casesList.filter((c) => c.status === filters.status);
	}
	if (filters?.agente_id) {
		casesList = casesList.filter((c) => c.agente_id === filters.agente_id);
	}
	if (filters?.q) {
		const text = filters.q.toLowerCase().normalize();
		casesList = casesList.filter(
			(c) =>
				c.titulo.toLowerCase().includes(text) ||
				c.descricao.toLowerCase().includes(text),
		);
	}
	return casesList;
}

function findById(id: string): Case {
	const foundCase = cases.find((c) => c.id === id);
	if (foundCase === undefined) throw new NotFoundError('Case', id);
	return foundCase;
}

function createCase(newCase: Omit<Case, 'id'>): Case {
	const caseWithId: Case = {
		...newCase,
		id: uuid(),
	};

	try {
		findById(caseWithId.id);
		throw new DuplicateIDError(caseWithId.id);
	} catch (error) {
		if (!(error instanceof NotFoundError)) throw error;
	}

	// Throw an error if the agent does not exist
	agentsRepository.findById(caseWithId.agente_id);

	cases.push(caseWithId);
	return caseWithId;
}

function updateCase(case_: Case, updatedCase: Partial<Case>): Case {
	if (updatedCase.agente_id) {
		// Throw an error if the agent does not exist
		agentsRepository.findById(updatedCase.agente_id);
	}

	Object.assign(case_, updatedCase);
	return case_;
}

function deleteCase(id: string): void {
	const index = cases.findIndex((c) => c.id === id);
	if (index === -1) throw new NotFoundError('Case', id);
	cases.splice(index, 1);
}

export default {
	findAll,
	findById,
	createCase,
	updateCase,
	deleteCase,
};
