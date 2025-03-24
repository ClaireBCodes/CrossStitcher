import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { HeaderBar } from './components/HeaderBar'
import { NavBar } from './components/NavBar'
import { FooterBar } from './components/FooterBar'
import { MainBody } from './components/MainBody'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <HeaderBar />
      <NavBar />
      <MainBody />
      <FooterBar />

    </>
  )
}

export default App
