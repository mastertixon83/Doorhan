import React from 'react';
import { WORKFLOW_STEPS } from '../data/landingData';
import { PhoneCall, Ruler, FileText, Truck, ShieldCheck, ArrowRight } from 'lucide-react';

interface WorkflowStepsProps {
  onOpenLeadModal: (title?: string) => void;
}

export const WorkflowSteps: React.FC<WorkflowStepsProps> = ({ onOpenLeadModal }) => {
  const stepIcons = [PhoneCall, Ruler, FileText, Truck, ShieldCheck];

  return (
    <section id="workflow" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-16">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-2">
            Прозрачный процесс от заявки до гарантийного талона
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            Как мы работаем: 5 простых шагов к надежным воротам
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Никаких сюрпризов по смете, сорванных сроков или некачественного крепежа. Каждый этап четко регламентирован стандартами дилера DoorHan.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
          {WORKFLOW_STEPS.map((step, index) => {
            const IconComponent = stepIcons[index % stepIcons.length];
            return (
              <div
                key={step.step}
                className="relative flex flex-col items-start p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-400 hover:bg-white hover:shadow-lg transition-all group"
              >
                {/* Step Number & Icon */}
                <div className="flex items-center justify-between w-full mb-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-400/10 text-amber-600 flex items-center justify-center font-black group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-black text-slate-300 group-hover:text-amber-500 transition-colors font-mono">
                    {step.step}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">
                  {step.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.description}
                </p>

                {index < WORKFLOW_STEPS.length - 1 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-slate-300">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Action Prompt */}
        <div className="mt-14 text-center">
          <button
            onClick={() => onOpenLeadModal('Заявка на 1-й шаг: бесплатный вызов замерщика')}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-xl transition-all shadow-md shadow-amber-400/20 cursor-pointer"
          >
            <span>Начать с бесплатного замера</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <div className="text-xs text-slate-500 mt-2">
            Замерщик приедет в удобное для вас время с образцами панелей
          </div>
        </div>
      </div>
    </section>
  );
};
