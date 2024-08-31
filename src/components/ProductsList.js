import React from 'react';
import styles from '../styles/components/ProductsList.module.css';
import { ProgressBar } from 'react-bootstrap';

export default function ProductsList({ products }) {
  return (
    <div className={styles.productsList}>
      <h3>Seus Produtos</h3>
      {products.map((product) => {
        // Calcula a porcentagem de ROI
        const percentage = ((product.rendimento / product.valor_investido) * 100).toFixed(2);

        return (
          <div className={styles.productItem} key={product.id}>
            <span>{product.tipo_investimento} - {product.instituicao}</span>
            <ProgressBar now={percentage} label={`${percentage}%`} />
            <span className={styles.productValue}>R$ {product.valor_investido.toFixed(2)}</span>
          </div>
        );
      })}
    </div>
  );
}
