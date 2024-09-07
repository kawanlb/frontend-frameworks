"use client";
import React from 'react';
import styles from '../styles/components/StatsCard.module.css';
import { Box } from '@chakra-ui/react';

// Importando as imagens
import EarningImage from '/public/earning.png';
import AssetManagementImage from '/public/asset-management.png';

export default function StatsCard({ title, value, icon }) {

  const icons = {
    money: <img src={EarningImage.src} alt="Earning" style={{ width: '40px', height: '40px' }} />,
    invest: <img src={AssetManagementImage.src} alt="Asset Management" style={{ width: '40px', height: '40px' }} />,
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
