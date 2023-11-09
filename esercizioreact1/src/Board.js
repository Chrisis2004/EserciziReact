import Square from "./Square";
import './Board.css';
import {useState} from "react";
export default function Board() {
    const [squares, setSquares] = useState(Array(9).fill(null)); //questa forma di costante è molto utile abituati ad utilizzala
    const [xIsNext, setXIsNext] = useState(true);

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    function handleClick(i) {
        if (squares[i]) return; //se c'è già un valore non fare nulla (return
        const nextSquares = squares.slice(); //crea una copia di squares
        nextSquares[i] = xIsNext ? 'X' : 'O'; //se xIsNext è true allora metti X altrimenti metti O
        setSquares(nextSquares); //cambia il valore di squares
        setXIsNext(!xIsNext); //cambia il valore di xIsNext
    }

    function calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }
    /*Non si può mettere direttamente handleClick perché è una funzione che fa renderizzare la pagina e React per evitare i cicli infiti di renderizzazione non pemette di chiamarla direttamente ma bisogna chiamarla tramite un altra funzionecome se fosse un pacchetto con la sintassi che vedi scritta si crea una funzione vuota che viene richiamata nel momento in cui avvine il click e fa runnare l'handleclick*/

    return (
        <>
            <div className="status">{status}</div>
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
            </div>
            <div className="board-row">
                <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
                <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
            </div>
            <div className="board-row">
                <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
                <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
            </div>
            <div>
                <button onClick={() => {
                        setSquares(Array(9).fill(null));
                        setXIsNext(true)
                    }}>
                    Rigioca
                </button>
            </div>
        </>
    );
}

