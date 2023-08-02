import { useState } from 'react';
import './App.css';
import store from './store';
import Canvas from './components/Canvas';
import ToolPanel from './components/ToolPanel';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        {/* <header className="App-header">
        <h1>Welcome to Whiteboard app</h1>
        
        </header> */}
        <Canvas />
        <ToolPanel />
      </div>
    </Provider>
  );
}

export default App;
