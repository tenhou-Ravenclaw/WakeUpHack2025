import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <>
      <h1>This is page 1!!</h1>
      <button onClick={() => {
        fetch('http://0.0.0.0:5001/api')
          .then(response => response.text())
          .then(data => {alert(data);console.log(data)})
          .catch(error => console.error('Error:', error));
      }}>
        Fetch from Port 5000
      </button>
    </>
  )
}

export default App
