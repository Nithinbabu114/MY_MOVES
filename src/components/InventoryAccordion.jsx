import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const InventoryAccordion = ({ categories }) => {
  // Store expanded state per category ID. By default, '1' (Furniture) is expanded
  const [expandedCategories, setExpandedCategories] = useState({
    '1': true,
  });

  const toggleCategory = (id) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="space-y-3.5 mt-4">
      {categories.map((category) => {
        const isExpanded = !!expandedCategories[category.id];

        return (
          <div
            key={category.id}
            className="border border-gray-200/80 rounded-md overflow-hidden bg-white shadow-2xs transition-all"
          >
            {/* Category Accordion Header */}
            <button
              type="button"
              onClick={() => toggleCategory(category.id)}
              className="w-full flex items-center justify-between px-5 py-3.5 bg-[#f0f0f0] hover:bg-[#e8e8e8] transition-colors cursor-pointer text-left"
              aria-expanded={isExpanded}
            >
              <div className="flex items-center space-x-3">
                <span className="font-bold text-gray-900 text-sm tracking-wide">
                  {category.displayName}
                </span>
                <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 text-xs font-bold text-white bg-[#ec5a37] rounded-full shadow-2xs">
                  {category.totalCount}
                </span>
              </div>
              <div className="text-gray-600">
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-700" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-700" />
                )}
              </div>
            </button>

            {/* Accordion Content */}
            {isExpanded && (
              <div className="p-6 bg-white border-t border-gray-100">
                {category.isCustom ? (
                  /* Custom Items Section */
                  <div>
                    {category.customItems && category.customItems.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {category.customItems.map((cItem) => (
                          <div
                            key={cItem.id}
                            className="p-4 rounded-md border border-gray-200 bg-gray-50/60 flex items-start justify-between"
                          >
                            <div className="space-y-1">
                              <h5 className="font-bold text-gray-900 capitalize text-sm">
                                {cItem.item_name}
                              </h5>
                              {(cItem.item_length || cItem.item_width || cItem.item_height) && (
                                <p className="text-xs text-gray-600">
                                  Dimensions: {cItem.item_length || '0'}L x{' '}
                                  {cItem.item_width || '0'}W x {cItem.item_height || '0'}H ft
                                </p>
                              )}
                              {cItem.item_description && (
                                <p className="text-xs text-gray-500 italic">
                                  "{cItem.item_description}"
                                </p>
                              )}
                            </div>
                            <div className="text-right">
                              <span className="text-xs text-gray-400 block font-medium">Qty</span>
                              <span className="text-base font-extrabold text-gray-900">
                                {cItem.item_qty}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-6 text-center text-gray-400 text-sm italic">
                        No custom items specified for this move.
                      </div>
                    )}
                  </div>
                ) : category.subcategories && category.subcategories.length > 0 ? (
                  /* Regular Inventory Subcategories Grid */
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
                    {category.subcategories.map((subcat, idx) => (
                      <div key={idx} className="space-y-4">
                        {/* Subcategory Name */}
                        <h4 className="font-bold text-gray-900 text-base pb-1 border-b border-gray-100">
                          {subcat.name}
                        </h4>

                        {/* Items under subcategory */}
                        <ul className="space-y-3.5">
                          {subcat.items.map((item) => (
                            <li
                              key={item.id}
                              className="flex items-start justify-between gap-4 text-sm"
                            >
                              <div className="pr-2">
                                <p className="text-gray-900 font-medium leading-tight">
                                  {item.name}
                                </p>
                                {item.specification && (
                                  <p className="text-xs font-semibold text-gray-500 mt-0.5 leading-tight">
                                    {item.specification}
                                  </p>
                                )}
                              </div>
                              <span className="font-extrabold text-gray-900 text-sm shrink-0">
                                {item.qty}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-6 text-center text-gray-400 text-sm italic">
                    No items selected in {category.displayName}.
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
