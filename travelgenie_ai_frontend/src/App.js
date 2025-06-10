import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ItineraryPage from './pages/ItineraryPage';
import WeatherPage from './pages/WeatherPage';
import ChatPage from './pages/ChatPage';

// PUBLIC_INTERFACE
function App() {
  /** Root navigation/router for TravelGenie AI major page views. */
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <div className="logo">
                <span className="logo-symbol">*</span> TravelGenie AI
              </div>
              <div>
                <Link className="btn" to="/">Home</Link>
                <Link className="btn" style={{ marginLeft: '8px' }} to="/itinerary">Itinerary</Link>
                <Link className="btn" style={{ marginLeft: '8px' }} to="/weather">Weather</Link>
                <Link className="btn" style={{ marginLeft: '8px' }} to="/chat">Chat</Link>
              </div>
            </div>
          </div>
        </nav>

        <main>
          <div className="container" style={{ paddingTop: '80px' }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/itinerary" element={<ItineraryPage />} />
              <Route path="/weather" element={<WeatherPage />} />
              <Route path="/chat" element={<ChatPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;