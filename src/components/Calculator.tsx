import React, { useState, useId } from 'react';
import { COMPANY_INFO } from '../data/landingData';
import { formatKazakhstanPhone, isValidKazakhstanPhone } from '../utils/phoneFormatter';
import {
  Calculator as CalcIcon,
  CheckCircle2,
  ShieldAlert,
  Sparkles,
  Send,
  MessageCircle,
  ShieldCheck,
  Clock,
  Layers,
  Ruler,
} from 'lucide-react';

interface CalculatorProps {
  preselectedCategory?: string;
  onSuccessLead: (details: string) => void;
}

export const Calculator: React.FC<CalculatorProps> = ({ preselectedCategory, onSuccessLead }) => {
  const widthInputId = useId();
  const heightInputId = useId();
  const nameInputId = useId();
  const phoneInputId = useId();
  const cityInputId = useId();

  // Calculator State
  const [gateType, setGateType] = useState<string>(preselectedCategory || 'sectional');
  const [width, setWidth] = useState<number>(3000);
  const [height, setHeight] = useState<number>(2500);
  const [withAutomation, setWithAutomation] = useState<boolean>(true);
  const [withWicket, setWithWicket] = useState<boolean>(false);
  const [withInstallation, setWithInstallation] = useState<boolean>(true);
  const [selectedCity, setSelectedCity] = useState<string>('Уральск');

  // Lead Form State
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState<string>('');

  const types = [
    { id: 'sectional', label: 'Секционные гаражные', baseM2: 24000, minPrice: 245000 },
    { id: 'sliding', label: 'Откатные въездные', baseM2: 28000, minPrice: 295000 },
    { id: 'roller', label: 'Защитные рольставни', baseM2: 18000, minPrice: 65000 },
    { id: 'barrier', label: 'Шлагбаум Barrier', baseM2: 0, minPrice: 220000 },
    { id: 'fire-doors', label: 'Противопожарные двери', baseM2: 0, minPrice: 110000 },
  ];

  // Quick dimension presets
  const presets = [
    { label: 'Гараж стандарт', w: 3000, h: 2500, type: 'sectional' },
    { label: 'Для внедорожника', w: 3500, h: 2800, type: 'sectional' },
    { label: 'Въездные откатные', w: 4000, h: 2000, type: 'sliding' },
    { label: 'Двойной въезд', w: 5000, h: 2500, type: 'sectional' },
  ];

  const applyPreset = (presetW: number, presetH: number, presetType?: string) => {
    setWidth(presetW);
    setHeight(presetH);
    if (presetType) setGateType(presetType);
  };

  // Dynamic Price Calculation
  const currentType = types.find((t) => t.id === gateType) || types[0];
  const areaM2 = (width * height) / 1000000;

  let baseConstructionCost =
    currentType.baseM2 > 0
      ? Math.round(areaM2 * currentType.baseM2 + currentType.minPrice * 0.4)
      : currentType.minPrice;

  if (baseConstructionCost < currentType.minPrice) {
    baseConstructionCost = currentType.minPrice;
  }

  const automationCost = withAutomation ? (gateType === 'barrier' ? 0 : 55000) : 0;
  const wicketCost = withWicket ? 68000 : 0;
  const installCost = withInstallation ? Math.round(baseConstructionCost * 0.12 + 25000) : 0;

  const estimatedTotal = baseConstructionCost + automationCost + wicketCost + installCost;
  const discountAmount = Math.round(estimatedTotal * 0.1); // 10% online calculation discount
  const finalPrice = estimatedTotal - discountAmount;

  const handlePhoneChange = (val: string) => {
    const formatted = formatKazakhstanPhone(val);
    setPhone(formatted);
    if (phoneError) setPhoneError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !isValidKazakhstanPhone(phone)) {
      setPhoneError('Пожалуйста, укажите полный номер телефона: +7 (XXX) XXX-XX-XX');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      const details = `${currentType.label}, ${width}x${height} мм, Автоматика: ${withAutomation ? 'Да' : 'Нет'}, Город: ${selectedCity}, Расчетная стоимость: ${finalPrice.toLocaleString('ru-RU')} ₸`;
      onSuccessLead(details);
    }, 500);
  };

  const buildWhatsAppConsultUrl = () => {
    const text = `Здравствуйте! Хочу уточнить стоимость ворот DoorHan:\n• Тип: ${currentType.label}\n• Размеры: ${width} × ${height} мм (${(width / 1000).toFixed(2)} × ${(height / 1000).toFixed(2)} м)\n• Автоматика: ${withAutomation ? 'Да' : 'Нет'}\n• Город: ${selectedCity}\n• Ориентир цены на сайте: ${finalPrice.toLocaleString('ru-RU')} ₸.\nПрикрепляю фото своего проема для точной сметы:`;
    return `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="calculator" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3">
            <CalcIcon className="w-3.5 h-3.5" />
            Интерактивный онлайн-расчет
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            Калькулятор стоимости ворот DoorHan под ключ
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Укажите предварительные размеры проема. Калькулятор мгновенно рассчитает заводскую стоимость с учетом автоматики, доставки и монтажа в Казахстане.
          </p>
        </div>

        {/* Main Box */}
        <div className="max-w-5xl mx-auto bg-slate-50 rounded-3xl border border-slate-200 overflow-hidden shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
            {/* Parameters Left Side */}
            <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
              {/* 1. Type Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">
                  1. Выберите тип воротной системы:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {types.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setGateType(t.id)}
                      className={`p-3 text-left rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        gateType === t.id
                          ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <span className="block font-bold">{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Size Presets */}
              {currentType.baseM2 > 0 && (
                <div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Популярные типовые размеры (1 клик):
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {presets.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => applyPreset(preset.w, preset.h, preset.type)}
                        className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium transition-colors cursor-pointer ${
                          width === preset.w && height === preset.h
                            ? 'bg-amber-100 border-amber-300 text-amber-900 font-bold'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {preset.label} ({preset.w / 1000}×{preset.h / 1000} м)
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 2. Dimensions */}
              {currentType.baseM2 > 0 && (
                <div className="space-y-4 pt-1">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-600">
                    <span>2. Размеры проема (в миллиметрах):</span>
                    <span className="text-amber-600 font-extrabold normal-case">
                      Площадь: {areaM2.toFixed(2)} м²
                    </span>
                  </div>

                  {/* Width */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <label htmlFor={widthInputId} className="font-semibold text-slate-700">
                        Ширина проема:
                      </label>
                      <span className="font-bold text-slate-900 text-sm tabular-nums">
                        {width} мм ({(width / 1000).toFixed(2)} м)
                      </span>
                    </div>
                    <input
                      id={widthInputId}
                      type="range"
                      min="1500"
                      max="6000"
                      step="50"
                      value={width}
                      onChange={(e) => setWidth(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>1 500 мм</span>
                      <span>3 500 мм</span>
                      <span>6 000 мм</span>
                    </div>
                  </div>

                  {/* Height */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <label htmlFor={heightInputId} className="font-semibold text-slate-700">
                        Высота проема:
                      </label>
                      <span className="font-bold text-slate-900 text-sm tabular-nums">
                        {height} мм ({(height / 1000).toFixed(2)} м)
                      </span>
                    </div>
                    <input
                      id={heightInputId}
                      type="range"
                      min="1500"
                      max="4000"
                      step="50"
                      value={height}
                      onChange={(e) => setHeight(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>1 500 мм</span>
                      <span>2 800 мм</span>
                      <span>4 000 мм</span>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. Options & Add-ons */}
              <div className="space-y-2 pt-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  3. Комплектация и опции:
                </label>
                <div className="space-y-2">
                  <label className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 hover:border-slate-300 cursor-pointer transition-colors text-xs">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={withAutomation}
                        onChange={(e) => setWithAutomation(e.target.checked)}
                        className="w-4 h-4 rounded text-amber-500 accent-amber-500 cursor-pointer"
                      />
                      <span className="font-semibold text-slate-800">
                        Электропривод DoorHan + 2 дистанционных пульта
                      </span>
                    </div>
                    <span className="font-bold text-slate-900 tabular-nums">+55 000 ₸</span>
                  </label>

                  {gateType === 'sectional' && (
                    <label className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 hover:border-slate-300 cursor-pointer transition-colors text-xs">
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={withWicket}
                          onChange={(e) => setWithWicket(e.target.checked)}
                          className="w-4 h-4 rounded text-amber-500 accent-amber-500 cursor-pointer"
                        />
                        <span className="font-semibold text-slate-800">
                          Встроенная калитка с замком и доводчиком
                        </span>
                      </div>
                      <span className="font-bold text-slate-900 tabular-nums">+68 000 ₸</span>
                    </label>
                  )}

                  <label className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 hover:border-slate-300 cursor-pointer transition-colors text-xs">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={withInstallation}
                        onChange={(e) => setWithInstallation(e.target.checked)}
                        className="w-4 h-4 rounded text-amber-500 accent-amber-500 cursor-pointer"
                      />
                      <span className="font-semibold text-slate-800">
                        Профессиональный монтаж от 1 дня
                      </span>
                    </div>
                    <span className="font-bold text-emerald-600 tabular-nums">Гарантия 24 мес.</span>
                  </label>
                </div>
              </div>

              {/* City selector */}
              <div>
                <label
                  htmlFor={cityInputId}
                  className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2"
                >
                  4. Регион доставки и замера:
                </label>
                <select
                  id={cityInputId}
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full p-2.5 text-xs sm:text-sm font-semibold rounded-xl bg-white border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                >
                  {COMPANY_INFO.cities.map((city) => (
                    <option key={city} value={city}>
                      {city} {city === 'Уральск' ? '(Бесплатный выезд день в день)' : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Price Summary & Lead Form Right Side */}
            <div className="lg:col-span-5 p-6 sm:p-8 bg-slate-900 text-white flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Итоговый расчет
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded">
                    Скидка 10% учтена
                  </span>
                </div>

                {/* Breakdown */}
                <div className="py-4 space-y-2 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span>Полотно и направляющие:</span>
                    <span className="font-bold text-white tabular-nums">
                      {baseConstructionCost.toLocaleString('ru-RU')} ₸
                    </span>
                  </div>
                  {withAutomation && (
                    <div className="flex justify-between">
                      <span>Автоматика DoorHan:</span>
                      <span className="font-bold text-white tabular-nums">
                        {automationCost.toLocaleString('ru-RU')} ₸
                      </span>
                    </div>
                  )}
                  {withWicket && (
                    <div className="flex justify-between">
                      <span>Встроенная калитка:</span>
                      <span className="font-bold text-white tabular-nums">
                        {wicketCost.toLocaleString('ru-RU')} ₸
                      </span>
                    </div>
                  )}
                  {withInstallation && (
                    <div className="flex justify-between">
                      <span>Монтаж под ключ (от 1 дня):</span>
                      <span className="font-bold text-white tabular-nums">
                        {installCost.toLocaleString('ru-RU')} ₸
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-400">
                    <span>Выезд замерщика:</span>
                    <span className="font-bold text-emerald-400">0 ₸ (Бесплатно)</span>
                  </div>
                  <div className="flex justify-between text-amber-400">
                    <span>Онлайн-скидка (10%):</span>
                    <span className="font-bold tabular-nums">
                      - {discountAmount.toLocaleString('ru-RU')} ₸
                    </span>
                  </div>
                </div>

                {/* Big Total */}
                <div className="pt-4 border-t border-slate-800">
                  <div className="text-xs text-slate-400">Ориентировочная стоимость:</div>
                  <div className="text-3xl sm:text-4xl font-black text-amber-400 tabular-nums">
                    {finalPrice.toLocaleString('ru-RU')} ₸
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Точная смета фиксируется инженером на месте и не меняется.</span>
                  </div>
                </div>
              </div>

              {/* Form Capture */}
              <div className="mt-8 pt-6 border-t border-slate-800">
                {isSubmitted ? (
                  <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-700 text-center space-y-3">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                    <div className="font-bold text-white text-sm">Расчет зафиксирован!</div>
                    <p className="text-xs text-slate-300">
                      Специалист «Евро Ворота» свяжется с вами в течение 10 минут по номеру{' '}
                      <span className="text-white font-bold">{phone}</span> для согласования выезда.
                    </p>
                    <a
                      href={buildWhatsAppConsultUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-bold hover:underline pt-1"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Открыть чат в WhatsApp</span>
                    </a>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      Зафиксировать цену и заказать бесплатный замер:
                    </div>

                    <div>
                      <input
                        id={nameInputId}
                        type="text"
                        placeholder="Ваше имя"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3.5 py-3 rounded-xl bg-slate-800 border border-slate-700 text-base sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <div className="relative">
                        <input
                          id={phoneInputId}
                          type="tel"
                          placeholder="+7 (___) ___-__-__"
                          value={phone}
                          onChange={(e) => handlePhoneChange(e.target.value)}
                          className={`w-full px-3.5 py-3 rounded-xl bg-slate-800 border text-base sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 ${
                            phoneError
                              ? 'border-red-500 focus:ring-red-500'
                              : 'border-slate-700 focus:ring-amber-500'
                          }`}
                          required
                        />
                        {isValidKazakhstanPhone(phone) && (
                          <div className="absolute right-3 top-3 text-emerald-400">
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                      {phoneError && (
                        <div className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                          <ShieldAlert className="w-3 h-3" />
                          {phoneError}
                        </div>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 px-4 text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-amber-400/20 min-h-[48px]"
                    >
                      {isSubmitting ? (
                        <span>Отправляем расчет...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Получить точный расчет и замер 0 ₸</span>
                        </>
                      )}
                    </button>

                    <a
                      href={buildWhatsAppConsultUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-3 text-xs sm:text-sm font-semibold text-emerald-400 hover:text-emerald-300 bg-emerald-950/40 hover:bg-emerald-950/60 border border-emerald-800/60 rounded-xl transition-colors flex items-center justify-center gap-1.5 min-h-[44px]"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current" />
                      <span>Или отправить размеры в WhatsApp инженеру</span>
                    </a>

                    <div className="text-[10px] text-slate-400 text-center flex items-center justify-center gap-2">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>Ответ за 10 минут. Никаких назойливых звонков.</span>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
