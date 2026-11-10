import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/landingData';
import { Phone, MessageCircle, MapPin, Clock, Menu, X, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onOpenLeadModal: (title?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenLeadModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Каталог', href: '#catalog' },
    { label: 'Преимущества', href: '#advantages' },
    { label: 'Калькулятор', href: '#calculator' },
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
      {/* Top Utility Contact Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-4 flex-wrap justify-center md:justify-start">
            <span className="flex items-center gap-1.5 text-slate-200 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              {COMPANY_INFO.status}
            </span>
            <span className="hidden lg:inline text-slate-500">|</span>
            <span className="hidden lg:flex items-center gap-1 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              Доставка и монтаж по всему Казахстану
            </span>
            <span className="hidden xl:inline text-slate-500">|</span>
            <span className="hidden xl:flex items-center gap-1 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {COMPANY_INFO.workingHours}
            </span>
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

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-6">
          {/* Brand Wordmark */}
          <a href="#" className="flex items-center gap-3 shrink-0 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-slate-950 font-black text-xl shadow-sm shadow-amber-500/20 group-hover:scale-105 transition-transform">
              ЕВ
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 uppercase">
                  {COMPANY_INFO.name}
                </span>
                <span className="text-xs font-bold text-amber-600 tracking-wider">DOORHAN</span>
              </div>
              <span className="text-[11px] text-slate-500 leading-tight">
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

          {/* CTA & Phone Trigger */}
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
              className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-lg transition-colors shadow-sm cursor-pointer whitespace-nowrap"
            >
              Оставить заявку
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => onOpenLeadModal('Заявка на бесплатный расчет')}
              className="px-3 py-1.5 text-xs font-semibold text-slate-950 bg-amber-400 rounded-md"
            >
              Заявка
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-md"
              aria-label="Меню"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 animate-fadeIn">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-left py-2 px-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-amber-600 rounded-md"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 space-y-2">
            <div className="text-xs text-slate-500">Прямые телефоны:</div>
            {COMPANY_INFO.phones.map((phone) => (
              <a
                key={phone.raw}
                href={`tel:${phone.raw}`}
                className="flex items-center gap-2 text-sm font-bold text-slate-900 py-1"
              >
                <Phone className="w-4 h-4 text-amber-500" />
                <span>{phone.display}</span>
                <span className="text-xs font-normal text-slate-500">({phone.label})</span>
              </a>
            ))}
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors mt-2"
            >
              <MessageCircle className="w-4 h-4" />
              Написать в WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
