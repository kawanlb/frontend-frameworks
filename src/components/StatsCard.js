"use client";
import React from 'react';
import styles from '../styles/components/StatsCard.module.css';
import { Box, Icon } from '@chakra-ui/react';
import { FaDollarSign } from 'react-icons/fa';

export default function StatsCard({ title, value, icon }) {
  const icons = {
    money: <FaDollarSign />,
    invest: <Icon as={FaDollarSign} />,
  };

  return (
    <Box className={styles.card}>
      <div className={styles.icon}>{icons[icon]}</div>
      <div className={styles.content}>
        <p className={styles.title}>{title}</p>
        <h3 className={styles.value}>{value}</h3>
      </div>
    </Box>
  );
}
