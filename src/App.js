import './App.css';
import Canvas from './components/Canvas';
import ToolPanel from './components/ToolPanel';

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <h1>Welcome to Whiteboard app</h1>
      
      </header>
      <Canvas/>
      <ToolPanel/>
    </div>
  );
}

export default App;
