"use client";
import { useState } from "react";
import InputField from "./InputField";
import Button from "./Button";
import FormContainer from "./FormContainer"; 

export default function SignupForm() {
  const [username, setUserName] = useState ('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("As senhas não coincidem");
      return;
    }
    console.log("Submitted:", { username,  email, password });
  };

  return (
    <FormContainer> {/* Usa o FormContainer diretamente */}
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
          
  
          
          InputField/>

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
        </form>
      </div>
    </FormContainer>
  );
}
