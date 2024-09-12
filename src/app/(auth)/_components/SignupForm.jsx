"use client";
import { useState } from "react";
import axiosInstance from "../../../lib/axios"; // Importa a instância do axios configurada
import InputField from "./InputField";
import Button from "./Button";
import FormContainer from "./FormContainer";

export default function SignupForm() {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validações
    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }
    
    if (!validateEmail(email)) {
      setError("O email fornecido é inválido");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    // Dados a serem enviados para a API
    const userData = { 
      name: username, 
      email, 
      password 
    };

    try {
      // Solicitação POST para a API de criação de usuário usando a instância do axios
      const response = await axiosInstance.post(
        '/users', // Caminho relativo à URL base configurada
        userData
      );
      
      // Se a resposta for bem-sucedida
      setSuccess('Usuário cadastrado com sucesso');
      console.log('Success:', response.data);

      // Limpar os campos após o sucesso
      setUserName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      // Se houver erro, exibir mensagem de erro específica
      console.log(error); // Log do erro completo

      if (error.response) {
        // Erro da resposta da API
        const { status, data } = error.response;
        let errorMessage = 'Falha ao cadastrar o usuário';

        if (status === 400) {
          // Erro de requisição inválida
          errorMessage = data.message || 'Dados inválidos';
        } else if (status === 401) {
          // Erro de não autorizado
          errorMessage = 'Não autorizado. Verifique suas credenciais.';
        } else if (status === 500) {
          // Erro interno do servidor
          errorMessage = 'Erro interno do servidor. Tente novamente mais tarde.';
        }

        setError(errorMessage);
      } else {
        // Erro desconhecido
        setError('Erro desconhecido. Verifique sua conexão com a internet.');
      }
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <FormContainer>
      <div className="max-w-md mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Inscreva-se
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Já tem uma conta?{' '}
          <a href="/sign-in" className="font-medium text-indigo-600 hover:text-indigo-500">
            Faça login
          </a>
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            label="Nome Completo"
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            id="UserName"
          />
          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
          />
          <InputField
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
          />
          <InputField
            label="Confirmar Senha"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            id="confirmPassword"
          />
          <div className="flex items-center justify-between">
            <Button label="Inscrever-se" />
          </div>
          {error && <p className="text-red-600">{error}</p>}
          {success && <p className="text-green-600">{success}</p>}
        </form>
      </div>
    </FormContainer>
  );
}
