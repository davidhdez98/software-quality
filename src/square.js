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
 * @description:  Contiene el desarrollo de la clase Square, que representa una casilla de un 
                  tablero de ajedrez.

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

/** Clase que representa una casilla de un tablero de ajedrez.
 */
class Square {

  /**
   * @description Crea un objeto Square.
   * @param {number} size - Dimensiones de la casilla. Al ser la casilla
   * @param {string} label - Nombre de la pieza de ajedrez.
   * @param {Point} start - Coordenadas del punto inicial de la casilla.
   * cuadrada, solo necesita el valor de uno de sus lados.
   */
  constructor(size, start) {
    this.size = size;
    this.coorX = start.xCoor;
    this.coorY = start.yCoor;
    this.label = '';
  }

  /**
   * @desc Obtiene el tamaño de la casilla.
   * @return {number} Tamaño de la casilla.
   */
  get squareSize() {
    return this.size;
  }

  /**
   * @desc Obtiene la coordenada 'X' de la casilla.
   * @return {number} Coordenada 'X' de la casilla.
   */
  get squareXCoor() {
    return this.coorX;
  }

  /**
   * @desc Obtiene la coordenada 'Y' de la casilla.
   * @return {number} Coordenada 'Y' de la casilla.
   */
  get squareYCoor() {
    return this.coorY;
  }

  /**
   * @desc Obtiene la etiqueta de la casilla (nombre de la pieza 
   * de ajedrez).
   * @return {string} Nombre de la pieza de ajedrez.
   */
  get squareLabel() {
    return this.label;
  }

  /**
   * @desc Establece el tamaño de la casilla.
   * @param {number} size - Tamaño de la casilla.
   */
  set squareSize(size) {
    this.size = size;
  }

  /**
   * @desc Establece la coordenada 'X' de la casilla.
   * @param {number} coorX - Coordenada 'X' de la casilla.
   */
  set squareXCoor(coorX) {
    this.coorX = coorX;
  }

  /**
   * @desc Establece la coordenada 'Y' de la casilla.
   * @param {number} coorY - Coordenada 'Y' de la casilla.
   */
  set squareYCoor(coorY) {
    this.coorY = coorY;
  }

  /**
   * @desc Establece la etiqueta de la casilla (nombre de la pieza 
   * de ajedrez).
   * @param {string} label - Nombre de la pieza de ajedrez.
   */
  set squareLabel(label) {
    this.label = label;
  }

  /* istanbul ignore next */
  /**
   * @desc Pinta una casilla en un Canvas.
   * @param {object} CONTEXT - Context del Canvas.
   * @param {Point} start - Punto donde empieza la casilla a dibujarse
   * @param {string} color - Color de la casilla.
   * (se corresponde con la esquina superior izquierda de la casilla).
   */
  createSquare(CONTEXT, start, color) {
    CONTEXT.beginPath();
    CONTEXT.fillStyle = color;
    CONTEXT.strokeStyle = "black";
    CONTEXT.rect(start.xCoor, start.yCoor, this.size, this.size);
    CONTEXT.stroke();
    CONTEXT.fill();
  }

  /* istanbul ignore next */
  /**
   * @desc Dibuja en el Canvas la imagen de la pieza de ajedrez.
   * @param {object} CONTEXT - Context del Canvas.
   * @param {string} source - Ruta de la imagen de la pieza.
   * @param {number} coorX - Coordenada 'X' donde se dibuja la pieza.
   * @param {number} coorY - Coordenada 'Y' donde se dibuja la pieza.
   */
  drawPiece(CONTEXT, source, coorX, coorY) {
    let image = new Image();
    image.onload = function () {
      CONTEXT.drawImage(image, coorX, coorY, 55, 55);
    }
    image.src = source;
  }
}
exports.Square = Square;