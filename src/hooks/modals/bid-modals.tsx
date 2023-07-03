import { useState } from 'react';
import { Item } from '../../interfaces';

export const useBidModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [item, setItem] = useState<Item | null>(null);
  const open = (item: Item) => {
    setItem(item);
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    open,
    item,
    close,
  };
};
