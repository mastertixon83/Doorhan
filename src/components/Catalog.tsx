import React, { useState } from 'react';
import { PRODUCTS } from '../data/landingData';
import { Check, ArrowRight, Shield, Ruler } from 'lucide-react';

interface CatalogProps {
  onOpenLeadModal: (title?: string, defaultProduct?: string) => void;
  onSelectForCalculator: (productCategory: string) => void;
}

export const Catalog: React.FC<CatalogProps> = ({ onOpenLeadModal, onSelectForCalculator }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Вся продукция' },
    { id: 'roller', label: 'Рольставни' },
    { id: 'automation', label: 'Автоматизация' },
    { id: 'fire-doors', label: 'Противопожарные двери' },
    { id: 'sectional', label: 'Секционные ворота' },
    { id: 'barrier', label: 'Шлагбаумы' },
    { id: 'sliding', label: 'Откатные ворота' },
    { id: 'industrial', label: 'Промышленные ворота' },
  ];

  const filteredProducts =
    activeCategory === 'all'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  const formatPrice = (price: number) => {
    return price.toLocaleString('ru-RU') + ' ₸';
  };

  return (
    <section id="catalog" className="py-14 sm:py-24 bg-slate-100/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-10">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-1.5 sm:mb-2">
              Каталог сертифицированной продукции
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Оригинальные системы DoorHan под ключ
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
              Прямые поставки с завода DoorHan. Полная заводская комплектация, официальная гарантия и монтаж сертифицированными инженерами.
            </p>
          </div>

          <div className="text-xs sm:text-sm font-semibold text-slate-700 bg-white px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg border border-slate-200 self-start md:self-auto shadow-xs">
            Гарантия завода <span className="text-amber-600 font-bold">до 10 лет</span>
          </div>
        </div>

        {/* Filter Tabs (Edge-to-edge scroll on mobile with peek affordance) */}
        <div className="-mx-4 px-4 sm:mx-0 sm:px-0 flex items-center gap-2 overflow-x-auto pb-3 sm:pb-4 mb-6 sm:mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 min-h-[40px] flex items-center ${
                activeCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10'
                  : 'bg-white text-slate-700 hover:bg-slate-200/80 active:bg-slate-200 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="flex flex-col justify-between bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-300 group"
            >
              <div>
                {/* Image Container with Fallback */}
                <div className="relative h-52 sm:h-64 overflow-hidden bg-slate-800">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {product.badge && (
                    <div className="absolute top-3 left-3 bg-amber-400 text-slate-950 text-[10px] sm:text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-md shadow-sm">
                      {product.badge}
                    </div>
                  )}

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                    <span className="flex items-center gap-1 font-medium bg-black/50 backdrop-blur-md px-2 py-1 rounded">
                      <Shield className="w-3.5 h-3.5 text-amber-400" />
                      DoorHan Official
                    </span>
                    <span className="bg-slate-900/80 backdrop-blur-md px-2 py-1 rounded font-bold text-amber-300">
                      от {formatPrice(product.priceFrom)}
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-5 sm:p-6">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-amber-600 transition-colors">
                    {product.name}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Key Features */}
                  <div className="mt-3.5 sm:mt-4 space-y-1.5">
                    {product.features.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Technical Specifications */}
                  <div className="mt-4 pt-3 sm:mt-5 sm:pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px]">
                    {product.specs.map((spec, sidx) => (
                      <div key={sidx} className="bg-slate-50 p-2 rounded-lg">
                        <div className="text-slate-400 font-medium truncate">{spec.label}</div>
                        <div className="font-bold text-slate-800 truncate">{spec.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 sm:p-6 pt-0 mt-2 flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => onSelectForCalculator(product.category)}
                  className="flex-1 py-3 px-4 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs min-h-[44px]"
                >
                  <Ruler className="w-4 h-4" />
                  <span>Рассчитать стоимость</span>
                </button>

                <button
                  onClick={() =>
                    onOpenLeadModal(`Подробная консультация: ${product.name}`, product.name)
                  }
                  className="py-3 px-4 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px]"
                >
                  <span>Подробнее</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* High Conversion Post-Catalog CTA Banner */}
        <div className="mt-10 sm:mt-12 p-5 sm:p-8 rounded-3xl bg-slate-900 text-white flex flex-col lg:flex-row items-center justify-between gap-5 sm:gap-6 border border-slate-800 shadow-xl">
          <div className="space-y-1 text-center lg:text-left">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">
              Индивидуальный расчет под ваш проем
            </span>
            <h3 className="text-lg sm:text-2xl font-extrabold text-white">
              Не нашли нужный размер или требуется нестандартная комплектация?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Изготавливаем секционные, откатные ворота и рольставни DoorHan под любой нестандартный проем с шагом 5 мм. Инженер приедет на замер бесплатно.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => {
                const el = document.getElementById('quiz-calculator');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-6 py-3.5 text-xs sm:text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-xl transition-all shadow-md shadow-amber-400/20 cursor-pointer min-h-[44px]"
            >
              Рассчитать в квизе за 1 мин
            </button>
            <button
              onClick={() => onOpenLeadModal('Заявка на бесплатный замер нестандартного проема')}
              className="w-full sm:w-auto px-5 py-3.5 text-xs sm:text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer border border-slate-700 min-h-[44px]"
            >
              Вызвать замерщика 0 ₸
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
