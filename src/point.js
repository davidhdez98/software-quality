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
 * @description:  Contiene el desarrollo de la clase Point, que representa un punto. Un objeto de esta
                  clase tendrá como propiedades principales una coordenada 'x' y una coordenada 'y'.
                  Utilizaremos esta clase posteriormente en el desarrollo de la clase Line para 
                  especificar los dos puntos sobre los que se traza una línea en un Canvas.
                  
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

/** Clase que representa un punto, dadas las coordenadas 'x' e 'y' que
 * lo forman. Contiene métodos para dibujar dicho punto en un Canvas.
 */
class Point {

  /**
   * @description Crea un objeto Point.
   * @param {number} coorX - Coordenada x del punto.
   * @param {number} coorY - Coordenada y del punto.
   */
  constructor(coorX, coorY) {
    this.coorX = coorX;
    this.coorY = coorY;
  }

  /**
   * @desc Obtiene la coordenada X del punto.
   * @return {number} Coordenada X del punto.
   */
  get xCoor() {
    return this.coorX;
  }

  /**
   * @desc Obtiene la coordenada Y del punto.
   * @return {number} Coordenada Y del punto.
   */
  get yCoor() {
    return this.coorY;
  }

  /**
   * @desc Establece la coordenada X del punto.
   * @param {number} coorX - Coordenada X del punto.
   */
  set xCoor(coorX) {
    this.coorX = coorX;
  }

  /**
   * @desc Establece la coordenada Y del punto.
   * @param {number} coorY - Coordenada Y del punto.
   */
  set yCoor(coorY) {
    this.coorY = coorY;
  }

  /* istanbul ignore next */
  /**
   * @desc Dibuja un punto en un Canvas.
   * @param {object} CONTEXT - Context del Canvas.
   * @param {number} size - Tamaño del punto.
   * @param {string} color - Color del punto.
   */
  drawPoint(CONTEXT, size, color) {
    CONTEXT.beginPath();
    CONTEXT.arc(this.coorX, this.coorY, size, 0, 2 * Math.PI);
    CONTEXT.strokeStyle = color;
    CONTEXT.stroke();
  }

  /**
  * @desc Genera números aleatorios dentro de un rango determinado. 
  * Se utilizará para generar puntos de colores aleatorios.
  * @param {number} lowRank - Extremo inferior del rango.
  * @param {number} upRank - Extremo superior del rango.
  */
  random(lowRank, upRank) {
    let posibilities = upRank - lowRank;
    let randomColor = Math.random() * posibilities;
    randomColor = Math.floor(randomColor);
    return parseInt(lowRank) + randomColor;
  }
}
exports.Point = Point;