"use client";
import { useState } from "react";
import axiosInstance from "@/api/AxiosInstance";
import InputField from "./InputField";
import Button from "./Button";
import CustomLink from "./Link";
import FormContainer from "./FormContainer";
import { useRouter } from 'next/navigation';

export default function SigninForm() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true); 

    if (!validateEmail(email)) {
      setError("O email fornecido é inválido");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.post('/auth', {
        email,
        password
      });

      const { token } = response.data;
      document.cookie = `authToken=${token}; path=/; Secure; SameSite=None`;

    window.location.href = '/dashboard' ;
      setEmail('');
      setPassword('');

    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        let errorMessage = 'Falha ao autenticar';

        if (status === 400) {
          errorMessage = data.message || 'Credenciais inválidas';
        } else if (status === 401) {
          errorMessage = 'Não autorizado. Verifique suas credenciais.';
        } else if (status === 500) {
          errorMessage = 'Erro interno do servidor. Tente novamente mais tarde.';
        }

        setError(errorMessage);
      } else {
        setError('Erro desconhecido. Verifique sua conexão com a internet.');
      }

      console.error('Error:', error.response ? error.response.data : error.message);
      setIsLoading(false);
    }
  };

  return (
    <FormContainer>
      <div className="max-w-md mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Bem-vindo de volta
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Não tem uma conta?{' '}
          <a href="/sign-up" className="font-medium text-indigo-600 hover:text-indigo-500">
            Inscreva-se
          </a>
        </p>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            disabled={isLoading} 
          />
          <InputField
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            disabled={isLoading} 
          />
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <Button label="Entrar" isLoading={isLoading} />
            <CustomLink href="/change-password" label="Esqueceu sua senha?" />
          </div>
        </form>
      </div>
    </FormContainer>
  );
}
