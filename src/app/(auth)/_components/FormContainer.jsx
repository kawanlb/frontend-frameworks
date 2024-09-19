import React from 'react';

export default function FormContainer({ children }) {
  return (
    <div className="bg-gray-50 p-8 rounded-2xl shadow-2xl w-full max-w-xl mx-auto">
      {children}
    </div>
  );
}
