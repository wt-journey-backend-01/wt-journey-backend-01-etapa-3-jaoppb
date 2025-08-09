import { Knex } from 'knex';

async function seed(knex: Knex) {
	await knex('casos').del();
	await knex('casos').insert([
		{
			id: 1,
			titulo: 'Caso 1',
			descricao: 'Descrição do caso 1',
			status: 'aberto',
			agenteId: 1,
		},
		{
			id: 2,
			titulo: 'Caso 2',
			descricao: 'Descrição do caso 2',
			status: 'solucionado',
			agenteId: 2,
		},
		{
			id: 3,
			titulo: 'Caso 3',
			descricao: 'Descrição do caso 3',
			status: 'aberto',
			agenteId: 3,
		},
	]);
}

export { seed };
