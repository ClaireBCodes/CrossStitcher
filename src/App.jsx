import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { HeaderBar } from './components/HeaderBar'
import { NavBar } from './components/NavBar'
import { FooterBar } from './components/FooterBar'
import AppRoutes from './Routes/AppRoutes';


function App() {


  return (
    <>

      <HeaderBar />
      <NavBar />
      <>
        <AppRoutes />
      </>
      
      
      <FooterBar />

    </>
  )
}

export default App
