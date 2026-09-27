import React from 'react';
import { X, ShieldCheck } from 'lucide-react';

export const LegalModal = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl max-h-[85vh] bg-[#faf6f0] text-stone-800 rounded-2xl shadow-2xl border border-stone-300/80 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho do Modal com Tom Castanho Madeira e Título em Serif */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#5D4A3A] text-white border-b border-stone-700/40">
          <div className="flex items-center space-x-2.5">
            <ShieldCheck className="h-5 w-5 text-[#b5895a]" />
            <h3 className="text-lg font-bold font-serif tracking-wide text-stone-100">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-stone-300 hover:text-white hover:bg-stone-700/50 transition-colors focus:outline-none"
            aria-label="Fechar modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Conteúdo do Modal em Sans-Serif Limpo */}
        <div className="p-6 overflow-y-auto space-y-4 text-sm leading-relaxed text-stone-700 font-sans">
          {content}
        </div>

        {/* Rodapé do Modal com Botão no Tom #5D4A3A e Hover em #b5895a */}
        <div className="px-6 py-4 bg-stone-200/60 border-t border-stone-300/60 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#5D4A3A] hover:bg-[#b5895a] text-white text-sm font-bold rounded-xl shadow-md transition-all duration-200 transform hover:scale-[1.02]"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};