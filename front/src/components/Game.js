import React, { useState, useEffect } from "react";
import GameBoard from "./GameBoard";
import GameInfo from "./GameInfo";
import GameStatus from "./GameStatus";

function Game(props) {

  const createShip = (name, color, length) => {
    return{name, color, length, placed:false}
  }
  const [isReady, setIsReady] = useState(false)
  const [playerShips, setPlayerShips] = useState([
    createShip('Carrier', 'rgb(255, 89, 94)', 5),
    createShip('Battleship', 'rgb(255, 202, 58)', 4),
    createShip('Cruiser', 'rgb(138, 201, 38)', 3),
    createShip('Submarine','rgb(226, 248, 241)', 3),
    createShip('Destroyer', 'rgb(183, 158, 219)', 2) 
  ])
  const [activeShip, setActiveShip] = useState(playerShips[0])

  useEffect(() => {
    const shipsNotPlaced = playerShips.filter(ship => ship.placed === false)
    if (shipsNotPlaced.length) setActiveShip(shipsNotPlaced[0])
    else setActiveShip({name:false, selected:true})
  },[playerShips])

  const changeShipSelectedStatus = (ship, isPlaced) => {
    const updatedShip = ship
    updatedShip.placed = isPlaced
    const index = playerShips.findIndex(arrayShip => arrayShip.name === ship.name)
    const newArray = [...playerShips]
    newArray[index] = updatedShip
    setPlayerShips(newArray)
  }

  return (
    <main className="game">
      <GameInfo 
        gamePhase={props.gamePhase}
      />
      <GameBoard 
        playerShips={playerShips}
        activeShip={activeShip}
        changeShipSelectedStatus={changeShipSelectedStatus}
        gamePhase={props.gamePhase}
        setGamePhase={props.setGamePhase}
      />
      <GameStatus 
        isReady={isReady}
        setIsReady={setIsReady}
        activeShip={activeShip}
        gamePhase={props.gamePhase}
        setGamePhase={props.setGamePhase}
        playerShips={playerShips}
        socket={props.socket}
        room={props.room}
      />
    </main>
  )
}

export default Game