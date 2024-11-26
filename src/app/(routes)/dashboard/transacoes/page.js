// src/app/(routes)/dashboard/transacoes/page.js
'use client'
import React, { useState, useMemo } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Button,
  Paper,
  useMediaQuery, 
  useTheme 
} from '@mui/material';
import Header from './_components/Header';
import BalanceCard from './_components/BalanceCard';
import TransactionsTable from './_components/TransactionsTable';
import AddTransactionModal from './_components/AddTransactionModal';
import AddIcon from '@mui/icons-material/Add';

// Função utilitária para formatar data corretamente
const formatDate = (dateString) => {
  // Se a data já estiver no formato YYYY-MM-DD, retorna como está
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return dateString;
  }

  // Parse da data no formato DD/MM/YYYY
  const [day, month, year] = dateString.split('/').map(Number);
  
  // Cria uma nova data (note que o mês em JS é zero-indexed)
  const formattedDate = new Date(year, month - 1, day);
  
  // Formata para YYYY-MM-DD
  return formattedDate.toISOString().split('T')[0];
};

// Função para converter data do formato YYYY-MM-DD para DD/MM/YYYY
const formatDateForEditing = (dateString) => {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
};

export default function TransacoesPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });
  
  const [filterType, setFilterType] = useState('Todas');
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      category: 'Mercado',
      date: '2023-07-15',
      description: 'Compras do mês',
      status: 'Concluído',
      value: 250.00,
      type: 'Despesa'
    },
    {
      id: 2,
      category: 'Trabalho',
      date: '2023-07-10',
      description: 'Salário',
      status: 'Concluído',
      value: 3500.00,
      type: 'Receita'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const handleMonthChange = (newMonth) => {
    setCurrentMonth(newMonth);
  };

  const handleAddTransaction = (newTransaction) => {
    // Formatar data corretamente
    const formattedDate = formatDate(newTransaction.date || new Date().toISOString().split('T')[0]);

    const transaction = {
      id: Date.now(), // Usar timestamp como ID único
      category: newTransaction.category || 'Sem Categoria',
      date: formattedDate,
      description: newTransaction.description || '',
      status: 'Concluído',
      value: Math.abs(parseFloat(newTransaction.value)) || 0,
      type: parseFloat(newTransaction.value) >= 0 ? 'Receita' : 'Despesa'
    };

    // Adicionar nova transação
    setTransactions(prevTransactions => [...prevTransactions, transaction]);
    
    // Fechar modal
    setIsModalOpen(false);
    setEditingTransaction(null);
  };

  const handleEditTransaction = (transaction) => {
    setEditingTransaction({
      ...transaction,
      // Converter data para formato de edição se necessário
      date: transaction.date ? formatDateForEditing(transaction.date) : ''
    });
    setIsModalOpen(true);
  };

  const handleUpdateTransaction = (updatedTransaction) => {
    // Formatar data corretamente
    const formattedDate = formatDate(updatedTransaction.date);

    const updatedTransactions = transactions.map(transaction => 
      transaction.id === updatedTransaction.id 
        ? {
            ...updatedTransaction,
            date: formattedDate,
            value: Math.abs(parseFloat(updatedTransaction.value)),
            type: parseFloat(updatedTransaction.value) >= 0 ? 'Receita' : 'Despesa'
          }
        : transaction
    );

    setTransactions(updatedTransactions);
    setIsModalOpen(false);
    setEditingTransaction(null);
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(prevTransactions => 
      prevTransactions.filter(t => t.id !== id)
    );
  };

  // Filtros combinados: mês, tipo de transação
  const filteredTransactions = useMemo(() => {
    return transactions.filter(transaction => {
      const transactionMonth = transaction.date.slice(0, 7);
      const isCorrectMonth = transactionMonth === currentMonth;
      const isCorrectType = filterType === 'Todas' || transaction.type === filterType;

      return isCorrectMonth && isCorrectType;
    });
  }, [transactions, currentMonth, filterType]);

  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        py: { xs: 2, sm: 4 },
        px: { xs: 1, sm: 2 },
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 2, sm: 3 },
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%)',
        minHeight: '100vh'
      }}
    >
      <Paper 
        elevation={isMobile ? 2 : 4} 
        sx={{ 
          p: { xs: 2, sm: 3 }, 
          borderRadius: 4,
          backgroundColor: 'white',
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
        }}
      >
        <Header 
          currentMonth={currentMonth}
          onMonthChange={handleMonthChange}
          filterType={filterType}
          setFilterType={setFilterType}
        />

        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
          mt: 2,
          alignItems: 'center'
        }}>
          <Box flex={1} width="100%">
            <BalanceCard transactions={filteredTransactions} />
          </Box>
          <Box 
            width="100%"
            display="flex" 
            justifyContent={{ xs: 'center', sm: 'flex-end' }}
          >
            <Button 
              fullWidth={isMobile}
              variant="contained" 
              startIcon={<AddIcon />}
              onClick={() => setIsModalOpen(true)}
              sx={{
                maxWidth: { xs: '100%', sm: 250 },
                background: 'linear-gradient(45deg, #4a90e2, #2c3e50)',
                borderRadius: 3,
                py: 1.5,
                px: 3
              }}
            >
              Adicionar Transação
            </Button>
          </Box>
        </Box>
      </Paper>

      <Paper  
      elevation={isMobile ? 2 : 4} 
      sx={{ 
        p: { xs: 2, sm: 3 }, 
        borderRadius: 4,
        backgroundColor: 'white',
        boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
      }}
    >
      <TransactionsTable 
        transactions={filteredTransactions}
        onEdit={handleEditTransaction}
        onDelete={handleDeleteTransaction}
      />
    </Paper>

    <AddTransactionModal 
      open={isModalOpen}
      onClose={() => {
        setIsModalOpen(false);
        setEditingTransaction(null);
      }}
      onSave={editingTransaction ? handleUpdateTransaction : handleAddTransaction}
      initialTransaction={editingTransaction}
    />
  </Container>
);
}