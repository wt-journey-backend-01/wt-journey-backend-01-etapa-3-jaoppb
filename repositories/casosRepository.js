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
var casosRepository_exports = {};
__export(casosRepository_exports, {
  default: () => casosRepository_default
});
module.exports = __toCommonJS(casosRepository_exports);
var import_notFound = require("../errors/notFound");
var import_knex = require("knex");
async function findAll(filters) {
  const query = (0, import_knex.knex)("cases");
  let builder;
  if (filters?.status) {
    builder = (builder ?? query).where("status", filters.status);
  }
  if (filters?.agente_id) {
    builder = (builder ?? query).where("agente_id", filters.agente_id);
  }
  if (filters?.q) {
    const text = `%${filters.q.toLowerCase()}%`;
    builder = (builder ?? query).where(function() {
      this.whereRaw("LOWER(titulo) LIKE ?", [text]).orWhereRaw(
        "LOWER(descricao) LIKE ?",
        [text]
      );
    });
  }
  return await (builder ?? query).select();
}
async function findById(id) {
  return (0, import_knex.knex)("cases").where({ id }).first().then((foundCase) => {
    if (foundCase === void 0) throw new import_notFound.NotFoundError("Case", id);
    return foundCase;
  });
}
async function createCase(newCase) {
  return (0, import_knex.knex)("cases").insert(newCase).returning("*").then((rows) => rows[0]);
}
async function updateCase(id, updatedCase) {
  await (0, import_knex.knex)("cases").where({ id }).update(updatedCase).then((count) => {
    if (count === 0) throw new import_notFound.NotFoundError("Case", id);
  });
  return findById(id);
}
async function deleteCase(id) {
  return (0, import_knex.knex)("cases").where({ id }).delete().then((count) => {
    if (count === 0) throw new import_notFound.NotFoundError("Case", id);
  });
}
var casosRepository_default = {
  findAll,
  findById,
  createCase,
  updateCase,
  deleteCase
};
