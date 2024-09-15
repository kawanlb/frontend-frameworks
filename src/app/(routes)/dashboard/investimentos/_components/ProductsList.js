"use client"; 
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { ProgressBar } from 'react-bootstrap';
import styles from '../_styles/ProductsList.module.css';

export default function ProductsList({ products: initialProducts }) {
  const [products, setProducts] = useState(initialProducts);
  const router = useRouter(); 

  useEffect(() => {
    // Verifique se o produto para editar foi removido da sessão
    sessionStorage.removeItem('productToEdit');

    // Verifique e defina a lista de produtos do localStorage
    const storedInvestments = JSON.parse(localStorage.getItem('investments')) || [];
    setProducts(storedInvestments);
  }, []);

  const handleEdit = (product) => {
    sessionStorage.setItem('productToEdit', JSON.stringify(product));
    router.push('/dashboard/investimentos/editar');
  };

  const handleDelete = (productId) => {
    // Confirmação antes de deletar
    const confirmDelete = window.confirm('Tem certeza de que deseja excluir este investimento?');
    if (!confirmDelete) return;

    // Remove o produto do localStorage
    const investments = JSON.parse(localStorage.getItem('investments')) || [];
    const updatedInvestments = investments.filter(investment => investment.id !== productId);
    localStorage.setItem('investments', JSON.stringify(updatedInvestments));

    // Atualize a lista de produtos no estado
    setProducts(updatedInvestments);

    // Recarregue a página para atualizar os dados
    router.refresh();
  };

  return (
    <div className={styles.productsList}>
      <h3>Seus Produtos</h3>
      {products.length > 0 ? (
        products.map((product) => {
          const percentage = ((product.rendimento / product.valor_investido) * 100).toFixed(2);

          return (
            <div className={styles.productItem} key={product.id}>
              <span>{product.tipo_investimento} - {product.instituicao}</span>

              <div className={styles.progressContainer}>
                <span className={styles.percentageLabel}>{percentage}%</span>
                <ProgressBar now={parseFloat(percentage)} className={styles.progress} />
              </div>

              <span className={styles.productValue}>R$ {product.valor_investido.toFixed(2)}</span>

              <button className={styles.editButton} onClick={() => handleEdit(product)}>
                <img src="/edit.svg" alt="Editar" />
              </button>
              <button className={styles.deleteButton} onClick={() => handleDelete(product.id)}>
                <img src="/trash.svg" alt="Excluir" />
              </button>
            </div>
          );
        })
      ) : (
        <p>Nenhum produto encontrado.</p>
      )}
    </div>
  );
}
