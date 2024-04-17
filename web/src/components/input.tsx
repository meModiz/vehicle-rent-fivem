import React, { ChangeEvent } from 'react';
import "./App.css";

interface NumberInputProps {
  onNumberChange: (value: string) => void;
}

function NumberInput({ onNumberChange }: NumberInputProps) {
  const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, '');
    onNumberChange(inputValue);
  };

  return (
    <div style={{ marginBottom: 12 }}>
      <input
        type="number"
        id="myNumberInput"
        onChange={handleNumberChange}
        className="inputHours"
        placeholder='Minutes'
      />
    </div>
  );
}

export default NumberInput;
