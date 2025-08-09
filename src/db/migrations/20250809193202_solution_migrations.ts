import { Knex } from 'knex';

export enum CaseStatus {
	OPEN = 'aberto',
	CLOSED = 'solucionado',
}

export async function up(knex: Knex) {
	await knex.schema.createTable('agentes', (table) => {
		table.increments('id').primary();
		table.string('nome').notNullable();
		table.date('dataDeIncorporacao').notNullable();
		table.string('cargo').notNullable();
	});

	await knex.schema.createTable('casos', (table) => {
		table.increments('id').primary();
		table.string('titulo').notNullable();
		table.text('descricao').notNullable();
		table.enum('status', Object.values(CaseStatus)).notNullable();

		table.integer('agenteId').unsigned().notNullable();
		table
			.foreign('agenteId')
			.references('id')
			.inTable('agentes')
			.onDelete('CASCADE');
	});
}

export async function down(knex: Knex) {
	await knex.schema.dropTableIfExists('casos');
	await knex.schema.dropTableIfExists('agentes');
}
