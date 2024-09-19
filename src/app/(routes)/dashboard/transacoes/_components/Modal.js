import React, { useState } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';

const AddTransactionModal = ({ open, onClose, onSave }) => {
  const [transaction, setTransaction] = useState({
    date: '',
    category: '',
    description: '',
    value: 0,
    status: ''
  });

  const handleChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave(transaction);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ p: 4, backgroundColor: 'white', margin: 'auto', maxWidth: 500 }}>
        <TextField label="Data" name="date" onChange={handleChange} fullWidth />
        <TextField label="Categoria" name="category" onChange={handleChange} fullWidth />
        <TextField label="Descrição" name="description" onChange={handleChange} fullWidth />
        <TextField label="Valor" name="value" onChange={handleChange} fullWidth />
        <TextField label="Status" name="status" onChange={handleChange} fullWidth />
        <Button variant="contained" onClick={handleSave} fullWidth sx={{ mt: 2 }}>Salvar</Button>
      </Box>
    </Modal>
  );
};

export default AddTransactionModal;
