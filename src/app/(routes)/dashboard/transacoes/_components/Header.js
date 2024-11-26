import React from 'react';
import { Box, Typography, ButtonGroup, Button } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const Header = ({ currentMonth, onMonthChange, filterType, setFilterType }) => {
  const handlePreviousMonth = () => {
    const [year, month] = currentMonth.split('-');
    const newDate = new Date(year, month - 1, 1);
    newDate.setMonth(newDate.getMonth() - 1);
    const newMonth = `${newDate.getFullYear()}-${(newDate.getMonth() + 1).toString().padStart(2, '0')}`;
    onMonthChange(newMonth);
  };

  const handleNextMonth = () => {
    const [year, month ,] = currentMonth.split('-');
    const newDate = new Date(year, month - 1, 1);
    newDate.setMonth(newDate.getMonth() + 1);
    const newMonth = `${newDate.getFullYear()}-${(newDate.getMonth() + 1).toString().padStart(2, '0')}`;
    onMonthChange(newMonth);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', marginBottom: '16px' }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '16px' }}>Transações</Typography>
      
      <ButtonGroup variant="text" sx={{ flexWrap: 'wrap' }}>
        <Button 
          onClick={() => setFilterType('Todas')} 
          variant={filterType === 'Todas' ? 'contained' : 'outlined'}
        >
          Todas
        </Button>
        <Button 
          onClick={() => setFilterType('Receita')} 
          variant={filterType === 'Receita' ? 'contained' : 'outlined'}
        >
          Receitas
        </Button>
        <Button 
          onClick={() => setFilterType('Despesa')} 
          variant={filterType === 'Despesa' ? 'contained' : 'outlined'}
        >
          Despesas
        </Button>
      </ButtonGroup>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
        <Button startIcon={<ChevronLeft />} onClick={handlePreviousMonth}></Button>
        <Typography variant="h6" sx={{ margin: '0 8px' }}>
          {new Date(currentMonth).toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}
        </Typography>
        <Button endIcon={<ChevronRight />} onClick={handleNextMonth}></Button>
      </Box>
    </Box>
  );
};

export default Header;