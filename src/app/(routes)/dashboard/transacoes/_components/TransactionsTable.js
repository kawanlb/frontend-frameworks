import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

const TransactionsTable = ({ transactions, onEdit, onDelete }) => {
  const getStatusChip = (status) => {
    if (status === 'Concluído') {
      return <Chip label="Concluído" color="success" />;
    }
    return <Chip label="Pendente" color="warning" />;
  };

  return (
    <TableContainer component={Paper} sx={{ marginBottom: '32px' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Categoria</TableCell>
            <TableCell>Data</TableCell>
            <TableCell>Descrição</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Valor</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.category}</TableCell>
              <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>{getStatusChip(transaction.status)}</TableCell>
              <TableCell>
                {transaction.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </TableCell>
              <TableCell>
                <button  style={{ marginRight: '8px' }} onClick={() => onEdit(transaction)}>
                  <img src="/edit.svg" alt="Editar" />
                </button>
                <button onClick={() => onDelete(transaction.id)}>
                  <img src="/trash.svg" alt="Excluir" />
                </button>
                
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionsTable;
