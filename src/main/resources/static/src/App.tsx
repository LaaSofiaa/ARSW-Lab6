import { useState } from 'react'
import Blueprints from "./components/Blueprints";
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Blueprints />
    </div>
  );
}

export default App
