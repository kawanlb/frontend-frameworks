"use client"; 
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 
import InvestmentForm from '../../investimentos/_components/InvestmentFormx';

export default function EditarInvestimento() {
  const router = useRouter(); 
  const [product, setProduct] = useState(null); 

  useEffect(() => {
    
    const productToEdit = sessionStorage.getItem('productToEdit');

    if (!productToEdit) {
      
      router.replace('/investimentos'); 
    } else {
      
      setProduct(JSON.parse(productToEdit));
    }
  }, [router]); 

  if (!product) {
    
    return <p>Carregando...</p>;
  }

  return (
    <>
    <h2 className="titulo">Editando {product.tipo_investimento}</h2>
    <div>          
    <InvestmentForm mode="editar" product={product} />
    </div>
    </>
  );
}
