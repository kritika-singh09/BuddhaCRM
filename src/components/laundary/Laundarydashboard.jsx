
import React, { useState } from 'react';
import Customer from './Customer';
import Order from './Order';
import ServicePricing from './ServicePricing';
import Inventory from './Inventory';
import Employee from './Employee';
import Invoice from './Invoice';
import Delivery from './Delivery';
import Reports from './Reports';
import {
  Users, ShoppingCart, DollarSign, Package, Briefcase, FileText, Truck, BarChart2,
} from 'lucide-react';

const LaundaryDashboard = () => {
  const [activeSection, setActiveSection] = useState('customers'); // Default to customers

  const renderSection = () => {
    switch (activeSection) {
      case 'customers':
        return <Customer />;
      case 'orders':
        return <Order />;
      case 'services':
        return <ServicePricing />;
      case 'inventory':
        return <Inventory />;
      case 'employees':
        return <Employee />;
      case 'billing':
        return <Invoice />;
      case 'pickup-delivery':
        return <Delivery />;
      case 'reports':
        return <Reports />;
      default:
        return (
          <div className="p-8 bg-white rounded-2xl shadow-2xl border border-gray-200 mb-10 animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
              {sections.find(s => s.id === activeSection)?.name || 'Welcome'}
            </h2>
            <p className="text-gray-700">
              This is a placeholder for the {sections.find(s => s.id === activeSection)?.name || 'selected'} section.
            </p>
          </div>
        );
    }
  };

  const sections = [
    { id: 'customers', name: 'Customer Management', icon: Users },
    { id: 'orders', name: 'Order Management', icon: ShoppingCart },
    { id: 'services', name: 'Service & Pricing', icon: DollarSign },
    { id: 'inventory', name: 'Inventory Tracking', icon: Package },
    { id: 'employees', name: 'Employee Management', icon: Briefcase },
    { id: 'billing', name: 'Billing & Invoicing', icon: FileText },
    { id: 'pickup-delivery', name: 'Pickup & Delivery', icon: Truck },
    { id: 'reports', name: 'Reports & Analytics', icon: BarChart2 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 font-sans text-gray-800 flex flex-col animate-fade-in">
      <header className="p-4 bg-[color:var(--color-primary)] text-white shadow-md">
        <h1 className="text-4xl font-extrabold mb-2 md:mb-0 tracking-tight flex items-center gap-3 bg-[color:var(--color-primary)]">
          <span className="inline-block rounded-full p-2 bg-[color:var(--color-primary)]"><Users className="w-8 h-8" /></span>
          Laundry Dashboard
        </h1>
      </header>

      <main className="flex-1 p-4 sm:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
        {/* Section Navigation Tabs */}
        <nav className="mb-10 bg-white p-4 rounded-2xl shadow-xl border border-gray-200 animate-fade-in">
          <ul className="flex flex-wrap justify-center gap-3 md:gap-5">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center px-6 py-3 rounded-xl transition duration-300 transform hover:scale-105 text-sm md:text-base font-semibold shadow-md
                    ${activeSection === section.id
                      ? 'bg-yellow-600 text-white shadow-lg scale-105'
                      : 'bg-yellow-100 hover:bg-yellow-200 text-gray-800'
                    }`}
                >
                  <section.icon className="mr-2" size={20} /> {section.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        {renderSection()}
      </main>
      {/* Animations */}
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.7s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
};

export default LaundaryDashboard;