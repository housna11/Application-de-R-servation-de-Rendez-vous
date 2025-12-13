import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React, { useState, useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import { getUser } from "./api/authService";

function App() {
  const [user, setUser] = useState(null);
  const [isRegister, setIsRegister] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUser().catch(() => null);
      setUser(res ? res.data : null);
    };
    fetchUser();
  }, []);

  // Si user connecté = afficher dashboard
  if (user) return <Dashboard user={user} setUser={setUser} />;

  // Sinon = Login ou Register
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50">
      <div className="p-6 rounded-2xl shadow-xl bg-white mb-6">
        
        <p className="mt-2 text-gray-700">
          Si tu vois ce texte stylé, Tailwind est bien installé.
        </p>
      </div>

      {isRegister ? (
        <Register goLogin={() => setIsRegister(false)} setUser={setUser} />
      ) : (
        <Login setUser={setUser} goRegister={() => setIsRegister(true)} />
      )}
    </div>
  );
}

export default App;
