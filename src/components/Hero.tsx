import React from 'react';
import { COMPANY_INFO } from '../data/landingData';
import {
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Wrench,
  Percent,
  Layers,
  ArrowRight,
  Sparkles,
  Phone,
  MessageCircle,
} from 'lucide-react';

interface HeroProps {
  onOpenLeadModal: (title?: string) => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenLeadModal, onScrollToSection }) => {
  const quickCategories = [
    { id: 'roller', label: 'Рольставни', icon: ShieldCheck, tag: 'Окна, витрины, сантехника' },
    { id: 'automation', label: 'Автоматизация', icon: Wrench, tag: 'Приводы & Пульты' },
    { id: 'fire-doors', label: 'Противопожарные двери', icon: Percent, tag: 'Сертификат EI-60' },
    { id: 'sectional', label: 'Секционные ворота', icon: Layers, tag: 'Гаражные & Промышленные' },
    { id: 'barrier', label: 'Шлагбаумы', icon: Calendar, tag: 'КПП & Парковки' },
    { id: 'sliding', label: 'Откатные ворота', icon: CheckCircle2, tag: 'Въездные консольные' },
  ];

  return (
    <section className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white overflow-hidden pt-6 pb-14 sm:pt-8 sm:pb-16 lg:pt-14 lg:pb-24">
      {/* Background Subtle Grid Accent */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Ambient warm glow behind hero visual */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">
          {/* Left Column: Sales Copy & CTAs */}
          <div className="lg:col-span-7 flex flex-col space-y-5 sm:space-y-6">
            {/* Dealer Badge */}
            <div className="inline-flex items-center gap-2 self-start px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-amber-400 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>Официальный дилер фирмы DoorHan в Казахстане</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold text-white tracking-tight leading-[1.2] text-balance">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
                DoorHan
              </span>{' '}
              — Официальный дилер фирмы Дорхан в Казахстане
            </h1>

            {/* Subtitle / Value Proposition */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Доставка, монтаж, цены от производителя! Мы работаем по всему Казахстану. Устанавливаем откатные и секционные ворота с 2011 года. Всего установлено 142 комплекта ворот. Гарантия на монтаж — 24 месяца!
            </p>

            {/* Key Trust Checkmarks (2x2 on mobile, 4 columns on sm) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 border-y border-slate-800/80 py-3.5 sm:py-4 text-xs sm:text-sm text-slate-200">
              <div className="flex flex-col bg-slate-800/30 p-2 sm:p-0 rounded-lg sm:bg-transparent">
                <span className="text-amber-400 font-extrabold text-base sm:text-xl tabular-nums">0 ₸</span>
                <span className="text-slate-400 text-[11px] sm:text-xs">Выезд замерщика</span>
              </div>
              <div className="flex flex-col bg-slate-800/30 p-2 sm:p-0 rounded-lg sm:bg-transparent">
                <span className="text-amber-400 font-extrabold text-base sm:text-xl tabular-nums">от 1 дня</span>
                <span className="text-slate-400 text-[11px] sm:text-xs">Монтаж под ключ</span>
              </div>
              <div className="flex flex-col bg-slate-800/30 p-2 sm:p-0 rounded-lg sm:bg-transparent">
                <span className="text-amber-400 font-extrabold text-base sm:text-xl tabular-nums">24 мес.</span>
                <span className="text-slate-400 text-[11px] sm:text-xs">Гарантия по договору</span>
              </div>
              <div className="flex flex-col bg-slate-800/30 p-2 sm:p-0 rounded-lg sm:bg-transparent">
                <span className="text-amber-400 font-extrabold text-base sm:text-xl tabular-nums">142</span>
                <span className="text-slate-400 text-[11px] sm:text-xs">Сданных объекта</span>
              </div>
            </div>

            {/* Action Row Optimized for Mobile Thumb Reach */}
            <div className="flex flex-col gap-2.5 pt-1 sm:pt-2">
              {/* Primary Action Button (Full Width on Mobile) */}
              <button
                onClick={() => {
                  const el = document.getElementById('quiz-calculator');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    onScrollToSection('quiz-calculator');
                  }
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 text-sm sm:text-base font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-xl transition-all shadow-lg shadow-amber-500/20 active:scale-[0.99] cursor-pointer group whitespace-nowrap min-h-[48px]"
              >
                <span>Рассчитать стоимость ворот</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* 2-Column Secondary Row on Mobile, Inline on Desktop */}
              <div className="grid grid-cols-2 sm:flex sm:flex-row gap-2 sm:gap-3">
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent('Здравствуйте! Хочу узнать стоимость и заказать ворота DoorHan.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-3 sm:py-4 text-xs sm:text-base font-semibold text-white bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 rounded-xl transition-colors cursor-pointer shadow-sm whitespace-nowrap min-h-[44px]"
                >
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 fill-current shrink-0" />
                  <span>WhatsApp</span>
                </a>

                <button
                  onClick={() => onOpenLeadModal('Заявка на бесплатный выезд замерщика')}
                  className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-3 sm:py-4 text-xs sm:text-base font-semibold text-white bg-slate-800 hover:bg-slate-700 active:bg-slate-800 border border-slate-700 rounded-xl transition-colors cursor-pointer whitespace-nowrap min-h-[44px]"
                >
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
                  <span>Замерщик 0 ₸</span>
                </button>
              </div>
            </div>

            {/* Direct Phone & Slogan Note */}
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap text-xs text-slate-300 pt-1">
              <a
                href={`tel:${COMPANY_INFO.phones[1].raw}`}
                className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-semibold transition-colors tabular-nums min-h-[36px]"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{COMPANY_INFO.phones[1].display}</span>
                <span className="text-slate-400 font-normal hidden xs:inline">(Прямой звонок)</span>
              </a>
              <span className="text-slate-600 hidden sm:inline">|</span>
              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span className="line-clamp-1">{COMPANY_INFO.slogan}</span>
              </span>
            </div>
          </div>

          {/* Right Column: Visual Anchor */}
          <div className="lg:col-span-5 relative mt-2 lg:mt-0">
            <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-800 group">
              <img
                src="/images/hero_doorhan_sectional_gate_1794298110073.jpg"
                alt="Секционные гаражные ворота DoorHan установленные на объекте"
                className="w-full h-[240px] sm:h-[380px] lg:h-[460px] object-cover group-hover:scale-102 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

              {/* Floating Engineering Badges */}
              <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md border border-slate-700 text-xs px-2.5 py-1.5 rounded-lg text-slate-200 shadow-md">
                <span className="font-bold text-amber-400 block sm:inline">Сэндвич-панели 45 мм</span>
                <span className="text-[10px] text-slate-400 sm:ml-1.5 block sm:inline">Тепло до -40°C</span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 bg-slate-900/95 backdrop-blur-md border border-slate-700/80 p-3 sm:p-4 rounded-xl shadow-lg">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                      DH
                    </div>
                    <div>
                      <div className="font-bold text-white text-xs sm:text-sm">Гаражные ворота DoorHan</div>
                      <div className="text-[10px] sm:text-[11px] text-slate-400">Монтаж за 1 день · Уральск</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-emerald-500/20 text-emerald-400 font-semibold text-[10px] sm:text-[11px] shrink-0">
                    Сдано в срок
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Product Category Strip */}
        <div className="mt-10 sm:mt-14 pt-6 sm:pt-8 border-t border-slate-800">
          <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-3 sm:mb-4 text-center md:text-left">
            Основные направления продукции DoorHan в Казахстане:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
            {quickCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onScrollToSection('catalog')}
                className="flex flex-col items-start p-3 sm:p-3.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 active:bg-slate-700 border border-slate-700/60 hover:border-amber-500/50 transition-all text-left cursor-pointer group min-h-[64px]"
              >
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center mb-1.5 sm:mb-2 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
                  <cat.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <span className="font-bold text-xs text-slate-100 group-hover:text-amber-400 transition-colors line-clamp-1">
                  {cat.label}
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">
                  {cat.tag}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
