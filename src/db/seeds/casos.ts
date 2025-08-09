import { Knex } from 'knex';

async function seed(knex: Knex) {
	await knex('casos').del();
	await knex('casos').insert([
		{
			titulo: 'Caso 1',
			descricao: 'Descrição do caso 1',
			status: 'aberto',
			agente_id: 1,
		},
		{
			titulo: 'Caso 2',
			descricao: 'Descrição do caso 2',
			status: 'solucionado',
			agente_id: 2,
		},
		{
			titulo: 'Caso 3',
			descricao: 'Descrição do caso 3',
			status: 'aberto',
			agente_id: 3,
		},
	]);
}

export { seed };
