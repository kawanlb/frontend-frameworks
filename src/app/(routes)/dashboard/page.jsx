"use client"

import React, { useEffect, useState } from "react";
import { checkAuthentication } from "../../../api/VerifyAuth"; // Importa o authGuard

export default function Dashboard() {

  useEffect(() => {
    const authenticateUser = async () => {
      await checkAuthentication(); // Verifica se o usuário está autenticado
    };

    authenticateUser(); // Chama a função para verificar a autenticação ao montar o componente
  }, []);

  // Se o usuário estiver autenticado, exibe o dashboard
  return (
    <div>
      <h1>Bem-vindo ao dashboard</h1>
    </div>
  );
}
