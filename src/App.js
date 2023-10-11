import React from 'react';
import Die from './component/die';
import { nanoid } from 'nanoid';
import ReactConfetti from 'react-confetti';
import Footer from './component/footer';
import Scoreboard from './component/Scoreborad';

function App() {

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const newArr = []
    for (let i = 0; i < 10; i++) {
      newArr.push(generateNewDie())
    }
    return newArr
  }
  // Create state to hold our array of numbers
  const [dice, setDice] = React.useState(allNewDice())

  // Create state to hold our game state
  const [tenzies, setTenzies] = React.useState(false)

  // Create and initialize states to hold rolls stats and best rollState
  const [roll, setRoll] = React.useState(0)
  const [bestRolls, setBestRolls] = React.useState(
    JSON.parse(localStorage.getItem("bestRolls")) || 0,
  );


  React.useEffect(() => {
    localStorage.setItem("bestRolls", JSON.stringify(bestRolls));
  }, [bestRolls])

  function setRecords() {
    // Check if bestRolls doesn't exist or newest rolls are better than bestRolls if so reassign the variable
    if (!bestRolls || roll < bestRolls) {
      setBestRolls(roll);
    }
  }
  // Increase rolls counter updating previous state
  function updateRolls() {
    setRoll(oldVal => oldVal + 1)
  }

  React.useEffect(() => {
    // Check all dice have same value
    // Check if every die's value has the same one as the first die in dice array
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValues = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValues) {
      setTenzies(true)
      setRecords()
    }
    // eslint-disable-next-line
  }, [dice])

  const diceElements = dice.map(die => <Die holdDice={() => holdDice(die.id)} key={die.id} value={die.value} isHeld={die.isHeld} />)

  function rollDice() {
    if (!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? die : generateNewDie()
      }))
      updateRolls()
    } else {
      // start new game if user won and click on button
      setTenzies(false)
      setDice(allNewDice())
      setRoll(0)
    }
  }

  function holdDice(id) {
    // { ...die, isHeld: !die.isHeld } return the same die object but with isHeld flipped
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? { ...die, isHeld: !die.isHeld } : die
    }))
  }
  return (
    <main>
      {/* Render Confetti component if `tenzies` is true*/}
      {tenzies && <ReactConfetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='dice-container'>
        {diceElements}
      </div>
      <button
        className='roll-dice'
        onClick={rollDice}
      >
        {tenzies ? "New Game" : "Roll"}</button>
      {<p className="winner gradient-text" style={{ height: '10px', margin: "5px" }}> {tenzies && "YOU WIN!"}</p>}
      <p>Rolls: {roll}</p>

      <Scoreboard bestRolls={bestRolls} />
      <Footer />
    </main>
  );
}

export default App;
