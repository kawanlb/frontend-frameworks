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
    <TableContainer component={Paper} sx={{ marginBottom: '32px', overflowX: 'auto' }}>
      <Table className="min-w-full">
        <TableHead>
          <TableRow>
            <TableCell className="font-bold">Categoria</TableCell>
            <TableCell className="font-bold">Data</TableCell>
            <TableCell className="font-bold">Descrição</TableCell>
            <TableCell className="font-bold">Status</TableCell>
            <TableCell className="font-bold">Valor</TableCell>
            <TableCell className="font-bold">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id} className="hover:bg-gray-100">
              <TableCell>{transaction.category}</TableCell>
              <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>{getStatusChip(transaction.status)}</TableCell>
              <TableCell>
                {transaction.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </TableCell>
              <TableCell>
                <button style={{ marginRight: '8px' }} onClick={() => onEdit(transaction)}>
                  <img src="/edit.svg" alt="Editar" className="w-5 h-5" />
                </button>
                <button onClick={() => onDelete(transaction.id)}>
                  <img src="/trash.svg" alt="Excluir" className="w-5 h-5" />
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