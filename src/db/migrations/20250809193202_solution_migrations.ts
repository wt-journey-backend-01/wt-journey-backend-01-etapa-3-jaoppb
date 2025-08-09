import { Knex } from 'knex';
import { CaseStatus } from '../../models/case';

export async function up(knex: Knex) {
	await knex.schema.createTable('agentes', (table) => {
		table.increments('id').primary();
		table.string('nome').notNullable();
		table.date('dataDeIncorporacao').notNullable();
		table.check('"dataDeIncorporacao" <= CURRENT_DATE');
		table.string('cargo').notNullable();
	});

	await knex.schema.createTable('casos', (table) => {
		table.increments('id').primary();
		table.string('titulo').notNullable();
		table.text('descricao').notNullable();
		table.enum('status', Object.values(CaseStatus)).notNullable();

		table.integer('agente_id').unsigned().notNullable();
		table
			.foreign('agente_id')
			.references('id')
			.inTable('agentes')
			.onDelete('CASCADE');
	});
}

export async function down(knex: Knex) {
	await knex.schema.dropTableIfExists('casos');
	await knex.schema.dropTableIfExists('agentes');
}
