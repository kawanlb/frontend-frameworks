import React from 'react';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const PaymentCard = () => {
  const payments = [
    { descricao: 'Tênis', data: '13/06/2023', valor: 'R$400,00' },
    { descricao: 'Boné', data: '13/06/2023', valor: 'R$400,00' },
    { descricao: 'Calça', data: '21/07/2024', valor: 'R$253,49' },
    { descricao: 'Camisa', data: '19/07/2024', valor: 'R$113,00' },
  ];

  const downloadExcel = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Pagamentos em Atraso');

    worksheet.columns = [
      { header: 'Descrição', key: 'descricao', width: 30 },
      { header: 'Data', key: 'data', width: 15 },
      { header: 'Valor', key: 'valor', width: 15 },
    ];

    payments.forEach(payment => {
      worksheet.addRow(payment);
    });

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, 'PagamentosEmAtraso.xlsx');
    });
  };

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.text('Pagamentos em Atraso', 14, 16);
    doc.autoTable({
      head: [['Descrição', 'Data', 'Valor']],
      body: payments.map(payment => [payment.descricao, payment.data, payment.valor]),
    });

    doc.save('PagamentosEmAtraso.pdf');
  };


  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Pagamentos em atraso</h2>
      {payments.map((payment, index) => (
        <div key={index} style={styles.paymentRow}>
          <div style={styles.description}>{payment.descricao}</div>
          <div style={styles.date}>{payment.data}</div>
          <div style={styles.value}>{payment.valor}</div>
        </div>
      ))}
      <div style={styles.buttons}>
        <button onClick={downloadExcel} style={styles.button}>Baixar como Excel</button>
        <button onClick={downloadPDF} style={styles.button}>Baixar como PDF</button>
      </div>
    </div>
  );
};


const styles = {
  title: {
    marginBottom: '20px',
    fontSize: '1.5rem',
    fontWeight: 'regular',
    color: '#333',
    fontFamily: "'Poppins', sans-serif",
  },
  paymentRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 0',
    borderBottom: '1px solid #e0e0e0',
  },
  description: {
    flex: '2',
    fontSize: '1rem',
    fontFamily: "'Poppins', sans-serif",
    color: '#333',
  },
  date: {
    flex: '1',
    textAlign: 'right',
    fontSize: '1rem',
    fontFamily: "'Poppins', sans-serif",
    color: '#888',
  },
  value: {
    flex: '1',
    textAlign: 'right',
    fontSize: '1rem',
    fontFamily: "'Poppins', sans-serif",
    color: '#000',
  },
  buttons: {
    marginTop: '20px',
    textAlign: 'center',
    
  },
  button: {
    margin: '0 10px',
    padding: '10px 15px',
    fontSize: '1rem',
    cursor: 'pointer',
    borderRadius: '30px',
    border: 'none',
    backgroundColor: '#5E64F2',
    color: '#fff',
  },
};



export default PaymentCard;
