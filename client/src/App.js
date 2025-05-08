import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/submit', formData);
      alert('Form submitted successfully');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      alert('Error submitting form');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '50px auto' }}>
      <h2>Contact Form</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required /><br /><br />
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required /><br /><br />
        <textarea name="message" placeholder="Message" value={formData.message} onChange={handleChange} required /><br /><br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
