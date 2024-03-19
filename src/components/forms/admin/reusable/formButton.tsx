'use client'
import { FC, ReactNode } from 'react';

import { IoAddCircleOutline } from 'react-icons/io5';

// Define the prop types for the FormButton component
interface FormButtonProps {
  text: string;
  icon?: ReactNode;  // Use ReactNode for the icon since it can be any valid React element or null.
  onClick?: () => void;  // Optional click handler if you need the button to do something besides submit.
}

const FormButton: FC<FormButtonProps> = ({ text, icon, onClick }) => {
  return (
    <button onClick={onClick} type="submit" className="flex items-center justify-center px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
      {icon} {text}  {/* Directly render the icon without checking, as React handles null/undefined gracefully */}
    </button>
  );
};

export default FormButton;
