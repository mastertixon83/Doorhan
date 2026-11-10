import React from 'react';
import { SECTIONAL_VS_CLASSIC } from '../data/landingData';
import { ShieldCheck, Flame, Maximize2, Snowflake, VolumeX, CheckCircle } from 'lucide-react';

interface SectionalAdvantagesProps {
  onOpenLeadModal: (title?: string) => void;
}

export const SectionalAdvantages: React.FC<SectionalAdvantagesProps> = ({ onOpenLeadModal }) => {
  const highlightPoints = [
    {
      icon: Flame,
      title: 'Устройство полотна',
      desc: 'Два стальных листа с полиугольным покрытием и пенополиуретаном удерживают тепло. Защитный уплотнитель по периметру.',
    },
    {
      icon: Maximize2,
      title: 'С калиткой или окошком',
      desc: 'Калитка обеспечивает удобный проход, окно повышает обзор и добавляет свет в гараж.',
    },
    {
      icon: ShieldCheck,
      title: 'Защита от травм',
      desc: 'Возможность защиты от травм и автоматической блокировки при разрыве полотна.',
    },
    {
      icon: VolumeX,
      title: 'Плавный и тихий ход',
      desc: 'Монтаж от 3–4 часов. Изготовление под индивидуальный заказ и нестандартный проем.',
    },
  ];

  return (
    <section id="features" className="py-16 sm:py-24 bg-slate-900 text-white border-b border-slate-800 relative overflow-hidden">
      {/* Background Decorative Graphic */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
            Польза и особенности
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight text-balance">
            ПОЧЕМУ СЕКЦИОННЫЕ ВОРОТА ВЫГОДНЕЕ КЛАССИЧЕСКИХ ВОРОТ И ДРУГИХ "ЗАМЕНИТЕЛЕЙ"?
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Два стальных листа с полиугольным покрытием и пенополиуретаном удерживают тепло. Плавный и тихий ход, защита от травм и изготовление под индивидуальный размер.
          </p>
        </div>

        {/* 2-Column Comparison & Interactive Blueprint */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: Panel Anatomy / Diagram Card */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-slate-800/80 rounded-2xl border border-slate-700 p-6 sm:p-8">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Анатомия сэндвич-панели DoorHan
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-400/20 text-amber-300">
                  45 мм толщина
                </span>
              </div>

              {/* Visual Panel Layer Diagram */}
              <div className="space-y-3 my-6">
                <div className="p-3 rounded-xl bg-slate-700/60 border border-slate-600 flex items-center justify-between text-xs">
                  <span className="text-slate-300">1. Защитное полимерное покрытие (любой цвет RAL)</span>
                  <span className="text-amber-400 font-bold">25 мкм</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-700/60 border border-slate-600 flex items-center justify-between text-xs">
                  <span className="text-slate-300">2. Оцинкованный стальной лист повышенной прочности</span>
                  <span className="text-amber-400 font-bold">0.45 мм</span>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/40 text-xs">
                  <div className="font-bold text-amber-300 mb-1">
                    3. Пенополиуретан высокой плотности (без CFC)
                  </div>
                  <div className="text-slate-300 text-[11px] leading-relaxed">
                    Плотность 46–47 кг/м³. Заполняет весь объем без пустот, предотвращая расслоение и мостики холода при любых перепадах температур.
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-700/60 border border-slate-600 flex items-center justify-between text-xs">
                  <span className="text-slate-300">4. Замкнутый контур с терморазрывом</span>
                  <span className="text-emerald-400 font-bold">Без промерзания</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-700/80">
              <div className="flex items-center gap-3 text-xs text-slate-300">
                <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
                <span>
                  Заводская гарантия DoorHan от сквозной коррозии полотна — <strong className="text-white">10 лет</strong>.
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Comparative Advantages Grid */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlightPoints.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-800/50 border border-slate-700/70 hover:border-amber-500/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center mb-3">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-white mb-1.5">{item.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* In-depth list */}
            <div className="p-6 rounded-2xl bg-slate-800/30 border border-slate-800 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Ключевые преимущества в повседневной эксплуатации:
              </div>
              {SECTIONAL_VS_CLASSIC.map((adv, aIdx) => (
                <div key={aIdx} className="flex items-start gap-3 text-xs text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">{adv.title}</strong> — {adv.description}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick CTA */}
            <div className="pt-2 flex items-center justify-between flex-wrap gap-4">
              <div className="text-xs text-slate-400">
                Хотите увидеть образцы панелей и текстур вживую?
              </div>
              <button
                onClick={() => onOpenLeadModal('Вызов замерщика с образцами панелей DoorHan')}
                className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors cursor-pointer"
              >
                Пригласить инженера с образцами
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
