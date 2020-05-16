const debug = process.env["DEBUG"];
const { inspect } = require('util');
const ins = (x) => { if (debug) console.log(inspect(x, {depth: null})) };
const buildLexer =require('../index');


const SPACE = /(?<SPACE>\s+|\/\/.*)/;
const RESERVEDWORD = /(?<RESERVEDWORD>\b(const|let)\b)/;
//const ID = /(?<ID>\b([a-z_]\w*))\b/;
const ID = /(?<ID>[\p{L}_][\p{L}\p{N}_]*)/;
const STRING = /(?<STRING>"([^\\"]|\\.")*")/;
const OP = /(?<OP>[+*\/=-])/;
const NUM = /(?<NUM>\p{N}+(\.\p{N}*)?([eE][+-]?\p{N}+)?)/;

let myTokens = [
  ['SPACE', SPACE], ['RESERVEDWORD', RESERVEDWORD], ['ID', ID],
  ['STRING', STRING], ['OP', OP], ['NUM', NUM]
];

let str, lexer, r;
lexer = buildLexer(myTokens);

str = 'const varName = "value"';
ins(str);
r = lexer(str);
ins(r);
let expected = [
  { type: 'RESERVEDWORD', value: 'const' },
  { type: 'ID', value: 'varName' },
  { type: 'OP', value: '=' },
  { type: 'STRING', value: '"value"' }
];

test(str, () => {
  expect(r).toEqual(expected);
});


str = 'let x = a + \nb';
ins(str);
r = lexer(str);
expected = [
  { type: 'RESERVEDWORD', value: 'let' },
  { type: 'ID', value: 'x' },
  { type: 'OP', value: '=' },
  { type: 'ID', value: 'a' },
  { type: 'OP', value: '+' },
  { type: 'ID', value: 'b' }
];
ins(r);
test(str, () => {
  expect(r).toEqual(expected);
});

str = 'let x = 42*c';
ins(str);
r = lexer(str);
ins(r);
console.log(r);

expected = [ 
  { type: 'RESERVEDWORD', value: 'let' },
  { type: 'ID', value: 'x' },
  { type: 'OP', value: '=' },
  { type: 'NUM', value: '42' },
  { type: 'OP', value: '*' },
  { type: 'ID', value: 'c' } 
];

test(str, () => {
  expect(r).toEqual(expected);
});

let ERROR = /(?<ERROR>"([^\\"]|\\.")*")/;

myTokens = [
  ['SPACE', SPACE], ['RESERVEDWORD', RESERVEDWORD], ['ID', ID],
  ['ERROR', ERROR], ['OP', OP]
];

test(str, () => {
  expect(() => buildLexer(myTokens)).toThrowError('Error: ERROR es una palabra reservada');
});

/* Unicode */

/* Caracteres unicode en el identificador */
str = 'let αβ = "hola"';
ins(str);
r = lexer(str);
ins(r);
expected = [
  { type: 'RESERVEDWORD', value: 'let' },
  { type: 'ID', value: 'αβ' },
  { type: 'OP', value: '=' },
  { type: 'STRING', value: '"hola"' }
];

test(str, () => {
  expect(r).toEqual(expected);
});

/* Caracteres unicode como números */

str = 'let variable = ६.६';
ins(str);
r = lexer(str);
ins(r);
expected = [
  { type: 'RESERVEDWORD', value: 'let' },
  { type: 'ID', value: 'variable' },
  { type: 'OP', value: '=' },
  { type: 'NUM', value: '६.६' }
];

test(str, () => {
  expect(r).toEqual(expected);
});

/* Ejemplo con error por operador & */

str = 'let operacion = &7';
ins(str);
r = lexer(str);
ins(r);
expected = [
  { type: 'RESERVEDWORD', value: 'let' },
  { type: 'ID', value: 'operacion' },
  { type: 'OP', value: '=' },
  { type: 'ERROR', value: '&7' }
];

test(str, () => {
  expect(r).toEqual(expected);
});