"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var solution_migrations_exports = {};
__export(solution_migrations_exports, {
  down: () => down,
  up: () => up
});
module.exports = __toCommonJS(solution_migrations_exports);
var import_case = require("../../models/case");
async function up(knex) {
  await knex.schema.createTable("agentes", (table) => {
    table.increments("id").primary();
    table.string("nome").notNullable();
    table.date("dataDeIncorporacao").notNullable();
    table.check('"dataDeIncorporacao" <= CURRENT_DATE');
    table.string("cargo").notNullable();
  });
  await knex.schema.createTable("casos", (table) => {
    table.increments("id").primary();
    table.string("titulo").notNullable();
    table.text("descricao").notNullable();
    table.enum("status", Object.values(import_case.CaseStatus)).notNullable();
    table.integer("agente_id").unsigned().notNullable();
    table.foreign("agente_id").references("id").inTable("agentes").onDelete("CASCADE");
  });
}
async function down(knex) {
  await knex.schema.dropTableIfExists("casos");
  await knex.schema.dropTableIfExists("agentes");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  down,
  up
});
