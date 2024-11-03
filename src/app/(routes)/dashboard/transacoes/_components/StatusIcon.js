import React from 'react';
import { FaShoppingCart, FaLaptop, FaBriefcase } from 'react-icons/fa';
import '../_styles/StatusIcon.module.css';

function StatusIcon({ category }) {
  let icon;
  if (category === 'Mercado') {
    icon = <FaShoppingCart className="icon mercado" />;
  } else if (category === 'Eletrônicos') {
    icon = <FaLaptop className="icon eletronicos" />;
  } else if (category === 'Trabalho') {
    icon = <FaBriefcase className="icon trabalho" />;
  }

  return <div>{icon}</div>;
}

export default StatusIcon;
