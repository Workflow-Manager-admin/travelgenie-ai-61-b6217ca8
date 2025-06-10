import React from 'react';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
function HomePage() {
  /**
   * This is the Home page component for TravelGenie AI.
   * For secure API key use, all keys are referenced via process.env.REACT_APP_*
   * and loaded at build time from your .env file.
   */
  return (
    <div className="hero">
      <div className="subtitle">Ultimate AI-powered Travel Companion</div>
      <h1 className="title">TravelGenie AI</h1>
      <div className="description">
        Plan smarter, travel better. Instantly generate a personalized itinerary, check real-time weather, talk with our AI travel expert, and get ready for an unforgettable trip!
      </div>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link className="btn btn-large" to="/itinerary">AI Itinerary Planner</Link>
        <Link className="btn btn-large" to="/weather">Weather Checker</Link>
        <Link className="btn btn-large" to="/chat">Travel Chatbot</Link>
      </div>
      <div style={{marginTop: "40px", color: "var(--text-secondary)", fontSize: "1rem"}}>
        <strong>Security note:</strong> API keys are managed using environment variables (.env file). See <code>.env.example</code> for setup. Never commit your actual <code>.env</code> to version control.
      </div>
    </div>
  );
}

export default HomePage;
