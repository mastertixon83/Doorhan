import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/landingData';
import { MessageCircle, Phone, CalendarCheck, X } from 'lucide-react';

interface FloatingActionsProps {
  onOpenLeadModal: (title?: string) => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ onOpenLeadModal }) => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-5 z-40 flex flex-col items-end gap-3 pointer-events-none">
      {/* Speech bubble badge */}
      {showTooltip && (
        <div className="pointer-events-auto bg-slate-900 text-white text-xs px-3.5 py-2 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-2 animate-bounce">
          <span className="text-amber-400 font-bold">Рассчитать стоимость ворот за 10 мин?</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-white p-0.5"
            aria-label="Закрыть"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <div className="pointer-events-auto flex items-center gap-2.5">
        {/* Quick Measurement Button */}
        <button
          onClick={() => onOpenLeadModal('Заявка на бесплатный вызов замерщика')}
          className="hidden sm:flex items-center gap-2 px-4 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold rounded-full shadow-lg shadow-amber-400/30 transition-transform hover:scale-105 cursor-pointer"
        >
          <CalendarCheck className="w-4 h-4" />
          <span>Вызвать замерщика 0 ₸</span>
        </button>

        {/* Call button */}
        <a
          href={`tel:${COMPANY_INFO.phones[1].raw}`}
          className="w-12 h-12 bg-slate-900 hover:bg-slate-800 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
          title="Позвонить нам"
        >
          <Phone className="w-5 h-5 text-amber-400" />
        </a>

        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent('Здравствуйте! Хочу узнать стоимость и заказать выезд замерщика на ворота DoorHan.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform group"
          title="Написать в WhatsApp"
        >
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-white animate-ping" />
          <MessageCircle className="w-7 h-7 fill-current" />
        </a>
      </div>
    </div>
  );
};
