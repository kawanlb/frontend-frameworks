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
import { toast } from "sonner";

// Função simulada para criar orçamento
const createBudgetMock = async (name, amount, createdBy, icon) => {
  // Simula uma resposta de banco de dados
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ insertedId: Math.floor(Math.random() * 1000) });
    }, 500);
  });
};

function CreateBudget({ refreshData }) {
  const [emojiIcon, setEmojiIcon] = useState("😀");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");

  /**
   * Usado para criar novo orçamento
   */
  const onCreateBudget = async () => {
    // Dados falsos simulando a criação do orçamento
    const result = await createBudgetMock(nome, valor, "user@example.com", emojiIcon);

    if (result) {
      refreshData();
      toast("Novo orçamento criado!");
    }
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
                    onChange={(e) => setNome(e.target.value)}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Valor do Orçamento</h2>
                  <Input
                    type="number"
                    placeholder="ex: 5000 R$"
                    onChange={(e) => setValor(e.target.value)}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button 
                disabled={!(nome && valor)}
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
