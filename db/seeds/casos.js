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
var casos_exports = {};
__export(casos_exports, {
  seed: () => seed
});
module.exports = __toCommonJS(casos_exports);
async function seed(knex) {
  await knex("casos").del();
  await knex("casos").insert([
    {
      titulo: "Caso 1",
      descricao: "Descri\xE7\xE3o do caso 1",
      status: "aberto",
      agente_id: 1
    },
    {
      titulo: "Caso 2",
      descricao: "Descri\xE7\xE3o do caso 2",
      status: "solucionado",
      agente_id: 2
    },
    {
      titulo: "Caso 3",
      descricao: "Descri\xE7\xE3o do caso 3",
      status: "aberto",
      agente_id: 3
    }
  ]);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  seed
});
