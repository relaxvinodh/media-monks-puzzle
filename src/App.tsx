import React from 'react';
import './App.css';
import Board from "./components/Board";

const App:React.FC = () => {
  return (
    <div className="App">
      <h1>MediaMonks sliding puzzle</h1>
      <Board />
    </div>
  );
}

export default App;
