import React from 'react';

const Body = ({ className, children }) => (
  <div className={`definition-list__body ${className || ''}`}>
    {children}
  </div>
);

export default Body;