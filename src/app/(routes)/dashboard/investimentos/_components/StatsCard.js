"use client";
import React from 'react';
import styles from '../_styles/StatsCard.module.css';
import { Box } from '@chakra-ui/react';

export default function StatsCard({ title, value, icon }) {

  const icons = {
    money: <img src="/earning.png" alt="Earning" style={{ width: '40px', height: '40px' }} />,
    invest: <img src="/asset-management.png" alt="Asset Management" style={{ width: '40px', height: '40px' }} />,
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
