import React, { useState, useId } from 'react';
import { COMPANY_INFO } from '../data/landingData';
import { ShieldCheck, Gift, CheckCircle2, Phone, Calendar, ArrowRight, ShieldAlert } from 'lucide-react';

interface LeadCaptureSectionProps {
  onSuccessLead: (details: string) => void;
}

export const LeadCaptureSection: React.FC<LeadCaptureSectionProps> = ({ onSuccessLead }) => {
  const nameId = useId();
  const phoneId = useId();
  const typeId = useId();
  const cityId = useId();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [gateType, setGateType] = useState('Секционные гаражные ворота');
  const [city, setCity] = useState('Уральск');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.trim().length < 9) {
      setErrorMessage('Пожалуйста, введите ваш контактный номер телефона');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      onSuccessLead(`Лид-магнит (Бесплатный замер): ${name || 'Клиент'}, тел: ${phone}, тип: ${gateType}, город: ${city}`);
    }, 600);
  };

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="bg-slate-800/90 border border-slate-700/80 rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl backdrop-blur-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Copy & Bonuses */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <Gift className="w-3.5 h-3.5" />
                Специальное предложение месяца
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight text-balance">
                Вызовите инженера-замерщика бесплатно и зафиксируйте скидку 10% на монтаж
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                Точный замер исключит любые ошибки при заказе полотна. Специалист приедет с лазерным дальномером, образцами панелей и палитрой RAL в удобное для вас время.
              </p>

              {/* 4 Value Bullets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-200">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-700/60">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Выезд 0 ₸</strong> по Уральску и пригороду (без скрытых оплат)
                  </span>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-700/60">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Каталог панелей</strong> — потрогайте фактуру и цвет вживую
                  </span>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-700/60">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>3 варианта сметы</strong> (эконом, стандарт, премиум)
                  </span>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-700/60">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Гарантия 24 мес.</strong> на выполненные работы по договору
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400 pt-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Официальный дилер DoorHan. Никаких наценок перекупщиков.</span>
              </div>
            </div>

            {/* Right Form Card */}
            <div className="lg:col-span-5 bg-white text-slate-900 p-6 sm:p-8 rounded-2xl shadow-xl">
              {isSubmitted ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Заявка принята!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-xs mx-auto">
                    Спасибо! Наш инженер свяжется с вами в течение 10–15 минут для согласования точного времени замера.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs text-amber-600 font-bold hover:underline pt-2 inline-block cursor-pointer"
                  >
                    Отправить еще одну заявку
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-slate-900">
                      Записаться на бесплатный замер
                    </h3>
                    <p className="text-xs text-slate-500">
                      Заполните форму, и мы перезвоним для согласования времени
                    </p>
                  </div>

                  <div>
                    <label htmlFor={nameId} className="block text-xs font-semibold text-slate-700 mb-1">
                      Ваше имя
                    </label>
                    <input
                      id={nameId}
                      type="text"
                      placeholder="Например, Ерлан"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
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
                        if (errorMessage) setErrorMessage('');
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      required
                    />
                    {errorMessage && (
                      <div className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                        <ShieldAlert className="w-3 h-3" />
                        {errorMessage}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor={typeId} className="block text-xs font-semibold text-slate-700 mb-1">
                        Что требуется?
                      </label>
                      <select
                        id={typeId}
                        value={gateType}
                        onChange={(e) => setGateType(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
                      >
                        <option value="Секционные гаражные ворота">Секционные гаражные</option>
                        <option value="Откатные въездные ворота">Откатные въездные</option>
                        <option value="Защитные рольставни">Рольставни</option>
                        <option value="Автоматический шлагбаум">Шлагбаум Barrier</option>
                        <option value="Комплект автоматики">Комплект автоматики</option>
                        <option value="Противопожарные двери">Противопожарные двери</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor={cityId} className="block text-xs font-semibold text-slate-700 mb-1">
                        Город
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
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-4 text-xs sm:text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-xl transition-all shadow-md shadow-amber-400/20 cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Отправка данных...</span>
                    ) : (
                      <>
                        <span>Вызвать замерщика бесплатно</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="text-[11px] text-slate-500 text-center">
                    Выезд не обязывает к покупке. Вы получите расчет и консультацию специалиста.
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
