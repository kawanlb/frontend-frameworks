"use client"; 
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import { ProgressBar } from 'react-bootstrap';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import styles from '../_styles/ProductsList.module.css';


export default function ProductsList({ products }) {
  const router = useRouter(); 

  useEffect(() => {
    sessionStorage.removeItem('productToEdit');
  }, []);

  const handleEdit = (product) => {
    sessionStorage.setItem('productToEdit', JSON.stringify(product));
    router.push('/dashboard/investimentos/editar');
  };

  const handleDelete = (productId) => {
    console.log(`Excluir produto com ID: ${productId}`);
  };

  return (
    <div className={styles.productsList}>
      <h3>Seus Produtos</h3>
      {products.map((product) => {
        const percentage = ((product.rendimento / product.valor_investido) * 100).toFixed(2);

        return (
          <div className={styles.productItem} key={product.id}>
            <span>{product.tipo_investimento} - {product.instituicao}</span>

            <div className={styles.progressContainer}>
              <span className={styles.percentageLabel}>{percentage}%</span>
              <ProgressBar now={percentage} className={styles.progress} />
            </div>

            <span className={styles.productValue}>R$ {product.valor_investido.toFixed(2)}</span>

            {/* Referenciando as imagens diretamente da pasta public */}
            <button className={styles.editButton} onClick={() => handleEdit(product)}>
              <img src="/edit.svg" alt="Editar" />
            </button>
            <button className={styles.deleteButton} onClick={() => handleDelete(product.id)}>
              <img src="/trash.svg" alt="Excluir" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
