/** 
 * Universidad de La Laguna
 * Facultad: Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Asignatura: Procesadores de lenguajes
 * Curso: 3º
 * Práctica 10. Lexer generator.
 * @author David Hernández Suárez
 * Correo: alu0101048239@ull.edu.es
 * @since 28/03/2020
 * @description:  Contiene la implementación de una función que recibe la especificación de un lenguaje
                  (los lexemas que lo componen), mediante un array de expresiones regulares. El programa
                  devuelve una función que es el analizador léxico.
                  
 */

'use strict';
/**
  * @desc Recibe el array de expresiones regulares y devuelve la función
    que realiza el análisis léxico. 
  * @param {object} tokens - Léxico del lenguaje.
  * @return {function} Función analizador léxico.
  */
module.exports = (tokens) => {
  
  /* Recorre todos los nombres de expresiones regulares y se asegura
    de que no se introduzca el nombre ERROR */
  const tokenNames = tokens.map(t => {
    if (t[0] != 'ERROR') {
      return t[0];
    } else {
      throw 'Error: ERROR es una palabra reservada';
    }
  });
  const tokenRegs  = tokens.map(t => t[1]);

  /* Concatena todas las expresiones regulares en una sola */
  const buildOrRegexp = (regexps) => {
    const sources = regexps.map(r => r.source);
    const union = sources.join('|');
    // console.log(union);
    return new RegExp(union, 'uy');    
  };


  const regexp = buildOrRegexp(tokenRegs);
  const getToken = (m) => tokenNames.find(tn => typeof m[tn] !== 'undefined');
  
  /* Función que realiza el análisis léxico */
  return (str) => {
    let match;
    let result = [];
    let matchLength = 0; /* Iterador para avanzar en el string (lastIndex) */
    while (match = regexp.exec(str)) {
      let t = getToken(match.groups);
      matchLength += match.groups[t].length;
      if ((t != 'SPACE') && (t != 'COMMENT')) { /* Obvia espacios y comentarios */
        let object = {
          type: t,
          value: match.groups[t]
        };
        result.push(object);
      }
    }
    if (matchLength !== str.length) {
      let object = {
        type: 'ERROR',
        value: str.slice(matchLength, str.length)
      };
      result.push(object);
    }
    return result;
  }
};