import React from 'react';
import { Shirt, Droplet, Sun, Clock, Zap, DollarSign, Package, MapPin, Phone, Mail, CheckCircle, Leaf, Truck } from 'lucide-react';

const ServicesAndPricing = () => {
  // Define your laundry services and their details
  const services = [
    {
      name: 'Wash & Fold',
      icon: Droplet,
      description: 'Your everyday laundry, washed, dried, and neatly folded. Perfect for clothes, towels, and bedding.',
      price: '₹70 per KG', // Example pricing
      features: [
        'Gentle wash cycle',
        'High-quality detergents',
        'Ready in 24 hours',
        'Eco-friendly options',
      ],
    },
    {
      name: 'Dry Cleaning',
      icon: Shirt,
      description: 'Specialized care for delicate fabrics and garments that require professional dry cleaning.',
      price: 'Starting from ₹150 per item', // Example pricing
      features: [
        'Stain removal expertise',
        'Preserves fabric quality',
        'Ideal for suits, dresses, and silks',
        'Hand-finished pressing',
      ],
    },
    {
      name: 'Ironing Service',
      icon: Sun, // Representing crispness
      description: 'Get your clothes perfectly pressed and wrinkle-free, ready to wear.',
      price: '₹20 per item', // Example pricing
      features: [
        'Professional steam ironing',
        'Crease-free guarantee',
        'Suitable for all garments',
        'Quick turnaround',
      ],
    },
    {
      name: 'Duvet & Blanket Cleaning',
      icon: Package, // Representing bulky items
      description: 'Deep cleaning for duvets, blankets, and other large household items.',
      price: 'Starting from ₹300', // Example pricing
      features: [
        'Thorough sanitization',
        'Removes dust mites and allergens',
        'Restores freshness',
        'Specialized machinery for large items',
      ],
    },
  ];

  // Define key benefits
  const benefits = [
    {
      name: 'Convenient Pickup & Delivery',
      icon: Truck,
      description: 'Schedule a pickup from your doorstep and get your fresh laundry delivered back to you.',
    },
    {
      name: 'Eco-Friendly Practices',
      icon: Leaf,
      description: 'We use biodegradable detergents and energy-efficient machines to minimize environmental impact.',
    },
    {
      name: 'Quality Guaranteed',
      icon: CheckCircle,
      description: 'Our experienced team ensures your clothes receive the best care, every time.',
    },
    {
      name: 'Express Service Available',
      icon: Zap,
      description: 'Need your laundry back quickly? Opt for our express service for faster turnaround.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 p-4 sm:p-6 lg:p-8">
      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-r from-indigo-600 to-blue-700 text-white rounded-xl shadow-lg mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
          Our Laundry Services & Pricing
        </h1>
        <p className="text-lg sm:text-xl max-w-3xl mx-auto mb-8 opacity-90">
          Experience premium laundry care with convenient services and transparent pricing.
        </p>
        <a
          href="#" // Placeholder for actual scheduling link
          className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-semibold rounded-full shadow-xl text-indigo-700 bg-white hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
        >
          <Clock size={24} className="mr-3" /> Schedule a Pickup
        </a>
      </section>

      {/* Services Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-xl border border-gray-100"
            >
              <div className="p-4 bg-indigo-100 text-indigo-600 rounded-full mb-4">
                <service.icon size={40} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{service.name}</h3>
              <p className="text-gray-600 mb-4 flex-grow">{service.description}</p>
              <div className="w-full">
                <p className="text-2xl font-bold text-blue-600 mb-4">
                  <DollarSign size={20} className="inline-block mr-1 align-text-bottom" /> {service.price}
                </p>
                <ul className="text-sm text-gray-500 list-none p-0 mb-4">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center justify-center mb-1">
                      <CheckCircle size={14} className="text-green-500 mr-2 flex-shrink-0" /> {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className="mt-auto inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-white rounded-xl shadow-lg p-8 mb-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex flex-col items-center text-center p-4">
              <div className="p-4 bg-green-100 text-green-600 rounded-full mb-4">
                <benefit.icon size={40} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{benefit.name}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action / Contact Section */}
      <section className="text-center py-12 bg-gray-800 text-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-4">Ready for Fresh Laundry?</h2>
        <p className="text-lg max-w-2xl mx-auto mb-8 opacity-90">
          Contact us today to schedule your first pickup or learn more about our services.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <a
            href="tel:+1234567890" // Placeholder phone number
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <Phone size={20} className="mr-2" /> Call Us
          </a>
          <a
            href="mailto:info@laundryservice.com" // Placeholder email
            className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-full shadow-md text-white hover:bg-white hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-colors"
          >
            <Mail size={20} className="mr-2" /> Email Us
          </a>
        </div>
      </section>
    </div>
  );
};

export default ServicesAndPricing;