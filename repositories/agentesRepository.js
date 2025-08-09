"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var agentesRepository_exports = {};
__export(agentesRepository_exports, {
  default: () => agentesRepository_default
});
module.exports = __toCommonJS(agentesRepository_exports);
var import_db = __toESM(require("../db/db"));
var import_futureDate = require("../errors/futureDate");
var import_notFound = require("../errors/notFound");
async function findAll(filters) {
  const query = (0, import_db.default)("agentes");
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
  const result = await (0, import_db.default)("agentes").where({ id }).first();
  if (!result) {
    throw new import_notFound.NotFoundError("Agent", id);
  }
  return result;
}
async function createAgent(newAgent) {
  const date = new Date(newAgent.dataDeIncorporacao);
  if (date.getTime() > Date.now()) {
    throw new import_futureDate.FutureDateError(date);
  }
  const result = await (0, import_db.default)("agentes").insert(newAgent).returning("*");
  if (result.length === 0) {
    throw new Error("Failed to create agent");
  }
  return result[0];
}
async function updateAgent(id, updatedAgent) {
  const result = await (0, import_db.default)("agentes").where({ id }).update(updatedAgent);
  if (result === 0) {
    throw new import_notFound.NotFoundError("Agent", id);
  }
  return findById(id);
}
async function deleteAgent(id) {
  const result = await (0, import_db.default)("agentes").where({ id }).del();
  if (result === 0) {
    throw new import_notFound.NotFoundError("Agent", id);
  }
}
var agentesRepository_default = {
  findAll,
  findById,
  createAgent,
  updateAgent,
  deleteAgent
};
