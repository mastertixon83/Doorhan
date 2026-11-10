/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustStats } from './components/TrustStats';
import { Catalog } from './components/Catalog';
import { Calculator } from './components/Calculator';
import { SectionalAdvantages } from './components/SectionalAdvantages';
import { WorkflowSteps } from './components/WorkflowSteps';
import { Testimonials } from './components/Testimonials';
import { LeadCaptureSection } from './components/LeadCaptureSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { LeadModal } from './components/LeadModal';
import { FloatingActions } from './components/FloatingActions';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Бесплатный выезд замерщика и консультация');
  const [modalDefaultProduct, setModalDefaultProduct] = useState('');
  const [preselectedCalcCat, setPreselectedCalcCat] = useState('sectional');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleOpenLeadModal = (title?: string, defaultProduct?: string) => {
    if (title) setModalTitle(title);
    if (defaultProduct) setModalDefaultProduct(defaultProduct);
    setModalOpen(true);
  };

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectForCalculator = (productCategory: string) => {
    setPreselectedCalcCat(productCategory);
    handleScrollToSection('calculator');
  };

  const handleSuccessLead = (details: string) => {
    setToastMessage('Спасибо! Ваша заявка принята. Специалист свяжется с вами в течение 10 минут.');
    setTimeout(() => {
      setToastMessage(null);
    }, 6000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-amber-400 selection:text-slate-950 font-['Manrope',sans-serif]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-5 z-50 max-w-md bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-emerald-500/50 flex items-start gap-3 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm">
            <span className="font-bold block text-emerald-400">Заявка принята</span>
            {toastMessage}
          </div>
        </div>
      )}

      {/* 1. Header */}
      <Header onOpenLeadModal={handleOpenLeadModal} />

      {/* Main Content */}
      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero
          onOpenLeadModal={handleOpenLeadModal}
          onScrollToSection={handleScrollToSection}
        />

        {/* 3. Trust / Advantages */}
        <TrustStats onOpenLeadModal={handleOpenLeadModal} />

        {/* 4. Catalog */}
        <Catalog
          onOpenLeadModal={handleOpenLeadModal}
          onSelectForCalculator={handleSelectForCalculator}
        />

        {/* 5. Interactive Calculator (Lead Capture) */}
        <Calculator
          preselectedCategory={preselectedCalcCat}
          onSuccessLead={handleSuccessLead}
        />

        {/* 6. Sectional vs Classic Advantages */}
        <SectionalAdvantages onOpenLeadModal={handleOpenLeadModal} />

        {/* 7. Workflow Steps (5 steps) */}
        <WorkflowSteps onOpenLeadModal={handleOpenLeadModal} />

        {/* 8. Testimonials & Real Cases */}
        <Testimonials />

        {/* 9. Lead Capture Magnet */}
        <LeadCaptureSection onSuccessLead={handleSuccessLead} />

        {/* 10. FAQs */}
        <FAQSection />
      </main>

      {/* 11. Footer */}
      <Footer onOpenLeadModal={handleOpenLeadModal} />

      {/* Modal & Floating Widgets */}
      <LeadModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalTitle}
        defaultProduct={modalDefaultProduct}
        onSuccess={handleSuccessLead}
      />

      <FloatingActions onOpenLeadModal={handleOpenLeadModal} />
    </div>
  );
}
