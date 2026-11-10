import React, { useState } from 'react';
import { PRODUCTS, ProductItem } from '../data/landingData';
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

  const filteredProducts = activeCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategory);

  const formatPrice = (price: number) => {
    return price.toLocaleString('ru-RU') + ' ₸';
  };

  return (
    <section id="catalog" className="py-16 sm:py-24 bg-slate-100/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-2">
              Каталог сертифицированной продукции
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Оригинальные системы DoorHan под ключ
            </h2>
            <p className="mt-2 text-base text-slate-600 max-w-2xl">
              Прямые поставки с завода DoorHan. Полная заводская комплектация, официальная гарантия и монтаж сертифицированными инженерами.
            </p>
          </div>

          <div className="text-sm font-semibold text-slate-700 bg-white px-4 py-2 rounded-lg border border-slate-200 self-start md:self-auto shadow-xs">
            Гарантия завода <span className="text-amber-600 font-bold">до 10 лет</span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10'
                  : 'bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="flex flex-col justify-between bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-300 group"
            >
              <div>
                {/* Image Container with Fallback */}
                <div className="relative h-56 sm:h-64 overflow-hidden bg-slate-800">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback visually if needed
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {product.badge && (
                    <div className="absolute top-3 left-3 bg-amber-400 text-slate-950 text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-md shadow-sm">
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
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-amber-600 transition-colors">
                    {product.name}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Key Features */}
                  <div className="mt-4 space-y-1.5">
                    {product.features.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Technical Specifications */}
                  <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px]">
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
              <div className="p-6 pt-0 mt-2 flex flex-col gap-2">
                <button
                  onClick={() => onSelectForCalculator(product.category)}
                  className="w-full py-2.5 px-4 text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Ruler className="w-4 h-4" />
                  <span>Рассчитать под размер</span>
                </button>

                <button
                  onClick={() => onOpenLeadModal(`Заказ замера: ${product.name}`, product.name)}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Бесплатный выезд замерщика</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 text-center text-xs text-slate-500">
          Нужны нестандартные габариты или панорамное остекление? Мы изготавливаем конструкции под любой проем с шагом до 5 мм.
        </div>
      </div>
    </section>
  );
};
