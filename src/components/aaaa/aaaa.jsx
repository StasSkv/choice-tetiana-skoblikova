import React, { useState } from 'react';
import s from './aa.module.css';

const TestComponent = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const className = isVisible ? `${s.box} ${s.visible}` : s.box;

  return (
    <div>
      <button onClick={toggleVisibility}>Toggle Box</button>
      <div className={className}></div>
    </div>
  );
};

export default TestComponent;
