  "use client";
  import { useState } from "react";
  import axiosInstance from "@/api/AxiosInstance";
  import InputField from "./InputField";
  import Button from "./Button";
  import CustomLink from "./Link";
  import FormContainer from "./FormContainer"; // Importa o FormContainer

  export default function SigninForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); 

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const response = await axiosInstance.post('/auth', {
          email,
          password
        });

        const { token } = response.data;

        // Armazenar o token em um cookie com atributos apropriados, mas sem HttpOnly
        document.cookie = `authToken=${token}; path=/; Secure; SameSite=None`;

        console.log("Autenticado com sucesso:", token);

        // Redirecionar ou fazer algo após a autenticação
        // Por exemplo, redirecionar para a página inicial
        window.location.href = '/dashboard';

      } catch (error) {
        setError("Erro na autenticação. Verifique suas credenciais.");
        console.error("Erro ao autenticar:", error);
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
            />
            <InputField
              label="Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
            />
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <Button label="Entrar" />
              <CustomLink href="/change-password" label="Esqueceu sua senha?" />
            </div>
          </form>
        </div>
      </FormContainer>
    );
  }
