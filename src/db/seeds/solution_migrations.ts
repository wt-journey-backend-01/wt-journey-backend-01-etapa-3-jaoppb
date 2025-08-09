import { Knex } from "knex";

async function seed(knex: Knex) {
	await knex("agentes").del();
	await knex("agentes").insert([
		{
			id: 1,
			nome: "Agente 1",
			dataDeIncorporacao: new Date("2020-01-01"),
			cargo: "Investigador",
		},
		{
			id: 2,
			nome: "Agente 2",
			dataDeIncorporacao: new Date("2020-02-01"),
			cargo: "Analista",
		},
		{
			id: 3,
			nome: "Agente 3",
			dataDeIncorporacao: new Date("2020-03-01"),
			cargo: "Gerente",
		},
	]);

	await knex("casos").del();
	await knex("casos").insert([
		{
			id: 1,
			titulo: "Caso 1",
			descricao: "Descrição do caso 1",
			status: "aberto",
			agenteId: 1,
		},
		{
			id: 2,
			titulo: "Caso 2",
			descricao: "Descrição do caso 2",
			status: "solucionado",
			agenteId: 2,
		},
		{
			id: 3,
			titulo: "Caso 3",
			descricao: "Descrição do caso 3",
			status: "aberto",
			agenteId: 3,
		},
	]);
}

export { seed };
