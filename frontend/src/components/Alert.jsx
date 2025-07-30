 import React from 'react';
import '../styles/Alert.css';

const Alert = ({ type ='info', message, onClose }) => {
  return (
    <div className={`alert ${type}`}>
      <span>{message}</span>
      {onClose && <button onClick={onClose}>×</button>}
    </div>
  );
};

export default Alert;
