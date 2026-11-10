import React from 'react';
import { COMPANY_INFO } from '../data/landingData';
import { Phone, MessageCircle, Mail, MapPin, Clock, ShieldCheck, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenLeadModal: (title?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLeadModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contacts" className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand & Dealer status */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-400 text-slate-950 font-black text-xl flex items-center justify-center">
                ЕВ
              </div>
              <div>
                <div className="text-xl font-black text-white tracking-tight uppercase">
                  {COMPANY_INFO.name}
                </div>
                <div className="text-xs font-bold text-amber-400">
                  Официальный дилер DoorHan
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {COMPANY_INFO.slogan}
            </p>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5 text-xs">
              <div className="flex items-center gap-2 text-amber-400 font-semibold">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Сертифицированный партнер DoorHan с 2011 года</span>
              </div>
              <div className="text-[11px] text-slate-400">
                Более {COMPANY_INFO.completedProjects} смонтированных воротных систем. Гарантия на монтаж {COMPANY_INFO.warrantyMonths} месяца.
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Навигация
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#catalog" className="hover:text-amber-400 transition-colors">
                  Каталог продукции
                </a>
              </li>
              <li>
                <a href="#advantages" className="hover:text-amber-400 transition-colors">
                  Преимущества
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-amber-400 transition-colors">
                  Калькулятор ворот
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-amber-400 transition-colors">
                  Сэндвич-панели DoorHan
                </a>
              </li>
              <li>
                <a href="#workflow" className="hover:text-amber-400 transition-colors">
                  Этапы работы
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-amber-400 transition-colors">
                  Отзывы клиентов
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Products */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Продукция DoorHan
            </div>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Рольставни</li>
              <li>Автоматизация</li>
              <li>Противопожарные двери</li>
              <li>Секционные ворота</li>
              <li>Шлагбаумы</li>
              <li>Откатные ворота</li>
              <li>Промышленные ворота</li>
            </ul>
          </div>

          {/* Col 4: Contacts & Direct CTAs */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Связь с нами
            </div>
            <div className="space-y-2.5 text-xs">
              <a
                href={`tel:${COMPANY_INFO.phones[0].raw}`}
                className="flex items-center gap-2 text-slate-200 hover:text-amber-400 transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-semibold tabular-nums">{COMPANY_INFO.phones[0].display}</span>
              </a>

              <a
                href={`tel:${COMPANY_INFO.phones[1].raw}`}
                className="flex items-center gap-2 text-slate-200 hover:text-amber-400 transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-semibold tabular-nums">{COMPANY_INFO.phones[1].display}</span>
              </a>

              <a
                href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent('Здравствуйте! Хочу заказать ворота DoorHan.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
              >
                <MessageCircle className="w-4 h-4 shrink-0 fill-current" />
                <span>WhatsApp: +7 777 565 30 86</span>
              </a>

              <div className="flex items-center gap-2 text-slate-400">
                <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                <span>{COMPANY_INFO.email}</span>
              </div>

              <div className="flex items-start gap-2 text-slate-400">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}</span>
              </div>

              <div className="flex items-center gap-2 text-slate-400">
                <Clock className="w-4 h-4 text-slate-500 shrink-0" />
                <span>{COMPANY_INFO.workingHours}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onOpenLeadModal('Заявка на обратный звонок инженера')}
                className="w-full py-2.5 px-4 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors cursor-pointer"
              >
                Заказать обратный звонок
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            Все права защищены © 2026 Евро Ворота
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>Наверх</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
