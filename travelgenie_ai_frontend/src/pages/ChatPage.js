import React, { useState, useRef, useEffect } from 'react';

/*
  PUBLIC_INTERFACE
*/
/**
 * ChatPage: Interactive chatbot page using Cohere (or mock) API call.
 * API key usage:
 *   const cohereKey = process.env.REACT_APP_COHERE_KEY;
 *   const cohereApiUrl = process.env.REACT_APP_COHERE_API_URL;
 * Do NOT hardcode actual keys; always reference process.env variables.
 */
function ChatPage() {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hi! I'm your TravelGenie AI bot. Ask me anything about your trip." }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const bottomRef = useRef();

  // Securely load Cohere API credentials from env
  const cohereKey = process.env.REACT_APP_COHERE_KEY;
  const cohereApiUrl = process.env.REACT_APP_COHERE_API_URL || "https://api.cohere.ai/v1/chat"; // fallback if not set

  // Scroll to newest message
  useEffect(() => {
    if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  async function sendMessage(ev) {
    ev.preventDefault();
    if (!input.trim()) return;
    setMessages(msgs => [...msgs, { sender: "user", text: input }]);
    setInput('');
    setLoading(true);
    setErr(null);

    try {
      // In production, would POST to /api/chat on your backend using key from env
      // Demo: Mocked Cohere API call using API key (never expose secret to user JS in real deployments)
      const reply = await new Promise((resolve) => setTimeout(() => {
        resolve({
          text: `I'm an AI bot! (REACT_APP_COHERE_KEY starts ${cohereKey && cohereKey.slice(0, 4)}...). Let's plan your travel!`,
        });
      }, 800));
      setMessages(msgs => [...msgs, { sender: "ai", text: reply.text }]);
    } catch (e) {
      setErr("Sorry, there was an error contacting the chatbot.");
    }
    setLoading(false);
  }

  return (
    <div>
      <h2>Travel Chatbot</h2>
      <div style={{
        fontSize: '1rem',
        color: 'var(--text-secondary)',
        marginBottom: 12,
      }}>
        Ask me about destinations, packing tips, or anything travel related.<br/>
        <span style={{fontSize:"0.93em"}}>
          (API key for Cohere is securely loaded via <b>process.env.REACT_APP_COHERE_KEY</b>)
        </span>
      </div>
      <div style={{
        border: '1px solid var(--border-color)', borderRadius: 8,
        background: '#111624', minHeight: 240, maxWidth: 520, margin: '0 auto', padding: 14,
        overflowY: 'auto', marginBottom: 18
      }}>
        {messages.map((m, i) =>
          <div
            key={i}
            style={{
              margin: '10px 0', color: m.sender === 'ai' ? 'var(--base-light)' : "#fff",
              textAlign: m.sender === "ai" ? "left" : "right"
            }}>
            <strong>{m.sender === "ai" ? "🤖 Genie" : "You"}:</strong> {m.text}
          </div>
        )}
        <div ref={bottomRef} />
        {loading && <div>Bot is responding...</div>}
      </div>
      <form onSubmit={sendMessage} style={{display:"flex", gap:"9px", maxWidth:510, margin:"0 auto"}}>
        <input
          type="text"
          value={input}
          onChange={ev => setInput(ev.target.value)}
          placeholder="Type your travel question..."
          required
          disabled={loading}
          style={{flex:1}}
        />
        <button className="btn" type="submit" disabled={loading || !input.trim()}>Send</button>
      </form>
      {err && <div style={{color: "red", marginTop: 8}}>{err}</div>}
      <div style={{marginTop:32, color:"var(--text-secondary)", fontSize:"0.95em"}}>
        This chat demonstrates using <b>process.env</b> for loading secrets such as the Cohere API key.
        <br/>
        <b>NEVER</b> commit or expose plain API keys in frontend code or public repos.
        <br/>
        For secure production use, always proxy LLM/chat requests from your backend!
      </div>
    </div>
  );
}

export default ChatPage;
