import React from 'react';
import { X, Clock, CheckCircle2, Phone, Star } from 'lucide-react';

export const QuotesModal = ({ isOpen, onClose, estimate }) => {
  if (!isOpen || !estimate) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-gray-100 animate-fadeIn">
        {/* Header */}
        <div className="bg-linear-to-r from-[#ec5a37] to-[#f27457] text-white px-6 py-5 flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-wider text-orange-100 font-bold">
              Move Quotation Status
            </span>
            <h3 className="text-xl font-bold mt-0.5">Request #{estimate.estimate_id}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Status banner */}
          <div className="flex items-start space-x-3 p-4 rounded-lg bg-orange-50 border border-orange-100 text-xs">
            <Clock className="w-5 h-5 text-[#ec5a37] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-gray-900 text-sm">
                Vendors Reviewing Your Move Details
              </p>
              <p className="text-gray-600 mt-1 leading-relaxed">
                Your request with <strong>{estimate.total_items} items</strong> ({estimate.property_size}) for{' '}
                <strong>{estimate.distance}</strong> is being quoted by verified movers. You will receive competitive
                quotes via SMS & Email.
              </p>
            </div>
          </div>

          {/* Estimated Cost Preview */}
          <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
            <span className="text-xs text-gray-500 font-semibold block mb-1">
              Estimated Price Range
            </span>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-extrabold text-gray-900">₹4,200 - ₹5,800</span>
              <span className="text-xs text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded">
                Best Value Guarantee
              </span>
            </div>
            <p className="text-[11px] text-gray-400 mt-1">
              Includes packing, labor, transportation, and toll charges.
            </p>
          </div>

          {/* Top verified movers assigned */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
              Matched Verified Movers (3 Assigned)
            </h4>
            <div className="space-y-2.5">
              {[
                { name: 'Agarwal Movers & Relocation', rating: '4.9', moves: '1,200+ moves' },
                { name: 'Porter Intercity Logistics', rating: '4.8', moves: '3,400+ moves' },
                { name: 'SafeShift Packers Bengaluru', rating: '4.7', moves: '890+ moves' },
              ].map((mover, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded border border-gray-100 bg-white hover:border-gray-300 transition text-xs"
                >
                  <div>
                    <h5 className="font-bold text-gray-900">{mover.name}</h5>
                    <div className="flex items-center space-x-2 mt-0.5 text-gray-500">
                      <span className="flex items-center text-amber-500 font-semibold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400 mr-1" />
                        {mover.rating}
                      </span>
                      <span>•</span>
                      <span>{mover.moves}</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-700 font-semibold rounded text-[11px]">
                    Preparing Quote
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Included Features */}
          <div className="space-y-2 text-xs text-gray-600">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Every Move Includes
            </h4>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                <span>Zero Damage Guarantee</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                <span>Real-Time GPS Tracking</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                <span>Dedicated Move Manager</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                <span>Free Rescheduling</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <button
            type="button"
            className="flex items-center text-xs font-semibold text-gray-600 hover:text-gray-900 cursor-pointer"
          >
            <Phone className="w-4 h-4 mr-1.5 text-[#ec5a37]" />
            Call Support: 1800-419-MOVE
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-white bg-[#ec5a37] hover:bg-[#d84826] rounded cursor-pointer"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
