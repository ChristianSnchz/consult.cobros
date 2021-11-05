import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorBoundary = (error: Error): JSX.Element => {
  // console.error('An error ocurred in @santander/debt-consult', error);
  return (
    <div className="h-16 flex items-center justify-between px-6 bg-primary text-white">
      Error in @santander/debt-consult microfont
    </div>
  );
};

export default errorBoundary;
