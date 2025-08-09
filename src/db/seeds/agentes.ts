import { Knex } from 'knex';

async function seed(knex: Knex) {
	await knex('agentes').del();
	await knex('agentes').insert([
		{
			nome: 'Agente 1',
			dataDeIncorporacao: new Date('2020-01-01'),
			cargo: 'Investigador',
		},
		{
			nome: 'Agente 2',
			dataDeIncorporacao: new Date('2020-02-01'),
			cargo: 'Analista',
		},
		{
			nome: 'Agente 3',
			dataDeIncorporacao: new Date('2020-03-01'),
			cargo: 'Gerente',
		},
	]);
}

export { seed };
