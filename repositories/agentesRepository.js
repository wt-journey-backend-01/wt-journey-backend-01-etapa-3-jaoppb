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
var agentesRepository_exports = {};
__export(agentesRepository_exports, {
  default: () => agentesRepository_default
});
module.exports = __toCommonJS(agentesRepository_exports);
var import_knex = require("knex");
var import_futureDate = require("../errors/futureDate");
var import_notFound = require("../errors/notFound");
async function findAll(filters) {
  const query = (0, import_knex.knex)("agentes");
  let builder;
  if (filters?.cargo) {
    builder = (builder ?? query).where("cargo", filters.cargo);
  }
  if (filters?.sort) {
    const column = "dataDeIncorporacao";
    const direction = filters.sort.startsWith("-") ? "desc" : "asc";
    builder = (builder ?? query).orderBy(column, direction);
  }
  return (builder ?? query).select("*");
}
async function findById(id) {
  return (0, import_knex.knex)("agentes").where({ id }).first().then((foundAgent) => {
    if (foundAgent === void 0) throw new import_notFound.NotFoundError("Agent", id);
    return foundAgent;
  });
}
async function createAgent(newAgent) {
  const date = new Date(newAgent.dataDeIncorporacao);
  if (date.getTime() > Date.now()) {
    throw new import_futureDate.FutureDateError(date);
  }
  return (0, import_knex.knex)("agentes").insert(newAgent).returning("*").then((createdAgents) => {
    if (createdAgents.length === 0)
      throw new Error("Agent not created");
    return createdAgents[0];
  });
}
async function updateAgent(id, updatedAgent) {
  await (0, import_knex.knex)("agentes").where({ id }).update(updatedAgent).then((updatedCount) => {
    if (updatedCount === 0) throw new import_notFound.NotFoundError("Agent", id);
  });
  return findById(id);
}
async function deleteAgent(id) {
  await (0, import_knex.knex)("agentes").where({ id }).del().then((deletedCount) => {
    if (deletedCount === 0) throw new import_notFound.NotFoundError("Agent", id);
  });
}
var agentesRepository_default = {
  findAll,
  findById,
  createAgent,
  updateAgent,
  deleteAgent
};
