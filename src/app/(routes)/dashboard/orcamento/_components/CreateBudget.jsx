"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EmojiPicker from "emoji-picker-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";

function CreateBudget({ refreshData }) {
  const [emojiIcon, setEmojiIcon] = useState("😀");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [categoria, setCategoria] = useState("");

  /**
   * Usado para criar novo orçamento
   */
  const onCreateBudget = () => {
    
    const newBudget = {
      id: Date.now(), 
      name: nome,
      amount: parseFloat(valor),
      totalSpend: 0,
      totalItem: 0,
      createdBy: "user@example.com",
      icon: emojiIcon,
      category: categoria,
    };

    
    const budgets = JSON.parse(localStorage.getItem('budgets')) || [];

    
    budgets.push(newBudget);

    
    localStorage.setItem('budgets', JSON.stringify(budgets));

    
    refreshData();

    
    toast("Novo orçamento criado!");

    
    setNome("");
    setValor("");
    setCategoria("");
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div
            className="bg-slate-100 p-10 rounded-2xl
            items-center flex flex-col border-2 border-dashed
            cursor-pointer hover:shadow-md"
          >
            <h2 className="text-3xl">+</h2>
            <h2>Criar Novo Orçamento</h2>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar Novo Orçamento</DialogTitle>
            <DialogDescription>
              <div className="mt-5">
                <Button
                  variant="outline"
                  className="text-lg"
                  onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                >
                  {emojiIcon}
                </Button>
                <div className="absolute z-20">
                  <EmojiPicker
                    open={openEmojiPicker}
                    onEmojiClick={(e) => {
                      setEmojiIcon(e.emoji);
                      setOpenEmojiPicker(false);
                    }}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Nome do Orçamento</h2>
                  <Input
                    placeholder="ex: Decoração da Casa"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Valor do Orçamento</h2>
                  <Input
                    type="number"
                    placeholder="ex: 5000 R$"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Categoria</h2>
                  <Select onValueChange={(value) => setCategoria(value)} value={categoria}>
                    <SelectTrigger>
                      {categoria || "Selecione uma categoria"}
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Casa">Casa</SelectItem>
                      <SelectItem value="Educação">Educação</SelectItem>
                      <SelectItem value="Saúde">Saúde</SelectItem>
                      <SelectItem value="Transporte">Transporte</SelectItem>
                      <SelectItem value="Lazer">Lazer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button 
                disabled={!(nome && valor && categoria)}
                onClick={() => onCreateBudget()}
                className="mt-5 w-full rounded-full"
              >
                Criar Orçamento
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateBudget;
