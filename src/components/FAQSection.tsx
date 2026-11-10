import React, { useState } from 'react';
import { FAQS, COMPANY_INFO } from '../data/landingData';
import { ChevronDown, HelpCircle, MessageCircle, Phone, ArrowRight, ShieldCheck } from 'lucide-react';

interface FAQSectionProps {
  onOpenLeadModal?: (title?: string) => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenLeadModal }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
            Часто задаваемые вопросы
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            Ответы инженера на популярные вопросы
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Всё, что нужно знать о монтаже, эксплуатации в зимний период и гарантийных обязательствах.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50/50 transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-amber-600 transition-colors cursor-pointer text-sm sm:text-base"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-amber-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-white">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Post-FAQ Objection-Handling Conversion Card */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 text-slate-900 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-xs font-bold text-amber-600 uppercase tracking-wider">
              Остались сомнения или нестандартный проем?
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
              Главный инженер бесплатно ответит на ваши вопросы
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Подскажем, какие ворота лучше подойдут под ваш климат и фундамент.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent('Здравствуйте! У меня есть технический вопрос по установке ворот DoorHan.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-colors shadow-xs"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Спросить в WhatsApp</span>
            </a>

            {onOpenLeadModal && (
              <button
                onClick={() => onOpenLeadModal('Техническая консультация инженера')}
                className="w-full sm:w-auto px-5 py-3 text-xs sm:text-sm font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors cursor-pointer"
              >
                <span>Заказать звонок</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
