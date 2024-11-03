"use client"
import React, { useState } from 'react';
import { Container, Grid, Box, Button } from '@mui/material';
import Header from './_components/Header';
import TransactionsTable from './_components/TransactionsTable';
import BalanceCard from './_components/BalanceCard';
import AddTransactionModal from './_components/AddTransactionModal';

const App = () => {
  const [openModal, setOpenModal] = useState(false);
  const [transactions, setTransactions] = useState([
    { id: 1, category: 'Eletrônicos', date: '2024-08-17', description: 'Microondas', status: 'Pendente', type: 'Despesa', value: 50.00 },
    { id: 2, category: 'Mercado', date: '2024-08-15', description: 'Compras', status: 'Concluído', type: 'Despesa', value: 400.00 },
    { id: 3, category: 'Trabalho', date: '2024-08-15', description: 'Salário', status: 'Concluído', type: 'Receita', value: 600.00 }
  ]);
  const [currentMonth, setCurrentMonth] = useState('2024-08');
  const [filterType, setFilterType] = useState('Todas');
  const [editingTransaction, setEditingTransaction] = useState(null);

  const handleAddTransaction = (transaction) => {
    if (editingTransaction) {
      setTransactions(transactions.map(t => t.id === editingTransaction.id ? { ...transaction, id: t.id } : t));
    } else {
      setTransactions([...transactions, { ...transaction, id: transactions.length + 1 }]);
    }
    setOpenModal(false);
    setEditingTransaction(null);
  };

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
    setOpenModal(true);
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const filteredTransactions = transactions.filter(transaction => {
    const transactionMonth = transaction.date.substring(0, 7);
    const matchesMonth = transactionMonth === currentMonth;
    const matchesType = filterType === 'Todas' || transaction.type === filterType;
    return matchesMonth && matchesType;
  });

  return (
    <Grid container>      
      <Grid item xs={0}>
        <Container>
          <Header 
            currentMonth={currentMonth}
            onMonthChange={setCurrentMonth}
            filterType={filterType}
            setFilterType={setFilterType}
          />
          <Button 
            variant="contained" 
            onClick={() => setOpenModal(true)} 
            sx={{ backgroundColor: '#5559db', float: 'right', margin: '16px', padding: '1.2% 2.5%', fontSize: '1rem' }}
          >
            Nova Transação
          </Button>
          <TransactionsTable 
            transactions={filteredTransactions} 
            onEdit={handleEditTransaction} 
            onDelete={handleDeleteTransaction} 
          />
          <BalanceCard transactions={filteredTransactions} />
          <AddTransactionModal 
            open={openModal} 
            onClose={() => setOpenModal(false)} 
            onSave={handleAddTransaction} 
            transaction={editingTransaction}
          />
        </Container>
      </Grid>
    </Grid>
  );
};

export default App;
