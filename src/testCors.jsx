import React, { useEffect, useState } from 'react';

export const TestCors = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('https://tetiana-choice-back-app.onrender.com/')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Помилка мережі');
        }
        return res.text();
      })
      .then((data) => setMessage(data))
      .catch((err) => {
        console.error('Error:', err);
        setMessage('Помилка запиту');
      });
  }, []);

  return (
    <div>
      <h2>Результат запиту з бекенду:</h2>
      <p>{message}</p>
    </div>
  );
};
