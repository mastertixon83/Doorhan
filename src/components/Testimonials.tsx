import React from 'react';
import { REVIEWS } from '../data/landingData';
import { Star, MapPin, Quote, ShieldCheck } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section id="reviews" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-2">
            Реальные истории и кейсы клиентов
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            Что говорят владельцы домов и бизнеса о нашей работе
          </h2>
          <p className="mt-3 text-base text-slate-600">
            За 15 лет работы мы установили более 140 комплектов ворот и рольставен DoorHan. Вот реальный опыт тех, кто уже пользуется нашими конструкциями.
          </p>
        </div>

        {/* 3 Real Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="flex flex-col justify-between bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs hover:shadow-md transition-shadow relative"
            >
              <div>
                {/* Top Rating & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-300" />
                </div>

                {/* Comment Text */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-6">
                  «{review.comment}»
                </p>
              </div>

              {/* Author & Object Metadata */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 leading-tight">
                      {review.author}
                    </h3>
                    <div className="text-[11px] text-slate-500 font-medium">
                      {review.role}
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-400 tabular-nums">
                    {review.date}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-600">
                  <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span className="truncate">{review.location}</span>
                </div>

                <div className="p-2 rounded-lg bg-slate-50 text-[11px] text-slate-700 border border-slate-100 flex items-center justify-between">
                  <span className="truncate">{review.specsSummary}</span>
                  <span className="flex items-center gap-1 text-emerald-600 font-bold shrink-0 text-[10px]">
                    <ShieldCheck className="w-3 h-3" />
                    Проверено
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Aggregate Trust Badge */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="text-3xl font-black text-amber-500 tabular-nums">
              5.0
            </div>
            <div>
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                Средняя оценка качества монтажа на основании 140+ сданных объектов
              </div>
            </div>
          </div>

          <div className="text-xs font-semibold text-slate-700">
            Официальный договор · Фиксация сметы в тенге · Гарантия 24 месяца
          </div>
        </div>
      </div>
    </section>
  );
};
