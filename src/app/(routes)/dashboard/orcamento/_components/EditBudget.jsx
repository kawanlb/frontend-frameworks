import React, { useState, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

function EditBudget({ budgetInfo, refreshData, onClose }) {
  const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon);
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState(budgetInfo?.name || "");
  const [amount, setAmount] = useState(budgetInfo?.amount || "");
  const [category, setCategory] = useState(budgetInfo?.category || "");

  useEffect(() => {
    if (budgetInfo) {
      setEmojiIcon(budgetInfo?.icon);
      setAmount(budgetInfo.amount);
      setName(budgetInfo.name);
      setCategory(budgetInfo.category);
    }
  }, [budgetInfo]);

  const onUpdateBudget = () => {
    // Função para atualizar o orçamento
    const budgets = JSON.parse(localStorage.getItem('budgets')) || [];
    const updatedBudgets = budgets.map(b => 
      b.id === budgetInfo.id ? { ...b, name, amount, icon: emojiIcon, category } : b
    );
    localStorage.setItem('budgets', JSON.stringify(updatedBudgets));
    refreshData();
    toast("Orçamento atualizado!");
    onClose();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Atualizar Orçamento</DialogTitle>
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
                  placeholder="e.g. Home Decor"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mt-2">
                <h2 className="text-black font-medium my-1">Valor do Orçamento</h2>
                <Input
                  type="number"
                  value={amount}
                  placeholder="e.g. 5000$"
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="mt-2">
                <h2 className="text-black font-medium my-1">Categoria</h2>
                <Select onValueChange={(value) => setCategory(value)} value={category}>
                  <SelectTrigger>
                    {category || "Selecione uma categoria"}
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
              disabled={!(name && amount && category)}
              onClick={onUpdateBudget}
              className="mt-5 w-full rounded-full"
            >
              Atualizar Orçamento
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditBudget;
