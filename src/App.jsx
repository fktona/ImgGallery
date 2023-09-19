import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RootLayot from "./RootLayot";

function App() {
  const [count, setCount] = useState(0)

  return (
<>
      <RootLayot />
</>
  )
}

export default App
