import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';

const AddTransactionModal = ({ open, onClose, onSave }) => {
  const [transaction, setTransaction] = useState({
    category: '',
    date: '',
    description: '',
    status: '',
    value: ''
  });

  const handleChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(transaction);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box 
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          padding: '16px',
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: '8px',
          width: { xs: '90%', sm: '400px' } // Responsividade
        }}
      >
        <Typography variant="h6" marginBottom={2}>Adicionar Transação</Typography>
        <TextField
          label="Categoria"
          name="category"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          label="Data"
          name="date"
          type="date"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChange}
        />
        <TextField
          label="Descrição"
          name="description"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          label="Status"
          name="status"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          label="Valor"
          name="value"
          type="number"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />
        <Button 
          variant="contained" 
          sx={{ mt: 2 }} 
          onClick={handleSubmit}
          fullWidth
        >
          Salvar
        </Button>
      </Box>
    </Modal>
  );
};

export default AddTransactionModal;