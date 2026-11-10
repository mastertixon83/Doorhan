import React, { useState, useId } from 'react';
import { COMPANY_INFO } from '../data/landingData';
import { formatKazakhstanPhone, isValidKazakhstanPhone } from '../utils/phoneFormatter';
import {
  Layers,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Gift,
  Phone,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Maximize2,
  Smartphone,
  Radio,
  SlidersHorizontal,
  Warehouse,
  ShieldAlert,
  Clock,
  Send,
} from 'lucide-react';

interface QuizCalculatorProps {
  onSuccessLead: (details: string) => void;
}

export const QuizCalculator: React.FC<QuizCalculatorProps> = ({ onSuccessLead }) => {
  const nameInputId = useId();
  const phoneInputId = useId();

  // Current Step (1 to 4)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form selections
  const [objectType, setObjectType] = useState<string>('Гаражные секционные ворота');
  const [gateSize, setGateSize] = useState<string>('Стандартный (2.5–4.0х3.0м)');
  const [automationType, setAutomationType] = useState<string>('С пульта');
  const [selectedGift, setSelectedGift] = useState<string>('Второй пульт в подарок');

  // Contact info
  const [userName, setUserName] = useState<string>('');
  const [userPhone, setUserPhone] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [whatsAppUrl, setWhatsAppUrl] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Step 1 Options
  const objectTypeOptions = [
    {
      id: 'sectional',
      title: 'Гаражные секционные ворота',
      desc: 'Теплые панели 45 мм DoorHan, подъем под потолок',
      icon: Layers,
    },
    {
      id: 'sliding',
      title: 'Въездные ворота (откатные/распашные)',
      desc: 'Консольные сдвижные или распашные для въезда во двор',
      icon: Maximize2,
    },
    {
      id: 'roller',
      title: 'Рольставни',
      desc: 'Защитные роллеты для окон, бутиков, гаражей и санузлов',
      icon: ShieldCheck,
    },
    {
      id: 'industrial',
      title: 'Промышленные ворота',
      desc: 'Для складов, ангаров, автомоек с высокой интенсивностью',
      icon: Warehouse,
    },
    {
      id: 'barrier',
      title: 'Шлагбаум и автоматика',
      desc: 'Шлагбаумы Barrier-PRO, электроприводы и аксессуары',
      icon: SlidersHorizontal,
    },
  ];

  // Step 2 Options
  const sizeOptions = [
    {
      title: 'Компактный (до 2.5х2.2м)',
      desc: 'Стандартный гараж на 1 легковой автомобиль',
    },
    {
      title: 'Стандартный (2.5–4.0х3.0м)',
      desc: 'Для внедорожников, минивэнов и комфортного въезда',
    },
    {
      title: 'Большой (более 4.0м)',
      desc: 'Широкий въезд на 2 авто или коммерческий транспорт',
    },
    {
      title: 'Нужен бесплатный замер',
      desc: 'Инженер приедет с лазерным дальномером и измерит точно',
    },
  ];

  // Step 3 Options
  const automationOptions = [
    {
      title: 'С пульта',
      desc: 'Дистанционные брелоки DoorHan Transmitter в комплекте',
      icon: Radio,
    },
    {
      title: 'Со смартфона',
      desc: 'Открытие через мобильное приложение (Wi-Fi / GSM модуль)',
      icon: Smartphone,
    },
    {
      title: 'Ручное открытие (эконом)',
      desc: 'Торсионный механизм компенсирует вес полотна',
      icon: SlidersHorizontal,
    },
    {
      title: 'Посоветуйте вариант',
      desc: 'Инженер подберет оптимальный привод под ваш бюджет',
      icon: Sparkles,
    },
  ];

  // Step 4 Bonus gifts
  const giftOptions = [
    {
      title: 'Второй пульт в подарок',
      desc: 'Оригинальный пульт DoorHan Transmitter 4',
      badge: 'Популярно',
    },
    {
      title: 'Скидка 5% на монтаж',
      desc: 'Прямая экономия на сертифицированной установке',
      badge: 'Выгода',
    },
    {
      title: 'Бесплатная доставка',
      desc: 'Бережная транспортировка в заводской упаковке прямо к объекту',
      badge: 'Удобно',
    },
  ];

  // Auto-advance helper with small delay for visual feedback
  const handleSelectOptionWithAdvance = (
    setter: (val: string) => void,
    val: string,
    nextStepNumber: number
  ) => {
    setter(val);
    setTimeout(() => {
      setCurrentStep(nextStepNumber);
    }, 240);
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handlePhoneInputChange = (rawVal: string) => {
    const formatted = formatKazakhstanPhone(rawVal);
    setUserPhone(formatted);
    if (phoneError) setPhoneError('');
  };

  const buildWhatsAppMessage = () => {
    const lines = [
      '👋 Здравствуйте! Я прошел квиз-калькулятор стоимости ворот на сайте «Евро Ворота»:',
      `• Тип объекта: ${objectType}`,
      `• Размеры: ${gateSize}`,
      `• Управление: ${automationType}`,
      `• Выбранный подарок: 🎁 ${selectedGift}`,
      `• Контактное лицо: ${userName || 'Клиент'}`,
      `• Телефон: ${userPhone || 'Указан в чате'}`,
      'Пожалуйста, подготовьте расчет стоимости и зафиксируйте за мной подарок!',
    ];
    return lines.join('\n');
  };

  const handleFormSubmit = (e: React.FormEvent, forceWhatsApp = false) => {
    e.preventDefault();

    if (!userPhone || !isValidKazakhstanPhone(userPhone)) {
      setPhoneError('Пожалуйста, введите полный номер телефона: +7 (XXX) XXX-XX-XX');
      return;
    }

    setPhoneError('');
    setIsSubmitting(true);

    const messageText = buildWhatsAppMessage();
    const waUrl = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(messageText)}`;
    setWhatsAppUrl(waUrl);

    const leadSummary = `Квиз: ${objectType}, размер: ${gateSize}, автоматика: ${automationType}, подарок: ${selectedGift}, имя: ${userName || 'Клиент'}, тел: ${userPhone}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      onSuccessLead(leadSummary);

      if (forceWhatsApp) {
        window.open(waUrl, '_blank');
      }
    }, 400);
  };

  const progressPercent = Math.round((currentStep / 4) * 100);

  return (
    <section
      id="quiz-calculator"
      className="py-14 sm:py-20 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-slate-900 relative overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header Block */}
        <div className="text-center mb-8 sm:mb-10 text-white">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Интерактивный квиз-калькулятор стоимости за 1 минуту
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight text-balance">
            Рассчитайте стоимость ворот DoorHan и получите гарантированный подарок
          </h2>

          <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Ответьте на 3 простых вопроса — специалист мгновенно подготовит смету под ваш проем и зафиксирует выбранный бонус.
          </p>
        </div>

        {/* Quiz Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
          {/* Progress Header */}
          <div className="bg-slate-50 px-6 sm:px-8 py-4 border-b border-slate-200">
            <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-2">
              <span className="flex items-center gap-1.5 uppercase tracking-wider text-slate-700">
                Шаг {currentStep} из 4
                {currentStep === 1 && ': Тип конструкции'}
                {currentStep === 2 && ': Размеры проема'}
                {currentStep === 3 && ': Автоматика и управление'}
                {currentStep === 4 && ': Получение расчета и подарка'}
              </span>
              <span className="text-amber-600 font-extrabold tabular-nums">
                {progressPercent}% пройдено
              </span>
            </div>

            {/* Visual Progress Bar */}
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Quick Step Indicators */}
            <div className="hidden sm:grid grid-cols-4 gap-2 mt-3 pt-2 text-[11px] text-slate-500">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className={`text-left font-semibold transition-colors cursor-pointer truncate ${currentStep === 1 ? 'text-amber-600' : 'hover:text-slate-900'}`}
              >
                1. Тип объекта
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className={`text-left font-semibold transition-colors cursor-pointer truncate ${currentStep === 2 ? 'text-amber-600' : 'hover:text-slate-900'}`}
              >
                2. Размеры
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className={`text-left font-semibold transition-colors cursor-pointer truncate ${currentStep === 3 ? 'text-amber-600' : 'hover:text-slate-900'}`}
              >
                3. Автоматика
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className={`text-left font-semibold transition-colors cursor-pointer truncate ${currentStep === 4 ? 'text-amber-600' : 'hover:text-slate-900'}`}
              >
                4. Подарок и расчет
              </button>
            </div>
          </div>

          {/* Step Contents */}
          <div className="p-4 sm:p-8 lg:p-10">
            {isSubmitted ? (
              /* Success Screen */
              <div className="py-6 text-center space-y-6 animate-fadeIn">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    Заявка успешно принята!
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    Смета формируется, подарок зафиксирован
                  </h3>
                  <p className="text-sm text-slate-600 max-w-lg mx-auto">
                    Спасибо, {userName || 'уважаемый клиент'}! Наш инженер свяжется с вами по номеру <strong className="text-slate-900">{userPhone}</strong> в течение 10 минут.
                  </p>
                </div>

                {/* Gift Certificate Voucher Card */}
                <div className="max-w-md mx-auto p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-dashed border-amber-300 text-left flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shrink-0 shadow-sm">
                    <Gift className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-amber-700 tracking-wider">
                      Ваш подарочный сертификат:
                    </div>
                    <div className="text-sm font-extrabold text-slate-900">
                      {selectedGift}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Учтен за номером {userPhone} и будет внесен в договор
                    </div>
                  </div>
                </div>

                {/* Direct WhatsApp Action Button */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 rounded-xl transition-all shadow-md shadow-emerald-600/20 cursor-pointer"
                  >
                    <MessageCircle className="w-5 h-5 fill-current" />
                    <span>Открыть переписку в WhatsApp прямо сейчас</span>
                  </a>

                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setCurrentStep(1);
                    }}
                    className="w-full sm:w-auto px-5 py-3.5 text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                  >
                    Пройти квиз заново
                  </button>
                </div>

                <div className="text-xs text-slate-500 pt-2 flex items-center justify-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <span>Работаем ежедневно с 09:00 до 20:00. Выезд на замер 0 ₸.</span>
                </div>
              </div>
            ) : (
              <div>
                {/* STEP 1: Type */}
                {currentStep === 1 && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                        1. Какой тип ворот или системы вам требуется?
                      </h3>
                      <span className="text-[11px] text-slate-400 hidden sm:inline">
                        Выберите вариант для перехода к шагу 2
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {objectTypeOptions.map((opt) => {
                        const Icon = opt.icon;
                        const isSelected = objectType === opt.title;
                        return (
                          <div
                            key={opt.id}
                            onClick={() =>
                              handleSelectOptionWithAdvance(setObjectType, opt.title, 2)
                            }
                            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3.5 ${
                              isSelected
                                ? 'border-amber-500 bg-amber-50/50 shadow-sm'
                                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                            }`}
                          >
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                                isSelected
                                  ? 'bg-amber-500 text-slate-950 font-bold'
                                  : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              <Icon className="w-5 h-5" />
                            </div>

                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-sm text-slate-900">
                                  {opt.title}
                                </span>
                                <div
                                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                    isSelected
                                      ? 'border-amber-500 bg-amber-500'
                                      : 'border-slate-300'
                                  }`}
                                >
                                  {isSelected && (
                                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                                  )}
                                </div>
                              </div>
                              <p className="text-xs text-slate-500 mt-1 leading-snug">
                                {opt.desc}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 2: Sizes */}
                {currentStep === 2 && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                        2. Укажите ориентировочные размеры проема:
                      </h3>
                      <span className="text-[11px] text-slate-400 hidden sm:inline">
                        Выберите вариант для перехода к шагу 3
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {sizeOptions.map((opt, idx) => {
                        const isSelected = gateSize === opt.title;
                        return (
                          <div
                            key={idx}
                            onClick={() =>
                              handleSelectOptionWithAdvance(setGateSize, opt.title, 3)
                            }
                            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start justify-between gap-3 ${
                              isSelected
                                ? 'border-amber-500 bg-amber-50/50 shadow-sm'
                                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                            }`}
                          >
                            <div>
                              <span className="font-bold text-sm text-slate-900 block">
                                {opt.title}
                              </span>
                              <span className="text-xs text-slate-500 mt-1 block">
                                {opt.desc}
                              </span>
                            </div>

                            <div
                              className={`w-4 h-4 rounded-full border-2 shrink-0 mt-0.5 flex items-center justify-center ${
                                isSelected
                                  ? 'border-amber-500 bg-amber-500'
                                  : 'border-slate-300'
                              }`}
                            >
                              {isSelected && (
                                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center gap-2 mt-4">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>
                        Точный замер не требуется прямо сейчас — инженер бесплатно приедет с лазерным оборудованием и снимет миллиметровые мерки.
                      </span>
                    </div>
                  </div>
                )}

                {/* STEP 3: Automation */}
                {currentStep === 3 && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                        3. Какое управление автоматикой вам требуется?
                      </h3>
                      <span className="text-[11px] text-slate-400 hidden sm:inline">
                        Выберите вариант для перехода к шагу 4
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {automationOptions.map((opt, idx) => {
                        const Icon = opt.icon;
                        const isSelected = automationType === opt.title;
                        return (
                          <div
                            key={idx}
                            onClick={() =>
                              handleSelectOptionWithAdvance(setAutomationType, opt.title, 4)
                            }
                            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3.5 ${
                              isSelected
                                ? 'border-amber-500 bg-amber-50/50 shadow-sm'
                                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                            }`}
                          >
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                                isSelected
                                  ? 'bg-amber-500 text-slate-950 font-bold'
                                  : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              <Icon className="w-5 h-5" />
                            </div>

                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-sm text-slate-900">
                                  {opt.title}
                                </span>
                                <div
                                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                    isSelected
                                      ? 'border-amber-500 bg-amber-500'
                                      : 'border-slate-300'
                                  }`}
                                >
                                  {isSelected && (
                                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                                  )}
                                </div>
                              </div>
                              <p className="text-xs text-slate-500 mt-1 leading-snug">
                                {opt.desc}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 4: Final + Gift + Form */}
                {currentStep === 4 && (
                  <form onSubmit={(e) => handleFormSubmit(e, false)} className="space-y-6 animate-fadeIn">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Gift className="w-5 h-5 text-amber-500" />
                        <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                          4. Выберите ваш гарантированный подарок:
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-500">
                        Бонус будет зафиксирован за вашим номером и учтен в официальном договоре.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
                        {giftOptions.map((gift, idx) => {
                          const isSelected = selectedGift === gift.title;
                          return (
                            <div
                              key={idx}
                              onClick={() => setSelectedGift(gift.title)}
                              className={`relative p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                                isSelected
                                  ? 'border-amber-500 bg-amber-50 shadow-sm'
                                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                              }`}
                            >
                              <div>
                                <span className="inline-block text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-400 text-slate-950 mb-1.5">
                                  {gift.badge}
                                </span>
                                <div className="font-bold text-xs sm:text-sm text-slate-900 leading-snug">
                                  {gift.title}
                                </div>
                                <div className="text-[11px] text-slate-500 mt-1">
                                  {gift.desc}
                                </div>
                              </div>

                              <div className="mt-3 flex items-center justify-end">
                                <div
                                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                    isSelected
                                      ? 'border-amber-500 bg-amber-500'
                                      : 'border-slate-300'
                                  }`}
                                >
                                  {isSelected && (
                                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Inputs */}
                    <div className="pt-2 border-t border-slate-100 space-y-3">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        Куда прислать расчет и зафиксировать подарок?
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label
                            htmlFor={nameInputId}
                            className="block text-xs font-semibold text-slate-700 mb-1"
                          >
                            Ваше имя
                          </label>
                          <input
                            id={nameInputId}
                            type="text"
                            placeholder="Например, Бауржан"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="w-full px-3.5 py-3 rounded-xl border border-slate-300 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                          />
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label
                              htmlFor={phoneInputId}
                              className="block text-xs font-semibold text-slate-700"
                            >
                              Номер телефона / WhatsApp <span className="text-red-500">*</span>
                            </label>
                            {isValidKazakhstanPhone(userPhone) && (
                              <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" /> Номер корректен
                              </span>
                            )}
                          </div>
                          <input
                            id={phoneInputId}
                            type="tel"
                            placeholder="+7 (___) ___-__-__"
                            value={userPhone}
                            onChange={(e) => handlePhoneInputChange(e.target.value)}
                            className={`w-full px-3.5 py-3 rounded-xl border text-base sm:text-sm focus:outline-none focus:ring-2 ${
                              phoneError
                                ? 'border-red-400 focus:ring-red-400 bg-red-50/20'
                                : 'border-slate-300 focus:ring-amber-500'
                            }`}
                            required
                          />
                          {phoneError && (
                            <div className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                              <ShieldAlert className="w-3 h-3" />
                              {phoneError}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Dual Action Buttons (CRO optimized) */}
                    <div className="space-y-2.5 pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 px-6 text-sm sm:text-base font-extrabold text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-xl transition-all shadow-lg shadow-amber-400/25 cursor-pointer flex items-center justify-center gap-2 group"
                      >
                        {isSubmitting ? (
                          <span>Фиксируем расчет и подарок...</span>
                        ) : (
                          <>
                            <Gift className="w-5 h-5 text-slate-950" />
                            <span>Получить расчет стоимости + Подарок</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleFormSubmit(e, true)}
                        className="w-full py-3 px-4 text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
                      >
                        <MessageCircle className="w-4 h-4 fill-current text-emerald-600" />
                        <span>Или отправить напрямую в WhatsApp инженеру</span>
                      </button>
                    </div>

                    {/* Reassurance Micro-Copy */}
                    <div className="text-center text-[11px] text-slate-500 space-y-1">
                      <div className="flex items-center justify-center gap-3">
                        <span className="flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          Конфиденциальность 100%
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-amber-500" />
                          Ответ за 10 минут
                        </span>
                        <span>·</span>
                        <span>Выезд замерщика 0 ₸</span>
                      </div>
                    </div>
                  </form>
                )}

                {/* Footer Controls (Prev & Next buttons) */}
                {currentStep < 4 && (
                  <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
                    {currentStep > 1 ? (
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Назад</span>
                      </button>
                    ) : (
                      <div />
                    )}

                    <button
                      type="button"
                      onClick={handleNext}
                      className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-xl transition-all shadow-md shadow-amber-400/20 cursor-pointer"
                    >
                      <span>Далее (Шаг {currentStep + 1})</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
