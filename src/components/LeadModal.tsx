import React, { useState, useEffect, useId } from 'react';
import { COMPANY_INFO } from '../data/landingData';
import { formatKazakhstanPhone, isValidKazakhstanPhone } from '../utils/phoneFormatter';
import {
  X,
  CheckCircle2,
  ShieldAlert,
  Phone,
  Send,
  Sparkles,
  MessageCircle,
  ShieldCheck,
  Clock,
} from 'lucide-react';

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

  const handlePhoneChange = (val: string) => {
    const formatted = formatKazakhstanPhone(val);
    setPhone(formatted);
    if (phoneError) setPhoneError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !isValidKazakhstanPhone(phone)) {
      setPhoneError('Пожалуйста, укажите полный номер: +7 (XXX) XXX-XX-XX');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      onSuccess(
        `Модальная заявка: ${title}, Имя: ${name || 'Клиент'}, Тел: ${phone}, Город: ${city}, Комментарий: ${comment}`
      );
    }, 500);
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] sm:max-h-none flex flex-col animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Pull Handle */}
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto my-2.5 sm:hidden shrink-0" />

        {/* Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 relative shrink-0">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-11 h-11 flex items-center justify-center rounded-full text-slate-400 hover:text-white hover:bg-slate-800 active:bg-slate-700 transition-colors cursor-pointer"
            aria-label="Закрыть окно"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-amber-400/20 text-amber-300 text-[11px] font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3 h-3 text-amber-400" />
            Официальный дилер DoorHan
          </div>
          <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug pr-8">
            {title}
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Замерщик приедет с лазерным дальномером и каталогом панелей. Выезд 0 ₸.
          </p>
        </div>

        {/* Content Body (Scrollable if viewport is small) */}
        <div className="p-5 sm:p-8 overflow-y-auto max-h-[calc(92vh-100px)] sm:max-h-none pb-8 sm:pb-8">
          {isSuccess ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-slate-900">Заявка успешно отправлена!</h4>
              <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
                Специалист «Евро Ворота» свяжется с вами по номеру{' '}
                <strong className="text-slate-900">{phone}</strong> в течение 10–15 минут для подтверждения адреса и времени визита.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(`Здравствуйте! Я отправил заявку: ${title}. Мой номер ${phone}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-3 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-colors inline-flex items-center justify-center gap-1.5 min-h-[44px]"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Открыть чат в WhatsApp</span>
                </a>
                <button
                  onClick={handleClose}
                  className="w-full sm:w-auto px-6 py-3 text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors cursor-pointer min-h-[44px]"
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
                  className="w-full px-3.5 py-3 rounded-xl border border-slate-300 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor={phoneId} className="block text-xs font-semibold text-slate-700">
                    Номер телефона / WhatsApp <span className="text-red-500">*</span>
                  </label>
                  {isValidKazakhstanPhone(phone) && (
                    <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Корректно
                    </span>
                  )}
                </div>
                <input
                  id={phoneId}
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  value={phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  className={`w-full px-3.5 py-3 rounded-xl border text-base sm:text-sm focus:outline-none focus:ring-2 ${
                    phoneError
                      ? 'border-red-400 focus:ring-red-400 bg-red-50/20'
                      : 'border-slate-300 focus:ring-amber-500'
                  }`}
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
                    className="w-full p-3 rounded-xl border border-slate-300 text-base sm:text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                  >
                    {COMPANY_INFO.cities.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
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
                    className="w-full p-3 rounded-xl border border-slate-300 text-base sm:text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-4 text-sm font-extrabold text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-xl transition-all shadow-md shadow-amber-400/20 cursor-pointer flex items-center justify-center gap-2 min-h-[48px]"
              >
                {isSubmitting ? (
                  <span>Отправка данных...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Рассчитать стоимость и заказать замер 0 ₸</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-3 text-[11px] text-slate-500 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Без спама
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  Звонок за 10 минут
                </span>
                <span>·</span>
                <span>Выезд 0 ₸</span>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 pt-3 text-xs text-slate-500 border-t border-slate-100">
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(`Здравствуйте! Интересует: ${comment || 'Ворота DoorHan'}. Прошу рассчитать стоимость.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto font-bold text-emerald-600 hover:text-emerald-700 flex items-center justify-center sm:justify-start gap-1 py-1.5 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Написать сразу в WhatsApp</span>
                </a>

                <a
                  href={`tel:${COMPANY_INFO.phones[1].raw}`}
                  className="w-full sm:w-auto font-bold text-slate-900 hover:text-amber-600 transition-colors flex items-center justify-center sm:justify-end gap-1 py-1.5"
                >
                  <Phone className="w-4 h-4 text-amber-500" />
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
