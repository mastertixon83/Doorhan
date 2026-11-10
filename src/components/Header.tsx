import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/landingData';
import { Phone, MessageCircle, Menu, X, ShieldCheck, Mail, ArrowRight } from 'lucide-react';

interface HeaderProps {
  onOpenLeadModal: (title?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenLeadModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Каталог', href: '#catalog' },
    { label: 'Преимущества', href: '#advantages' },
    { label: 'Калькулятор', href: '#quiz-calculator' },
    { label: 'Особенности', href: '#features' },
    { label: 'Как мы работаем', href: '#workflow' },
    { label: 'Отзывы', href: '#reviews' },
    { label: 'Контакты', href: '#contacts' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all">
      {/* Top Utility Contact Bar (Desktop only to prevent mobile viewport clobbering) */}
      <div className="hidden sm:block bg-slate-900 text-slate-300 text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-4 flex-wrap justify-center md:justify-start">
            <span className="flex items-center gap-1.5 text-slate-200 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              {COMPANY_INFO.slogan}
            </span>
            <span className="hidden lg:inline text-slate-500">|</span>
            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="hidden lg:flex items-center gap-1 text-slate-300 hover:text-amber-400 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              {COMPANY_INFO.email}
            </a>
          </div>

          <div className="flex items-center gap-5">
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent('Здравствуйте! Хочу узнать стоимость ворот DoorHan.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp: +7 777 565 30 86</span>
            </a>
            <span className="hidden sm:inline text-slate-600">|</span>
            <a
              href={`tel:${COMPANY_INFO.phones[0].raw}`}
              className="hidden sm:flex items-center gap-1.5 text-white hover:text-amber-400 transition-colors tabular-nums font-semibold"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{COMPANY_INFO.phones[0].display}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar (Compact 56px on mobile, 80px on desktop) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-20 gap-4 sm:gap-6">
          {/* Brand Wordmark */}
          <a href="#" className="flex items-center gap-2.5 sm:gap-3 shrink-0 group">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-slate-950 font-black text-base sm:text-xl shadow-xs shadow-amber-500/20 group-hover:scale-105 transition-transform">
              ЕВ
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5">
                <span className="text-base sm:text-xl font-extrabold tracking-tight text-slate-900 uppercase">
                  {COMPANY_INFO.name}
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-amber-600 tracking-wider">DOORHAN</span>
              </div>
              <span className="text-[10px] sm:text-[11px] text-slate-500 leading-tight hidden xs:block">
                Воротные системы & автоматика
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-7 text-sm font-medium text-slate-700">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="hover:text-amber-600 transition-colors whitespace-nowrap cursor-pointer py-1"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA & Phone Trigger (Desktop) */}
          <div className="hidden sm:flex items-center gap-4 shrink-0">
            <div className="hidden md:flex flex-col text-right">
              <a
                href={`tel:${COMPANY_INFO.phones[1].raw}`}
                className="text-sm font-bold text-slate-900 hover:text-amber-600 transition-colors tabular-nums"
              >
                {COMPANY_INFO.phones[1].display}
              </a>
              <span className="text-[11px] text-emerald-600 font-medium flex items-center justify-end gap-1">
                Бесплатный расчет за 10 мин
              </span>
            </div>

            <button
              onClick={() => onOpenLeadModal('Заявка на бесплатный выезд замерщика')}
              className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-lg transition-colors shadow-xs cursor-pointer whitespace-nowrap min-h-[44px]"
            >
              Оставить заявку
            </button>
          </div>

          {/* Mobile Right Controls: 44px hitboxes */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => onOpenLeadModal('Заявка на бесплатный расчет')}
              className="h-10 px-3.5 text-xs font-bold text-slate-950 bg-amber-400 active:bg-amber-500 rounded-lg shadow-xs flex items-center justify-center cursor-pointer"
            >
              Заявка 0 ₸
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 flex items-center justify-center text-slate-700 hover:text-slate-950 active:bg-slate-100 rounded-lg cursor-pointer"
              aria-label="Открыть меню навигации"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-4 animate-fadeIn shadow-2xl">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            Навигация по сайту
          </div>
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-left py-2.5 px-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 active:bg-amber-50 active:text-amber-700 rounded-xl transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-1 space-y-2.5">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
              Прямая связь со специалистом
            </div>
            {COMPANY_INFO.phones.map((phone) => (
              <a
                key={phone.raw}
                href={`tel:${phone.raw}`}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 active:bg-slate-100 text-slate-900 border border-slate-200"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-600 flex items-center justify-center">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold tabular-nums">{phone.display}</div>
                    <div className="text-[11px] text-slate-500">{phone.label}</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </a>
            ))}

            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent('Здравствуйте! Хочу узнать стоимость ворот DoorHan.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3.5 text-sm font-bold text-white bg-emerald-600 active:bg-emerald-700 rounded-xl transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Написать в WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
