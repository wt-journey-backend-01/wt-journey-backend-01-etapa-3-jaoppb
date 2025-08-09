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
var agentes_exports = {};
__export(agentes_exports, {
  seed: () => seed
});
module.exports = __toCommonJS(agentes_exports);
async function seed(knex) {
  await knex("agentes").del();
  await knex("agentes").insert([
    {
      nome: "Agente 1",
      dataDeIncorporacao: /* @__PURE__ */ new Date("2020-01-01"),
      cargo: "Investigador"
    },
    {
      nome: "Agente 2",
      dataDeIncorporacao: /* @__PURE__ */ new Date("2020-02-01"),
      cargo: "Analista"
    },
    {
      nome: "Agente 3",
      dataDeIncorporacao: /* @__PURE__ */ new Date("2020-03-01"),
      cargo: "Gerente"
    }
  ]);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  seed
});
