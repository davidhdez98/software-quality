/** 
 * Universidad de La Laguna
 * Facultad: Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Asignatura: Programación de Aplicaciones Interactivas
 * Curso: 3º
 * Práctica 11. Ajedrez. Programación Gráfica y Orientada a Objetos en JS.
 * @author David Hernández Suárez
 * Correo: alu0101048239@ull.edu.es
 * @since 30/04/2020
 * @description:  Contiene la implementación de la clase EightQueens, que representa la resolución
                  del problema de las 8 reinas;  el problema se basa en colocar 8 reinas en un tablero 
                  de ajedrez de 8x8 de manera que ninguna de ellas amenace ni sea amenazada por otras 
                  reinas. Añadimos una nueva restricción: no puede haber reinas alineadas en una misma línea.

 * Referencias:   Enunciado de la práctica:
                  https://github.com/fsande/PAI-P11-Chess/blob/master/2019-2020_p10_Chess.md
                  Repositorio con el código:
                  https://github.com/ULL-ESIT-INF-PAI-2019-2020/pai-p11-chess-alu0101048239
                  Patrón arquitectónico MVC: 
                  https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller
                  Interfaz gráfica de ejemplo:
                  https://lichess.org/MgfoDUSW/black
                  Notación algebraica:
                  https://en.wikipedia.org/wiki/Algebraic_notation_(chess)
                  Test Driven Development (TDD):
                  https://en.wikipedia.org/wiki/Test-driven_development
                                        
 *  Historial de revisiones:
                  30/04/2020 - Creación del código (primera versión)
                  05/04/2020 - Versión para evaluación
 */   

'use strict';

const Point = require('./point.js').Point;
const Line = require('./line.js').Line;

/** Clase que representa un tablero de ajedrez sobre el que se
 * resuelve el problema de las 8 reinas.
 */
class EightQueens {
  
  /**
   * @description Crea un objeto EightQueens. Crea un vector de 
   * reinas, que inicialmente incluye puntos inicializados a -1.
   * @param {number} size - Número de reinas.
   * @param {boolean} problem - Versión del problema; si es true, 
   * se realiza la versión generalizada el problema.
   */
  constructor(size, problem) {
    this.size = size;
    this.queens = [];
    this.problem = problem;
    this.arraySolutions = [];
    for (let queen = 0; queen < size; queen++) {
      this.queens[queen] = new Point(-1, -1);
    }
  }

  /**
   * @desc Obtiene el número de reinas (tamaño del problema).
   * @return {number} Número de reinas.
   */
  get problemSize() {
    return this.size;
  }

  /**
   * @desc Obtiene el tipo de problema (generalizado o no).
   * @return {boolean} True si es generalizado.
   */
  get problemType() {
    return this.problem;
  }

  /**
   * @desc Obtiene el array de reinas.
   * @return {object} Conjunto de reinas.
   */
  get arrayQueens() {
    return this.queens;
  }

   /**
   * @desc Establece el tamaño del problema (número de reinas).
   * @param {number} size - Número de reinas.
   */
  set problemSize(size) {
    this.size = size;
  }

  /**
   * @desc Obtiene el tipo de problema (generalizado o no).
   * @param {boolean} problem - True si es generalizado.
   */
  set problemType(problem) {
    this.problem = problem;
  }

  /**
   * @desc Establece el array de reinas.
   * @param {object} queens - Conjunto de reinas.
   */
  set arrayQueens(queens) {
    this.queens = queens;
  }

  /** 
   * Introduce las reinas en el tablero.
   * @param {number} fila - La fila donde queremos introducir la reina.
   * @param {Object} reinas - Array donde almacenamos las posiciones de las reinas.
   * @param {number} numeroReinas - El número de reinas que hay.
   */
  colocarReina(fila) {
    if (fila < this.size) { /* Comprueba que queden reinas por colocar */
      for (this.queens[fila].yCoor = 0; this.queens[fila].yCoor < this.size; this.queens[fila].yCoor++) {
        if (this.comprobarReina(fila)) {  /* Comprueba si es válida la posición de la reina */
          this.queens[fila].xCoor = fila;
          this.colocarReina (fila + 1);
        }
      } 
    } else {
      let aux = this.visualizarTablero();
      if (aux.length > 0) {
        this.arraySolutions.push(aux);
      }
    }
  }

  /** 
   * Comprueba si se puede introducir una reina en una posición.
   * @param {number} fila - La fila donde queremos introducir la reina.
   * @param {Object} reinas - Array donde almacenamos las posiciones de las reinas.
   * @return {boolean} - La reina se puede introducir.
   */
  comprobarReina(fila) {
    for (let iterador = 0; iterador < fila; iterador++) {
      if ((this.queens[iterador].yCoor === this.queens[fila].yCoor) || /* Comprueba la columna */
        (Math.abs(fila - iterador) === Math.abs(this.queens[fila].yCoor - 
        this.queens[iterador].yCoor))) { /* Comprueba la diagonal */
        return false;
      }
    }
    return true;
  }

  /** 
   * Visualiza el tablero con las 8 reinas incluidas.
   * @param {Object} reinas - Array donde almacenamos las posiciones de las reinas.
   * @param {number} numeroReinas - El número de reinas que hay.
   */
  visualizarTablero() {
    let solution = [];
    let comprobar = false;
    if (this.problemType === true) {
      for (let index = 0; index < this.size; index++) {
        for (let iterador = index + 1; iterador < this.size; iterador++) {
          for (let iteradorB = 0; iteradorB < this.size; iteradorB++) {
            if ((iteradorB !== index) && (iteradorB !== iterador)) {
              let line = new Line();
              line = line.lineFromTo(this.queens[index], this.queens[iterador]);
              if (line.isPointInLine(this.queens[iteradorB])) {
                comprobar = true;
              }
            }
          }
        }
      }
    }
    if (!comprobar) {
      for (let indiceFilas = 0; indiceFilas <= this.size - 1; indiceFilas++) {
        let cadena = '';
        for (let indiceReinas = 0; indiceReinas < this.size; indiceReinas++) {
          if ((this.queens[indiceFilas].xCoor === indiceFilas) && 
            (this.queens[indiceFilas].yCoor === indiceReinas)) {    
              cadena += "#";                 
            } else {
              cadena += "-";
            } 
        }
        let aux = 8 - (this.queens[indiceFilas].yCoor + 1);
        let enteroToString = aux.toString();
        //let enteroToString = this.queens[indiceFilas].yCoor.toString(); /* Convierte el entero a string */
        let variableAscii = String.fromCharCode(enteroToString.charCodeAt(0) + 49); /* Notación algebraica */
        let globalResult = `${cadena}${variableAscii} ${indiceFilas + 1}`;          
        solution.push(globalResult);
      }
    }
    return solution;
  }
}
exports.EightQueens = EightQueens;