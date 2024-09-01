import React from 'react';
import styles from '../styles/components/NewInvestmentButton.module.css';
import { Button } from '@chakra-ui/react';
import Link from 'next/link';

export default function NewInvestmentButton() {
  return (
    <Link href="/investimentos/adicionar" passHref>
      <Button colorScheme="purple" className={styles.newInvestmentButton}>
        Novo Investimento
      </Button>
    </Link>
  );
}
