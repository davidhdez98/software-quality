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
 * @description:  Contiene el desarrollo de la clase Text, que representa un texto escrito en un  
                  Canvas. Contiene métodos para crear crear el texto, así como para rellenarlo de 
                  un color especificado o simplemente escribir un texto sin relleno. Se pueden 
                  especificar tanto el color como la fuente y el tamaño del texto.
                  
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

/** Clase que permite la creación de un texto en un Canvas. Se crea y 
 * dibuja en un Canvas un texto con el contenido especificado, así como
 * con el tamaño, fuente y color especificados.
 */
class Text {
  /**
   * @desc Crea un objeto de tipo Text.
   * @constructor
   * @param {number} coorX - Coordenada X de destino.
   * @param {number} coorY - Coordenada Y de destino.
   * @param {string} font - Fuente y tamaño de letra.
   * @param {string} content - Texto.
   */
  constructor(coorX, coorY, font, content) {
    this.coorX = coorX;
    this.coorY = coorY;
    this.font = font;
    this.content = content;    
  }

  /**
   * @desc Obtiene la coordenada 'X' de destino.
   * @return {number} Coordenada 'X'.
   */
  get textCoorX() {
    return this.coorX;
  }

  /**
   * @desc Obtiene la coordenada 'Y' de destino.
   * @return {number} Coordenada 'Y'.
   */
  get textCoorY() {
    return this.coorY;
  }

  /**
   * @desc Obtiene la fuente y tamaño del texto.
   * @return {string} Fuente y tamaño del texto.
   */
  get textFont() {
    return this.font;
  }

  /**
   * @desc Obtiene el contenido del texto.
   * @return {string} Contenido del texto.
   */
  get textContent() {
    return this.content;
  }

  /**
   * @desc Establece la coordenada 'X' de destino.
   * @param {number} coorX - Coordenada 'X'.
   */
  set textCoorX(coorX) {
    this.coorX = coorX;
  }

  /**
   * @desc Establece la coordenada 'Y' de destino.
   * @param {number} coorY - Coordenada 'Y'.
   */
  set textCoorY(coorY) {
    this.coorY = coorY;
  }

  /**
   * @desc Establece la fuente y tamaño del texto.
   * @param {string} font - Fuente y tamaño del texto.
   */
  set textFont(font) {
    this.font = font;
  }

  /**
   * @desc Establece el contenido del texto.
   * @param {string} content - Contenido del texto.
   */
  set textContent(content) {
    this.content = content;
  }
  
  /* istanbul ignore next */
  /**
   * @desc Crea el texto.
   * @param {object} CONTEXT - Context del Canvas.
   */
  createText(CONTEXT) {
    CONTEXT.beginPath(); 
    CONTEXT.font = this.font;
  }

  /* istanbul ignore next */
  /**
   * @desc Rellena el texto.
   * @param {object} CONTEXT - Context del Canvas.
   * @param {string} color - Color del texto.
   */
  fill(CONTEXT, color) {
    CONTEXT.fillStyle = color;
    CONTEXT.fillText(this.content, this.coorX, this.coorY);
  }

  /* istanbul ignore next */
  /**
   * @desc Dibuja el contorno del texto.
   * @param {object} CONTEXT - Context del Canvas.
   * @param {string} color - Color del texto.
   */
  stroke(CONTEXT, color) {
    CONTEXT.strokeStyle = color;
    CONTEXT.strokeText(this.content, this.coorX, this.coorY);
  }
}