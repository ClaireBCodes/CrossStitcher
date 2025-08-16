import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HeaderBar } from './components/HeaderBar';
import { NavBar } from './components/NavBar';
import { FooterBar } from './components/FooterBar';
import AppRoutes from './Routes/AppRoutes';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Container
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        minWidth: '100vw',
        padding: 0,
      }}
    >
      <HeaderBar />
      <NavBar />
      <div style={{ flex: 1 }}>
        <AppRoutes />
      </div>

      <FooterBar />
    </Container>
  );
}

export default App;
