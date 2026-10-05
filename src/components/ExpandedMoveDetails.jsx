import React from 'react';
import { InventoryAccordion } from './InventoryAccordion';

export const ExpandedMoveDetails = ({
  estimate,
  categories,
  onEditAdditionalInfo,
  onEditHouseDetails,
  onEditInventory,
}) => {
  const additionalNotes = [
    estimate.old_house_additional_info,
    estimate.new_house_additional_info,
  ]
    .filter(Boolean)
    .join(' | ') || 'Test Data';

  return (
    <div className="pt-6 pb-2 space-y-8 animate-fadeIn text-gray-800">
      {/* 1. Additional Information Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-gray-900 tracking-tight">
            Additional Information
          </h3>
          <button
            type="button"
            onClick={onEditAdditionalInfo}
            className="bg-black hover:bg-neutral-800 active:scale-95 text-white text-xs font-semibold px-4 py-1.5 rounded transition cursor-pointer shadow-xs"
          >
            Edit Additional Info
          </button>
        </div>
        <p className="text-xs text-gray-600 font-medium leading-relaxed bg-gray-50/70 p-3 rounded border border-gray-100">
          {additionalNotes}
        </p>
      </section>

      {/* 2. House Details Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-gray-900 tracking-tight">
            House Details
          </h3>
          <button
            type="button"
            onClick={onEditHouseDetails}
            className="bg-black hover:bg-neutral-800 active:scale-95 text-white text-xs font-semibold px-4 py-1.5 rounded transition cursor-pointer shadow-xs"
          >
            Edit House Details
          </button>
        </div>

        {/* Existing vs New House Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-1">
          {/* Existing House Details */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#ec5a37] tracking-wide">
              Existing House Details
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="block text-gray-800 font-semibold mb-0.5">Floor No.</span>
                <span className="text-gray-600 font-medium">
                  {estimate.old_floor_no !== undefined && estimate.old_floor_no !== ''
                    ? estimate.old_floor_no
                    : '11'}
                </span>
              </div>
              <div>
                <span className="block text-gray-800 font-semibold mb-0.5">Elevator Available.</span>
                <span className="text-gray-600 font-medium">
                  {estimate.old_elevator_availability || 'Yes'}
                </span>
              </div>
              <div>
                <span className="block text-gray-800 font-semibold mb-0.5">
                  Distance from Elevator / Staircase to truck
                </span>
                <span className="text-gray-600 font-medium">
                  {estimate.old_parking_distance || '11 meters'}
                </span>
              </div>
            </div>
          </div>

          {/* New House Details */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#ec5a37] tracking-wide">
              New House Details
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="block text-gray-800 font-semibold mb-0.5">Floor No.</span>
                <span className="text-gray-600 font-medium">
                  {estimate.new_floor_no !== undefined && estimate.new_floor_no !== ''
                    ? estimate.new_floor_no
                    : '11'}
                </span>
              </div>
              <div>
                <span className="block text-gray-800 font-semibold mb-0.5">Elevator Available.</span>
                <span className="text-gray-600 font-medium">
                  {estimate.new_elevator_availability || 'Yes'}
                </span>
              </div>
              <div>
                <span className="block text-gray-800 font-semibold mb-0.5">
                  Distance from Elevator / Staircase to truck
                </span>
                <span className="text-gray-600 font-medium">
                  {estimate.new_parking_distance || '11 meters'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Inventory Details Section */}
      <section className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-gray-900 tracking-tight">
            Inventory Details
          </h3>
          <button
            type="button"
            onClick={onEditInventory}
            className="bg-black hover:bg-neutral-800 active:scale-95 text-white text-xs font-semibold px-4 py-1.5 rounded transition cursor-pointer shadow-xs"
          >
            Edit Inventory
          </button>
        </div>

        {/* Categories Accordion */}
        <InventoryAccordion categories={categories} />
      </section>
    </div>
  );
};
