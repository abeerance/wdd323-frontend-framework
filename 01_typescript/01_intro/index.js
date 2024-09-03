"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hello = hello;
const world = "World";
// Linke Seite der props ist sozusagen der Inhalt
// Die rechte Seite ist die Darstellung von dem Type
function hello({ who = world }) {
    return `Hello ${who}`;
}
