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
 * @description:  Contiene el desarrollo de la clase Line, que representa una línea representada por la
                  ecuación 'y = mx + n'. 
                  
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

/** Clase que representa una línea recta, de acuerdo a su ecuación
 * 'y = mx + n', donde 'm' es la pendiente de la recta y 'n' el valor
 * de la ordenada. */
class Line {

  /**
   * @desc Crea un objeto Line.
   * @constructor
   * @param {number} slope - Pendiente de la recta.
   * @param {number} intercept - Ordenada en el origen.
   */
  constructor(slope = 0, intercept = 0) {
    this.slope = slope;
    this.intercept = intercept;
  }

  /**
   * @desc Obtiene la pendiente de la recta.
   * @return {number} Pendiente de la recta.
   */
  get lineSlope() {
    return this.slope;
  }

  /**
   * @desc Obtiene la ordenada de la recta.
   * @return {number} Ordenada de la recta.
   */
  get lineIntercept() {
    return this.intercept;
  }

  /**
   * @desc Establece la pendiente de la recta.
   * @param {number} slope - Pendiente de la recta.
   */
  set lineSlope(slope) {
    this.slope = slope;
  }

  /**
   * @desc Establece la ordenada de la recta.
   * @param {number} intercept - Ordenada de la recta.
   */
  set lineIntercept(intercept) {
    this.intercept = intercept;
  }

  /** 
   * Devuelve la recta por la que pasan dos puntos.
   * @param {Point} firstPoint - Primer punto.
   * @param {Point} secondPoint - Segundo punto.
   * @return {Line} Recta por la que pasan los dos puntos.
   */
  lineFromTo(firstPoint, secondPoint) {
    let slope = ((firstPoint.yCoor - secondPoint.yCoor) / 
      (firstPoint.xCoor - secondPoint.xCoor));
    let intercept = ((firstPoint.yCoor) - (slope * firstPoint.xCoor));
    return new Line (slope, intercept);
  }

  /** 
   * Devuelve true si el punto dado pertenece a la recta, y 
   * false en caso contrario.
   * @param {Point} point - Punto determinado.
   * @return {boolean} True si el punto pertenece a la recta,
   */
  isPointInLine(point) {
    return (point.yCoor === (this.slope * point.xCoor) + this.intercept);
  }
}
exports.Line = Line;