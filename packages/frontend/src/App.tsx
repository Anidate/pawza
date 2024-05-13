import './normalize.css';
import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Footer from './features/Footer';
import Home from './features/Home';
import Navbar from './features/Navbar';
import ChatApp from './features/Messages/Chat/Message';

function App() {
  return (
    <>    
    <Router>
      <Navbar />
      {/* TODO: Add react-router */}
      <main style={{ flexGrow: 1, maxWidth: '400px', alignSelf: 'center' }}>
      <Routes>
        <Route path="/" element={<Home />} />
        </Routes>
      </main>
      
      <Routes>
        <Route path="/chat" element={<ChatApp />} />
        </Routes>
      <Footer />
      </Router>
    </>
  );
}

export default App;
