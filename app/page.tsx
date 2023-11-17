"use client"
import React, { useEffect, useRef, useState } from 'react';
import { Varela_Round } from 'next/font/google';

interface Score {
    X: number;
    O: number;
}

const varela = Varela_Round({
    subsets: ['latin'],
    weight: ['400']
})

let display: string = 'hidden';
export default function Page() {
    const [board, setBoard] = useState<string[]>(Array(9).fill(''));
    const [turn, setTurn] = useState<string>('X');
    const [winner, setWinner] = useState<string | null>(null);
    const [draw, setDraw] = useState<string | null>(null);
    const [score, setScore] = useState<Score>({ X: 0, O: 0 });
    const squaresRef = useRef<Array<React.RefObject<HTMLSpanElement>>>(board.map(() => React.createRef()));

    const combinations: number[][] = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    useEffect(() => {
        const fullBoard: boolean = board.every(square => square != '')
        if (winner === null && fullBoard) {
            setDraw('Draw !')
        }
    }, [winner, board, turn, draw])

    const handleClick = (index: number): void => {
        setTurn(turn == 'X' ? 'O' : 'X')
        squaresRef.current[index].current!.innerHTML = turn;
        squaresRef.current[index].current!.style.pointerEvents = 'none';
        board[index] = turn;
        checkWinner(board);
    };

    const checkWinner = (currentBoard: string[]): void => {
        for (const combination of combinations) {
            const [a, b, c] = combination;
            if (
                currentBoard[a] === turn &&
                currentBoard[b] === turn &&
                currentBoard[c] === turn
            ) {
                setWinner(turn);
                setScore(prevScore => ({
                    ...prevScore,
                    [turn]: prevScore[turn] + 1
                }))
                squaresRef.current[combination[0]].current!.style.backgroundColor = '#9ca3af';
                squaresRef.current[combination[1]].current!.style.backgroundColor = '#9ca3af';
                squaresRef.current[combination[2]].current!.style.backgroundColor = '#9ca3af';
                break;
            }
        }
    }


    const replay = (): void => {
        setBoard(Array(9).fill(''));
        setWinner(null);
        setDraw(null);
        setTurn('X');
        display = 'hidden';

        const spans = document.querySelectorAll('span');
        spans.forEach((span) => {
            if (span.style.pointerEvents) {
                span.style.pointerEvents = 'auto';
            }
            if (span.style.backgroundColor) {
                span.style.backgroundColor = '#d1d5db';
            }
        })
    }

    if (winner !== null || draw !== null) {
        display = 'block'
    }

    return (
        <>
            <div className={`${varela.className} flex flex-col items-center justify-center mt-10`} id='gm'>
                <h1 className="text-4xl font-bold mb-10">Tic Tac Toe</h1>
                <p className='text-lg'>
                    <span className={`mr-2 ${score.X == score.O ? 'text-black' : score.X > score.O ? 'text-green-500' : 'text-red-500'}`}>
                        X: <b>{score.X}</b>
                    </span>|
                    <span className={`ml-2 ${score.X == score.O ? 'text-black' : score.X > score.O ? 'text-red-500' : 'text-green-500'}`}>
                        O: <b>{score.O}</b>
                    </span>
                </p>
                <p className={`${varela.className} text-2xl my-2`}>
                    {draw == null ? (winner != null ? `The Winner is ${turn == 'X' ? 'O' : 'X'}` : `Turn: ${turn}`) : draw}
                </p>
                <div className={`${varela.className} grid grid-cols-3 gap-1`}
                    style={winner !== null ? { pointerEvents: 'none' } : { pointerEvents: 'auto' }}>
                    {board.map((square, index) => (
                        <span
                            key={index}
                            onClick={() => handleClick(index)}
                            className="square w-16 h-16 p-2 text-3xl flex items-center justify-center bg-gray-300"
                            ref={squaresRef.current[index]}
                        >
                            {square}
                        </span>
                    ))}
                </div>
                <button className={`bg-blue-500 hover:bg-blue-600 duration-500 text-white py-2 px-4 m-10 rounded ${display}`}
                    onClick={replay}>
                    Replay
                </button>
            </div>
        </>
    );
}