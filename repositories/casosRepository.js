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
var casosRepository_exports = {};
__export(casosRepository_exports, {
  default: () => casosRepository_default
});
module.exports = __toCommonJS(casosRepository_exports);
var import_notFound = require("../errors/notFound");
var import_db = __toESM(require("../db/db"));
async function findAll(filters) {
  const query = (0, import_db.default)("casos");
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
  const result = await (0, import_db.default)("casos").where({ id }).first();
  if (!result) {
    throw new import_notFound.NotFoundError("Case", id);
  }
  return result;
}
async function createCase(newCase) {
  const agenteExists = await (0, import_db.default)("agentes").where({ id: newCase.agente_id }).first();
  if (!agenteExists) {
    throw new import_notFound.NotFoundError("Agent", newCase.agente_id);
  }
  return (await (0, import_db.default)("casos").insert(newCase).returning("*"))[0];
}
async function updateCase(id, updatedCase) {
  if (updatedCase.agente_id) {
    const agenteExists = await (0, import_db.default)("agentes").where({ id: updatedCase.agente_id }).first();
    if (!agenteExists) {
      throw new import_notFound.NotFoundError("Agent", updatedCase.agente_id);
    }
  }
  const result = await (0, import_db.default)("casos").where({ id }).update(updatedCase);
  if (result === 0) {
    throw new import_notFound.NotFoundError("Case", id);
  }
  return findById(id);
}
async function deleteCase(id) {
  const result = await (0, import_db.default)("casos").where({ id }).delete();
  if (result === 0) {
    throw new import_notFound.NotFoundError("Case", id);
  }
}
var casosRepository_default = {
  findAll,
  findById,
  createCase,
  updateCase,
  deleteCase
};
