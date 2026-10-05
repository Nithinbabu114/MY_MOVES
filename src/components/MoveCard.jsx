import React, { useState, useMemo } from 'react';
import {
  Home,
  Boxes,
  MapPin,
  Calendar,
  Pencil,
  ArrowRight,
  AlertTriangle,
  Check,
} from 'lucide-react';
import { formatMovingDate, processInventory } from '../utils/formatters';
import { ExpandedMoveDetails } from './ExpandedMoveDetails';

export const MoveCard = ({
  estimate,
  onUpdateEstimate,
  onOpenQuotes,
  onOpenDatePicker,
  onOpenEditNotes,
  onOpenEditHouse,
  onOpenEditInventory,
}) => {
  // Step 2 requirement: On-click "View Move Details" expand the section and load the object "items" from the API data according to the screen shown below and collapse it when clicked again.
  const [isExpanded, setIsExpanded] = useState(false);

  // Toggle "Is flexible" checkbox
  const toggleFlexible = () => {
    const isCurrentlyFlex = estimate.move_date_flexible === '1' || estimate.move_date_flexible === 'true';
    onUpdateEstimate({
      ...estimate,
      move_date_flexible: isCurrentlyFlex ? '0' : '1',
    });
  };

  const isFlexible =
    estimate.move_date_flexible === '1' ||
    estimate.move_date_flexible === 'true' ||
    estimate.move_date_flexible === undefined; // default true in visual mock

  // Process inventory into grouped categories matching the visual layout
  const categories = useMemo(() => {
    return processInventory(estimate.items?.inventory, estimate.items?.customItems);
  }, [estimate.items]);

  return (
    <div className="py-6 border-b border-gray-200/90 last:border-b-0">
      {/* Route Row: From -> To -> Request# */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start mb-6">
        {/* From Address */}
        <div className="md:col-span-5 space-y-1.5">
          <span className="block font-bold text-gray-900 text-sm tracking-tight">
            From
          </span>
          <p className="text-gray-700 text-xs sm:text-[13px] leading-relaxed font-normal">
            {estimate.moving_from}
          </p>
        </div>

        {/* Center Circular Arrow Button */}
        <div className="md:col-span-1 flex items-center justify-center pt-2 md:pt-4">
          <div className="w-10 h-10 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center transition-transform hover:scale-105">
            <ArrowRight className="w-4 h-4 text-[#ec5a37] stroke-[2.5]" />
          </div>
        </div>

        {/* To Address */}
        <div className="md:col-span-4 space-y-1.5">
          <span className="block font-bold text-gray-900 text-sm tracking-tight">
            To
          </span>
          <p className="text-gray-700 text-xs sm:text-[13px] leading-relaxed font-normal">
            {estimate.moving_to}
          </p>
        </div>

        {/* Request# */}
        <div className="md:col-span-2 md:text-right space-y-1">
          <span className="block font-bold text-gray-900 text-sm tracking-tight">
            Request#
          </span>
          <p className="font-extrabold text-[#ec5a37] text-sm sm:text-base tracking-wider">
            {estimate.estimate_id}
          </p>
        </div>
      </div>

      {/* Meta Specs & Action Buttons Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-2 text-xs sm:text-sm">
        {/* Left specs: BHK, Items, Distance, Date, Flexible */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          {/* Property Size */}
          <div className="flex items-center space-x-2">
            <Home className="w-4.5 h-4.5 text-[#ec5a37] fill-[#ec5a37]/15 stroke-[2]" />
            <span className="font-semibold text-gray-800">
              {estimate.property_size || '1 BHK'}
            </span>
          </div>

          {/* Total Items */}
          <div className="flex items-center space-x-2">
            <Boxes className="w-4.5 h-4.5 text-[#ec5a37] stroke-[2]" />
            <span className="font-semibold text-gray-800">
              {estimate.total_items}
            </span>
          </div>

          {/* Distance */}
          <div className="flex items-center space-x-2">
            <MapPin className="w-4.5 h-4.5 text-[#ec5a37] stroke-[2]" />
            <span className="font-semibold text-gray-800">
              {estimate.distance}
            </span>
          </div>

          {/* Date & Time with Edit Pencil */}
          <div className="flex items-center space-x-2">
            <Calendar className="w-4.5 h-4.5 text-[#ec5a37] stroke-[2]" />
            <span className="font-semibold text-gray-800">
              {formatMovingDate(estimate.moving_on)}
            </span>
            <button
              type="button"
              onClick={() => onOpenDatePicker(estimate)}
              title="Reschedule move date"
              className="p-1 hover:bg-gray-100 rounded text-gray-600 hover:text-gray-900 transition cursor-pointer"
              aria-label="Edit date"
            >
              <Pencil className="w-3.5 h-3.5 stroke-[2]" />
            </button>
          </div>

          {/* Is Flexible Checkbox */}
          <button
            type="button"
            onClick={toggleFlexible}
            className="flex items-center space-x-2 cursor-pointer group text-left"
            title="Toggle flexible move date"
          >
            <div
              className={`w-4.5 h-4.5 rounded flex items-center justify-center transition-colors ${
                isFlexible
                  ? 'bg-[#ec5a37] text-white'
                  : 'border border-gray-300 bg-white group-hover:border-[#ec5a37]'
              }`}
            >
              {isFlexible && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
            <span className="text-gray-800 text-xs sm:text-sm font-medium select-none">
              Is flexible
            </span>
          </button>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center space-x-3">
          {/* Step 2 requirement: View move details toggle */}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="border border-[#ec5a37] text-[#ec5a37] hover:bg-orange-50/80 active:bg-orange-100 px-4 py-2 rounded text-xs sm:text-sm font-semibold transition cursor-pointer shadow-2xs"
          >
            {isExpanded ? 'Hide move details' : 'View move details'}
          </button>

          {/* Quotes Awaiting button */}
          <button
            type="button"
            onClick={() => onOpenQuotes(estimate)}
            className="bg-[#ec5a37] hover:bg-[#d84826] active:scale-98 text-white px-4 sm:px-5 py-2 rounded text-xs sm:text-sm font-semibold transition cursor-pointer shadow-xs"
          >
            {estimate.custom_status || 'Quotes Awaiting'}
          </button>
        </div>
      </div>

      {/* Disclaimer Row */}
      <div className="flex items-center space-x-2 mt-3 pt-1 text-xs text-gray-600">
        <AlertTriangle className="w-4 h-4 text-[#ec5a37] shrink-0 fill-[#ec5a37]/15 stroke-[2]" />
        <p className="leading-snug">
          <strong className="font-bold text-gray-900">Disclaimer:</strong> Please
          update your move date before two days of shifting
        </p>
      </div>

      {/* Expanded Details Section */}
      {isExpanded && (
        <ExpandedMoveDetails
          estimate={estimate}
          categories={categories}
          onEditAdditionalInfo={() => onOpenEditNotes(estimate)}
          onEditHouseDetails={() => onOpenEditHouse(estimate)}
          onEditInventory={() => onOpenEditInventory(estimate)}
        />
      )}
    </div>
  );
};
