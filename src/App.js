import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('auth') === 'true');

  const handleLogin = (username, password) => {
    if (username === 'Admin' && password === '12345') {
      localStorage.setItem('auth', 'true');
      setIsAuthenticated(true);
    } else {
      alert('Ім\'я користувача або пароль введені не вірно');
    }
  };

  const handleLogout = () => {
    localStorage.setItem('auth', 'false');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <header>
        <nav>
          <Link to="/">Головна</Link> | 
          <Link to="/news">Новини</Link> | 
          <Link to="/profile">Профіль</Link>
          {isAuthenticated && <button onClick={handleLogout}>Вийти</button>}
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/news" element={<News />} />
        <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
      </Routes>

      <footer>
        <p>© 2024 My React App</p>
      </footer>
    </Router>
  );
}

const Home = () => (
  <div className="page-container">
    <h2>Ласкаво просимо на наш сайт</h2>
    <p>Це наша головна сторінка, де ви можете ознайомитися з нашою компанією або проектом. Натисніть на інші посилання, щоб переглянути новини або увійти до свого профілю.</p>
    <img src="https://via.placeholder.com/400x200" alt="Welcome" />
  </div>
);

const News = () => (
  <div className="page-container">
    <h2>Останні новини</h2>
    <div className="news-card">
      <img src="https://via.placeholder.com/150" alt="News 1" />
      <div>
        <h3>Заголовок новини 1</h3>
        <p>Короткий опис новини 1. Це просто фейковий текст для заповнення сторінки новин.</p>
      </div>
    </div>
    <div className="news-card">
      <img src="https://via.placeholder.com/150" alt="News 2" />
      <div>
        <h3>Заголовок новини 2</h3>
        <p>Короткий опис новини 2. Ви можете додати будь-яку однотипну інформацію.</p>
      </div>
    </div>
  </div>
);

const Profile = () => (
  <div className="page-container">
    <h2>Ваш профіль</h2>
    <p>Ласкаво просимо, Admin! Це ваша персональна сторінка профілю.</p>
    <p>Тут можна переглянути вашу особисту інформацію або змінити налаштування облікового запису.</p>
    <img src="https://via.placeholder.com/300x200" alt="Profile" />
  </div>
);

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="page-container">
      <h2>Вхід у систему</h2>
      <p>Будь ласка, введіть ім'я користувача та пароль для входу.</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Ім'я користувача:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Пароль:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Увійти</button>
      </form>
    </div>
  );
}

export default App;
