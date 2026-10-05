import React, { useState } from 'react';
import { MapPin, Calendar, Home, ArrowRight, CheckCircle2 } from 'lucide-react';

export const GetQuoteView = ({ onAddEstimate, onNavigateToMoves }) => {
  const [fromAddress, setFromAddress] = useState('Indiranagar 100 Feet Road, Bengaluru, Karnataka');
  const [toAddress, setToAddress] = useState('Whitefield Main Road, Bengaluru, Karnataka');
  const [propertySize, setPropertySize] = useState('2 BHK');
  const [moveDate, setMoveDate] = useState('2026-10-15');
  const [isFlexible, setIsFlexible] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newId = 'E' + Math.floor(10000 + Math.random() * 90000);
    const newEstimate = {
      estimate_id: newId,
      user_id: 'C47795',
      moving_from: fromAddress,
      moving_to: toAddress,
      moving_on: `${moveDate} 10:00:00`,
      distance: '14.5 km',
      property_size: propertySize,
      old_floor_no: '2',
      new_floor_no: '3',
      old_elevator_availability: 'Yes',
      new_elevator_availability: 'Yes',
      old_parking_distance: '15 meters',
      new_parking_distance: '20 meters',
      total_items: 28,
      custom_status: 'Quotes Awaiting',
      move_date_flexible: isFlexible ? '1' : '0',
      old_house_additional_info: 'Fragile glassware and TV to be double packed.',
      new_house_additional_info: 'Service elevator available for shifting.',
      items: {
        inventory: [
          {
            id: '1',
            name: 'furniture',
            displayName: 'Furniture',
            category: [
              {
                id: '1_1',
                name: 'sofa',
                displayName: 'Sofa',
                items: [
                  {
                    id: 's1',
                    name: '3 Seater Sofa',
                    displayName: '3 Seater Sofa',
                    qty: 1,
                    type: [{ id: 't1', option: 'Leather', selected: true }],
                  },
                  {
                    id: 's2',
                    name: 'Sofa cum bed',
                    displayName: 'Sofa cum bed',
                    qty: 1,
                    type: [],
                  },
                ],
              },
              {
                id: '1_2',
                name: 'table',
                displayName: 'Table',
                items: [
                  {
                    id: 't1',
                    name: 'Centre / Coffee',
                    displayName: 'Centre / Coffee',
                    qty: 1,
                    type: [{ id: 't2', option: 'Glass', selected: true }],
                  },
                  {
                    id: 't2',
                    name: '4 Seater Dining Table',
                    displayName: '4 Seater Dining Table',
                    qty: 1,
                    type: [{ id: 't3', option: 'Wooden', selected: true }],
                  },
                ],
              },
            ],
          },
          {
            id: '2',
            name: 'electronics',
            displayName: 'Electronics',
            category: [
              {
                id: '2_1',
                name: 'tv',
                displayName: 'Television',
                items: [
                  {
                    id: 'tv1',
                    name: 'Smart LED TV',
                    displayName: 'Smart LED TV',
                    qty: 1,
                    type: [{ id: 'tv_t1', option: '55 inch', selected: true }],
                  },
                ],
              },
            ],
          },
          {
            id: '5',
            name: 'boxes_trolley',
            displayName: 'Boxes/Trolley',
            category: [
              {
                id: '5_1',
                name: 'boxes',
                displayName: 'Boxes/Trolley',
                items: [
                  {
                    id: 'b1',
                    name: 'Clothes Boxes',
                    displayName: 'Clothes Boxes',
                    qty: 12,
                    size: [{ option: 'medium', tooltip: '3ft * 3ft', selected: true }],
                  },
                  {
                    id: 'b2',
                    name: 'Kitchen Boxes',
                    displayName: 'Kitchen Boxes',
                    qty: 10,
                    size: [{ option: 'medium', tooltip: '3ft * 3ft', selected: true }],
                  },
                ],
              },
            ],
          },
        ],
        customItems: {
          units: 'feet',
          items: [
            {
              id: 'custom_new_1',
              item_name: 'Home Gym Set',
              item_qty: '1',
              item_description: 'Bench press and 50kg weights set',
            },
          ],
        },
      },
    };

    onAddEstimate(newEstimate);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto bg-white rounded-xl border border-gray-200 p-8 text-center space-y-4 shadow-sm animate-fadeIn">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Move Request Submitted!</h3>
        <p className="text-xs text-gray-600 leading-relaxed max-w-md mx-auto">
          Your shifting estimate request has been logged. Verified movers in Bengaluru are calculating competitive bids.
        </p>
        <div className="pt-4">
          <button
            type="button"
            onClick={onNavigateToMoves}
            className="bg-[#ec5a37] text-white font-semibold text-xs px-6 py-2.5 rounded hover:bg-[#d84826] transition cursor-pointer"
          >
            View in My Moves
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl bg-white rounded-xl border border-gray-200/80 p-8 shadow-2xs animate-fadeIn">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Request Moving Quote</h2>
        <p className="text-xs text-gray-500 mt-1">
          Compare verified packers and movers with zero damage guarantee.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">
            Pick-up Address (Origin)
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              required
              value={fromAddress}
              onChange={(e) => setFromAddress(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#ec5a37]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">
            Drop-off Address (Destination)
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              required
              value={toAddress}
              onChange={(e) => setToAddress(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#ec5a37]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              House Size
            </label>
            <div className="relative">
              <Home className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <select
                value={propertySize}
                onChange={(e) => setPropertySize(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#ec5a37] bg-white"
              >
                <option value="1 BHK">1 BHK</option>
                <option value="2 BHK">2 BHK</option>
                <option value="3 BHK">3 BHK</option>
                <option value="3 + BHK">3 + BHK</option>
                <option value="Villa / Independent House">Villa / Independent House</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Shifting Date
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="date"
                required
                value={moveDate}
                onChange={(e) => setMoveDate(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#ec5a37]"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 pt-1">
          <input
            type="checkbox"
            id="isFlexNew"
            checked={isFlexible}
            onChange={(e) => setIsFlexible(e.target.checked)}
            className="w-4 h-4 text-[#ec5a37] rounded focus:ring-orange-500 accent-[#ec5a37]"
          />
          <label htmlFor="isFlexNew" className="text-xs text-gray-700 font-medium cursor-pointer">
            My move dates are flexible (better pricing)
          </label>
        </div>

        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button
            type="submit"
            className="bg-[#ec5a37] hover:bg-[#d84826] text-white font-bold text-xs px-6 py-2.5 rounded shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            Generate Instant Free Quote <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
