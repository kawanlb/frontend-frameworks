import React from 'react';
import { FaShoppingCart, FaLaptop, FaBriefcase } from 'react-icons/fa';
import '../_styles/StatusIcon.module.css';

function StatusIcon({ category }) {
  let icon;
  switch (category) {
    case 'Mercado':
      icon = <FaShoppingCart className="icon mercado" />;
      break;
    case 'Eletrônicos':
      icon = <FaLaptop className="icon eletronicos" />;
      break;
    case 'Trabalho':
      icon = <FaBriefcase className="icon trabalho" />;
      break;
    default:
      icon = null;
  }

  return <div>{icon}</div>;
}

export default StatusIcon;