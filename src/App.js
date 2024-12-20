import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext'; // Importez useAuth
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Feed from './components/Feedi';
import Login from './components/login';
import Register from './components/register.js';
import AddArticle from './components/AddArticle.js';
import AddCategory from './components/AddCategory.js'
import './App.css';

function AppContent() {
  const { login } = useAuth();
  const { register } = useAuth(); 

  const handleLogin = () => {
    login(); // Appelez la fonction login du contexte
    // Vous pouvez ajouter d'autres actions ici si nécessaire
  };
  const handleRegister = () => {
    register(); // Appelez la fonction login du contexte
    // Vous pouvez ajouter d'autres actions ici si nécessaire
  };
  return (
    <Router>
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/register" element={<Register onRegister={handleRegister} />} />
              <Route path='/addarticle' element={<AddArticle />} />
              <Route path='/addcategory' element={<AddCategory />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
