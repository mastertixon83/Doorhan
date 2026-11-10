import React, { useState, useEffect, useId } from 'react';
import { COMPANY_INFO } from '../data/landingData';
import { X, CheckCircle2, ShieldAlert, Phone, Send, Sparkles } from 'lucide-react';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  defaultProduct?: string;
  onSuccess: (details: string) => void;
}

export const LeadModal: React.FC<LeadModalProps> = ({
  isOpen,
  onClose,
  title = 'Бесплатный выезд замерщика и консультация',
  defaultProduct = '',
  onSuccess,
}) => {
  const nameId = useId();
  const phoneId = useId();
  const cityId = useId();
  const commentId = useId();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Уральск');
  const [comment, setComment] = useState(defaultProduct);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  useEffect(() => {
    if (defaultProduct) {
      setComment(defaultProduct);
    }
  }, [defaultProduct]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.trim().length < 9) {
      setPhoneError('Укажите корректный номер телефона');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      onSuccess(`Модальная заявка: ${title}, Имя: ${name || 'Клиент'}, Тел: ${phone}, Город: ${city}, Комментарий: ${comment}`);
    }, 600);
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 relative">
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Закрыть"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-400/20 text-amber-300 text-[11px] font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3 h-3 text-amber-400" />
            Официальный дилер DoorHan
          </div>
          <h3 className="text-xl font-extrabold text-white leading-snug">
            {title}
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Замерщик приедет с лазерным дальномером и образцами панелей DoorHan. Выезд бесплатный.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          {isSuccess ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-slate-900">
                Заявка успешно отправлена!
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
                Специалист «Евро Ворота» свяжется с вами в течение 10–15 минут для подтверждения адреса и времени визита.
              </p>
              <div className="pt-2">
                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors cursor-pointer"
                >
                  Понятно, спасибо
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor={nameId} className="block text-xs font-semibold text-slate-700 mb-1">
                  Ваше имя
                </label>
                <input
                  id={nameId}
                  type="text"
                  placeholder="Как к вам обращаться?"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label htmlFor={phoneId} className="block text-xs font-semibold text-slate-700 mb-1">
                  Номер телефона <span className="text-red-500">*</span>
                </label>
                <input
                  id={phoneId}
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (phoneError) setPhoneError('');
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
                {phoneError && (
                  <div className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                    <ShieldAlert className="w-3 h-3" />
                    {phoneError}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor={cityId} className="block text-xs font-semibold text-slate-700 mb-1">
                    Город / Район
                  </label>
                  <select
                    id={cityId}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    {COMPANY_INFO.cities.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor={commentId} className="block text-xs font-semibold text-slate-700 mb-1">
                    Интересующий товар
                  </label>
                  <input
                    id={commentId}
                    type="text"
                    placeholder="Например, Ворота 3х2.5 м"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 text-xs sm:text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-xl transition-all shadow-md shadow-amber-400/20 cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Отправка...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Отправить заявку</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-3 pt-2 text-xs text-slate-500 border-t border-slate-100">
                <span>Или позвоните прямо сейчас:</span>
                <a
                  href={`tel:${COMPANY_INFO.phones[1].raw}`}
                  className="font-bold text-slate-900 hover:text-amber-600 transition-colors flex items-center gap-1"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-500" />
                  <span>{COMPANY_INFO.phones[1].display}</span>
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
