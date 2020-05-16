/** 
 * Universidad de La Laguna
 * Facultad: Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Asignatura: Programación de Aplicaciones Interactivas
 * Curso: 3º
 * Práctica 8. Poker. Programación Orientada a Objetos en JavaScript.
 * @author David Hernández Suárez
 * Correo: alu0101048239@ull.edu.es
 * @since 07/04/2020
 * @description:  Contiene la implementación de la clase Hand, que hereda de GlobalHand y 
                  representa una mano de cartas. Incluye los métodos del padre para añadir y 
                  quitar cartas de la mano, y un nuevo método que mueve cartas de una mano a otra; 
                  este método podrá además mover cartas de una mano al mazo y del mazo a una mano.
                  
 * Referencias:   Enunciado de la práctica:
                  https://github.com/fsande/PAI-P08-Poker/blob/master/2019-2020_p08_Poker.md
                  Repositorio con el código:
                  https://github.com/ULL-ESIT-INF-PAI-2019-2020/practica-8-poker-alu0101048239
                  Cartas de la baraja francesa:
                  https://en.wikipedia.org/wiki/Standard_52-card_deck
                  Poker:
                  https://en.wikipedia.org/wiki/Poker
                  Desarrollo basado en pruebas (TDD):
                  https://en.wikipedia.org/wiki/Test-driven_development
                      
 *  Historial de revisiones:
                  07/04/2020 - Creación del código (primera versión)
                  14/04/2020 - Versión para evaluación
 */

'use strict';

/** Clase que representa una mano de cartas. Hereda de la clase Deck */
class Hand extends GlobalHand {

  /**
   * @desc Crea un objeto de tipo Mano.
   * @constructor
   * @param {string} label - Nombre identificador de la mano.
   */
  constructor(label) {
    super();
    this.label = label;
  }

  /**
   * @desc Obtiene la etiqueta de la mano.
   * @return {string} Etiqueta de la mano.
   */
  get handLabel() {
    return this.label;
  }

  /**
   * @desc Modifica la etiqueta de la mano.
   * @param {string} newLabel - Nueva etiqueta.
   */
  set handLabel(newLabel) {
    this.label = newLabel;
  }

  /**
   * @desc Añade cartas del mazo a la mano.
   * @param {object} hand - Mano o mazo del que sacamos las cartas.
   * @param {number} numberCards - Número de cartas que se añadirán.
   * @param {number} flag - Si es 1 las cartas se mueven hacia el
     parámetro. Si es 0 se mueven hacia el invocante.
   */
  moveCards(hand, numberCards, flag) {
    for (let index = 0; index < numberCards; index++) {
      if (flag === 1) {
        let lastCard = this.popCard();
        hand.addCard(lastCard);
      } else {
        let lastCard = hand.popCard();
        this.addCard(lastCard);
      }
    }
  }
}