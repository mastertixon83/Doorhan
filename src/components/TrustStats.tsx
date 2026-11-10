import React from 'react';
import { TRUST_ADVANTAGES } from '../data/landingData';
import { Award, TrendingDown, Clock, ShieldCheck, Check } from 'lucide-react';

interface TrustStatsProps {
  onOpenLeadModal: (title?: string) => void;
}

export const TrustStats: React.FC<TrustStatsProps> = ({ onOpenLeadModal }) => {
  const icons = [Award, TrendingDown, Clock, ShieldCheck];

  return (
    <section id="advantages" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-2">
            Факты и преимущества
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            Почему секционные ворота заказывают в "Евро Ворота"
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Мы берем на себя полный цикл: от бесплатного замера и согласования прозрачной сметы до профессионального монтажа с гарантией 24 месяца.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {TRUST_ADVANTAGES.map((adv, index) => {
            const IconComponent = icons[index % icons.length];
            return (
              <div
                key={adv.id}
                className="relative flex flex-col justify-between p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-400/10 text-amber-600 flex items-center justify-center group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-slate-900 tabular-nums">
                        {adv.stat}
                      </div>
                      <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                        {adv.substat}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-amber-700 transition-colors">
                    {adv.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {adv.description}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-200/80 flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Гарантировано договором</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Banner with Direct Callout */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-amber-400 font-bold text-sm uppercase tracking-wider">
              Бесплатная консультация инженера
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-white">
              Не уверены, какой тип ворот лучше подойдет для вашего проема?
            </div>
            <p className="text-sm text-slate-300 max-w-2xl">
              Специалист рассчитает ветровую нагрузку, учтет особенности грунта и порекомендует оптимальную автоматику под ваш бюджет.
            </p>
          </div>

          <button
            onClick={() => onOpenLeadModal('Консультация инженера по подбору ворот')}
            className="px-6 py-3.5 text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-xl transition-colors cursor-pointer shrink-0 shadow-sm"
          >
            Получить консультацию
          </button>
        </div>
      </div>
    </section>
  );
};
