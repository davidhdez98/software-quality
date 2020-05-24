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
 * @description:  Contiene la implementación de la clase GlobalHand, una clase genérica a partir
                  de la cual se implementarán otras clases. Desarrollaremos dos clases hijas de 
                  GlobalHand, Hand y Deck. En esta clase se crea un mazo de cartas vacío, y se 
                  implementan métodos para añadir y quitar cartas, y ordenar el mazo.
                  
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

/** Clase que representa un conjunto de cartas */
class GlobalHand {
  /**
   * @desc Crea un objeto de tipo GlobalHand.
   * @constructor
   * @param {object} cards - Array de cartas.
   */
  constructor() {
    this.cards = [];
  }

  /**
   * @desc Obtiene el mazo de cartas.
   * @return {object} Array de cartas.
   */
  get arrayCards() {
    return this.cards;
  }

  /**
   * @desc Modifica el mazo de cartas.
   * @param {object} cards - Array de cartas.
   */
  set arrayCards(cards) {
    this.cards = cards;
  }

  /**
   * @desc Elimina una carta del mazo (la última).
   */
  popCard() {
    let lastCard = this.cards[this.cards.length - 1];
    this.cards.pop();
    return lastCard;
  }

  /**
   * @desc Añade una carta determinada al mazo.
   * @param {object} card - Carta que se añadirá.
   */
  addCard(newCard) {
    this.cards.push(newCard);
  }

  /**
   * @desc Ordena el mazo de cartas de menor a mayor.
   * @return {object} Array de cartas.
   */
  sort() {
    let x, y;
    for (let index = 0; index < this.cards.length; index++) {
      for (let index2 = index + 1; index2 < this.cards.length; index2++) {
        if (this.cards[index].compareCards(this.cards[index2]) === this.cards[index]) {
          y = this.cards[index2];
          this.cards[index2] = this.cards[index];
          this.cards[index] = y;
        }
      }
    }
  }

  /**
   * @desc Método no utilizado nunca, creado para comprobar el 
   * resultado obtenido en el análisis de SonarCloud.
   */
  unusedMethod() {
    this.cards.push(newCard);
  }
}