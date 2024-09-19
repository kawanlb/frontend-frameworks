import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

const BalanceCard = ({ transactions }) => {
  const balance = transactions.reduce((acc, transaction) => {
    return transaction.type === 'Receita' ? acc + transaction.value : acc - transaction.value;
  }, 0);

  return (
    <Paper sx={{ padding: '16px', backgroundColor: '#f4f4f4', borderRadius: '8px' }}>
      <Typography variant="h6">Balanço mensal</Typography>
      <Typography variant="h4" sx={{ color: balance >= 0 ? 'green' : 'red' }}>
        {balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
      </Typography>
    </Paper>
  );
};

export default BalanceCard;
