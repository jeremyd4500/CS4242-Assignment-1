import React from 'react';
import ReactDOM from 'react-dom';

import Main from './react/Main';

function App() {
  return (
    <div className="App">
      <h1>Roomba Simulation</h1>
      <Main />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
