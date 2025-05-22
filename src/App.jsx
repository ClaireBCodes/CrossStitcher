import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { HeaderBar } from './components/HeaderBar'
import { NavBar } from './components/NavBar'
import { FooterBar } from './components/FooterBar'
import AppRoutes from './Routes/AppRoutes';
import { Container } from 'react-bootstrap';



function App() {

  return (
    <div style={{
      width: '100%', 
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    }}>

      <HeaderBar />
      <NavBar />
      <div style={{ flex: 1 }}>
        <AppRoutes />
      </div>
      
      
      <FooterBar />

    </div>
  )
}

export default App
