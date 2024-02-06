import { useState, useEffect } from 'react'

import './App.css'

function App() {
  const [gameData, setGameData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [turn, setTurn] = useState(1)
  const [winningCombo, setWinningCombo] = useState(null)

  const winningCombinations = [
    //horizantal
    {indexes: [0,1,2], orientation: 'horizontal'},
    {indexes: [3,4,5], orientation: 'horizontal'},
    {indexes: [6,7,8], orientation: 'horizontal'},
    //vertical
    {indexes: [0,3,6], orientation: 'vertical'},
    {indexes: [1,4,7], orientation: 'vertical'},
    {indexes: [2,5,8], orientation: 'vertical'},
    //diagonais
    {indexes: [0,4,8], orientation: 'diagonal-1'},
    {indexes: [6,4,2], orientation: 'diagonal-2'},
  ]
  
  const handleClick = (clickedIndex) =>{
    console.log(clickedIndex)

    if(gameData[clickedIndex] != 0){
      return
    }
    if(winningCombo){
      return
    }

    setGameData((prev) =>{
      const newGameData = [...prev]
      newGameData[clickedIndex] = turn
      return newGameData
    })

    setTurn((prev) => turn === 1 ? 2 : 1)
  }

  useEffect(() =>{
    checkWinner()
    gameEnd()
  }, [gameData])
  useEffect(() =>{
    if(winningCombo){
      console.log(winningCombo)
      
    }
  }, [winningCombo])
  const gameEnd = () =>{
    if(gameData.every((item) => item != 0)){
      alert('jogo acabou.')
    }
  }

  const checkWinner = () =>{
    console.log('checando vencedor')

    let winner = null

    for( let combinations of winningCombinations){
      const {indexes} = combinations
      if(
        gameData[indexes[0]] === 1 && 
        gameData[indexes[1]] === 1 && 
        gameData[indexes[2]] === 1){
        winner = 'vitória do Player1!'
      }
      if(
        gameData[indexes[0]] === 2 && 
        gameData[indexes[1]] === 2 && 
        gameData[indexes[2]] === 2){
          winner = 'vitória do Player2!'
      }
      if(winner){
        setWinningCombo(combinations)
        break
      }
    }
    console.log({winner});
  }

  //❌
  //⭕
  return (
    <div className="board-game">
      {gameData.map((value, index) =>(
        <span 
        onClick={() => handleClick(index)} 
        key={index} 
        className={winningCombo?.indexes.includes(index) ? winningCombo.orientation : undefined}>
          <abbr title="">{index}</abbr>
          {value === 1 && 'X' } 
          {value === 2 && 'O'}
          </span>
      ))}
    </div>
  )
}

export default App
