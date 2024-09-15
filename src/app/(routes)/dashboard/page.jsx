'use client'

import React, { useEffect, useState } from "react";
import { verifyToken } from "../../api/VerifyToken"; // Certifique-se de que o caminho está correto

export default function Dashb() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

 // useEffect(() => {
   // const checkToken = async () => {
      //try {
     //   await verifyToken();
       // setIsAuthenticated(true); // Se o token for válido, permitir acesso
      //} catch (error) {
       // console.error("Erro ao verificar token:", error);
        //setIsAuthenticated(false); // Caso o token não seja válido, impedir acesso
      //}
    //};

    //checkToken();
  //}, []);

  if (!isAuthenticated) {
    // Mostrar um loader ou mensagem enquanto o token está sendo verificado
    return <p>Verificando autenticidade...</p>;
  }

  return (
    <div>
      <h1>Bem-vindo ao dashboard</h1>
      <p>Conteúdo protegido e acessível apenas para usuários autenticados.</p>
    </div>
  );
}
