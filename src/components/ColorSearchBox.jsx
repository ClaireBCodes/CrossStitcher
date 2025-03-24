import React from 'react';

const ColorSearchBox = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="color-search">
      <input
        type="text"
        placeholder="Search colors..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default ColorSearchBox;
