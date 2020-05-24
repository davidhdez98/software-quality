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
 * @description:  Contiene el desarrollo de una serie de funciones que, accediendo a los métodos
                  de las clases Square, ChessBoard y EightQueens, pinta en un Canvas un tablero de 
                  ajedrez, en el que se podrán mostrar las distintas soluciones del problema de las
                  8 reinas. Asimismo, se mostrará un tablero con las disposiciones iniciales de las
                  piezas en el comienzo de una partida de ajedrez.

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

/** 
 * Pinta en el Canvas un tablero de ajedrez.
 */
function board() {
  const CANVAS = document.getElementById("canvas");
  const CONTEXT = CANVAS.getContext("2d");
  let board = new ChessBoard(8);
  board.createBoard(CONTEXT, CANVAS);  
}

/** 
 * Pinta en el Canvas un tablero con las posiciones iniciales de las 
 * piezas en una partida de ajedrez. 
 */
function initialBoard() {
  currentSolution = 0;
  const CANVAS = document.getElementById("canvas");
  const CONTEXT = CANVAS.getContext("2d");
  let board = new ChessBoard(8);
  board.createBoard(CONTEXT, CANVAS);
  board.newGame(CONTEXT);
  let x = false;
  if (x == true) {
    console.log("X = true");
  }
}

/**
 * Resuelve el problema de las 8 reinas y muetra el resultado en el tablero
 * del Canvas inicializado anteriormente. Asimismo, muetsra también el resultado
 * en notación algebraica.
 */
function eightQueens() {
  const CANVAS = document.getElementById("canvas");
  const CONTEXT = CANVAS.getContext("2d");
  const CANVAS2 = document.getElementById("visualizacion");
  const CONTEXT2 = CANVAS2.getContext("2d");
  var queens = new EightQueens(8);
  let problemType = document.getElementById("reinas").checked;
  queens.problemType = problemType;
  queens.colocarReina(0);
  let board = new ChessBoard(8);
  board.createBoard(CONTEXT, CANVAS);
  if (currentSolution === queens.arraySolutions.length) {
    currentSolution = 0;
  } else {
    board.solution8Queens(CONTEXT, queens.arraySolutions[currentSolution]);
    board.algebraicNotation(CONTEXT2, CANVAS2, queens.arraySolutions[currentSolution]);
    currentSolution++;
  }
  console.log(variable);
}

board();
let currentSolution = 0