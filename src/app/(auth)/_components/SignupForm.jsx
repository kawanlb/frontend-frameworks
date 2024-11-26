  "use client";
  import { useState } from "react";
  import axiosInstance from "@/api/AxiosInstance";
  import InputField from "./InputField";
  import Button from "./Button";
  import FormContainer from "./FormContainer";
  import { useRouter } from 'next/navigation';

  export default function SignupForm() {
    const router = useRouter();

    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const validateEmail = (email) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null);
      setSuccess(null);
      setIsLoading(true); 

      
      if (password !== confirmPassword) {
        setError("As senhas não coincidem");
        setIsLoading(false); 
        return;
      }

      if (!validateEmail(email)) {
        setError("O email fornecido é inválido");
        setIsLoading(false); 
        return;
      }

      if (password.length < 6) {
        setError("A senha deve ter pelo menos 6 caracteres");
        setIsLoading(false); 
        return;
      }

      const userData = { 
        name: username, 
        email, 
        password 
      };

      try {
        const response = await axiosInstance.post('/users', userData);
        setSuccess('Usuário cadastrado com sucesso');
        setUserName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');

        setTimeout(() => {
          router.push('/sign-in');
        }, 2000);

      } catch (error) {
        if (error.response) {
          const { status, data } = error.response;
          let errorMessage = 'Falha ao cadastrar o usuário';

          if (status === 400) {
            errorMessage = data.message || 'Dados inválidos';
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
      } finally {  }
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
              disabled={isLoading}
              id="UserName"
            />
            <InputField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              id="email"
            />
            <InputField
              label="Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              id="password"
            />
            <InputField
              label="Confirmar Senha"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading}
              id="confirmPassword"
            />
            <div className="flex items-center justify-between">
              <Button label="Inscrever-se" isLoading={isLoading} />
            </div>
            {error && <p className="text-red-600">{error}</p>}
            {success && <p className="text-green-600">{success}</p>}
          </form>
        </div>
      </FormContainer>
    );
  }
