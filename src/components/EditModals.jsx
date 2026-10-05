import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Calendar } from 'lucide-react';

// 1. Edit Additional Notes Modal
export const EditNotesModal = ({ isOpen, onClose, estimate, onSave }) => {
  const [oldNotes, setOldNotes] = useState(estimate?.old_house_additional_info || '');
  const [newNotes, setNewNotes] = useState(estimate?.new_house_additional_info || '');

  useEffect(() => {
    if (estimate) {
      setOldNotes(estimate.old_house_additional_info || '');
      setNewNotes(estimate.new_house_additional_info || '');
    }
  }, [estimate]);

  if (!isOpen || !estimate) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-bold text-gray-900 text-base">Edit Additional Information</h3>
          <button onClick={onClose} className="p-1 rounded-md text-gray-400 hover:text-gray-700 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Existing House Special Instructions
            </label>
            <textarea
              rows={3}
              value={oldNotes}
              onChange={(e) => setOldNotes(e.target.value)}
              placeholder="e.g. Narrow hallway, fragile glass cabinets on 2nd floor..."
              className="w-full text-xs p-2.5 rounded border border-gray-300 focus:outline-none focus:border-[#ec5a37] focus:ring-1 focus:ring-[#ec5a37]"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              New House Special Instructions
            </label>
            <textarea
              rows={3}
              value={newNotes}
              onChange={(e) => setNewNotes(e.target.value)}
              placeholder="e.g. Society permission required after 6 PM, elevator key with guard..."
              className="w-full text-xs p-2.5 rounded border border-gray-300 focus:outline-none focus:border-[#ec5a37] focus:ring-1 focus:ring-[#ec5a37]"
            />
          </div>
        </div>
        <div className="px-6 py-3.5 bg-gray-50 flex justify-end space-x-2 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 rounded cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onSave({ oldNotes, newNotes });
              onClose();
            }}
            className="px-5 py-2 text-xs font-semibold text-white bg-[#ec5a37] hover:bg-[#d84826] rounded cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

// 2. Edit House Details Modal
export const EditHouseDetailsModal = ({ isOpen, onClose, estimate, onSave }) => {
  const [form, setForm] = useState({
    old_floor_no: '',
    old_elevator_availability: 'Yes',
    old_parking_distance: '',
    new_floor_no: '',
    new_elevator_availability: 'Yes',
    new_parking_distance: '',
  });

  useEffect(() => {
    if (estimate) {
      setForm({
        old_floor_no: String(estimate.old_floor_no ?? '11'),
        old_elevator_availability: estimate.old_elevator_availability || 'Yes',
        old_parking_distance: estimate.old_parking_distance || '11 meters',
        new_floor_no: String(estimate.new_floor_no ?? '11'),
        new_elevator_availability: estimate.new_elevator_availability || 'Yes',
        new_parking_distance: estimate.new_parking_distance || '11 meters',
      });
    }
  }, [estimate]);

  if (!isOpen || !estimate) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-xl overflow-hidden border border-gray-100 max-h-[90vh] flex flex-col">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-bold text-gray-900 text-base">Edit House Details</h3>
          <button onClick={onClose} className="p-1 rounded-md text-gray-400 hover:text-gray-700 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Existing House */}
          <div>
            <h4 className="text-sm font-bold text-[#ec5a37] mb-3">Existing House Details</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Floor No.</label>
                <input
                  type="text"
                  value={form.old_floor_no}
                  onChange={(e) => setForm({ ...form, old_floor_no: e.target.value })}
                  className="w-full text-xs p-2 rounded border border-gray-300 focus:outline-none focus:border-[#ec5a37]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Elevator Available</label>
                <select
                  value={form.old_elevator_availability}
                  onChange={(e) => setForm({ ...form, old_elevator_availability: e.target.value })}
                  className="w-full text-xs p-2 rounded border border-gray-300 focus:outline-none focus:border-[#ec5a37] bg-white"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Truck Distance</label>
                <input
                  type="text"
                  value={form.old_parking_distance}
                  onChange={(e) => setForm({ ...form, old_parking_distance: e.target.value })}
                  className="w-full text-xs p-2 rounded border border-gray-300 focus:outline-none focus:border-[#ec5a37]"
                />
              </div>
            </div>
          </div>

          {/* New House */}
          <div>
            <h4 className="text-sm font-bold text-[#ec5a37] mb-3">New House Details</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Floor No.</label>
                <input
                  type="text"
                  value={form.new_floor_no}
                  onChange={(e) => setForm({ ...form, new_floor_no: e.target.value })}
                  className="w-full text-xs p-2 rounded border border-gray-300 focus:outline-none focus:border-[#ec5a37]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Elevator Available</label>
                <select
                  value={form.new_elevator_availability}
                  onChange={(e) => setForm({ ...form, new_elevator_availability: e.target.value })}
                  className="w-full text-xs p-2 rounded border border-gray-300 focus:outline-none focus:border-[#ec5a37] bg-white"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Truck Distance</label>
                <input
                  type="text"
                  value={form.new_parking_distance}
                  onChange={(e) => setForm({ ...form, new_parking_distance: e.target.value })}
                  className="w-full text-xs p-2 rounded border border-gray-300 focus:outline-none focus:border-[#ec5a37]"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="px-6 py-3.5 bg-gray-50 flex justify-end space-x-2 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 rounded cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onSave(form);
              onClose();
            }}
            className="px-5 py-2 text-xs font-semibold text-white bg-[#ec5a37] hover:bg-[#d84826] rounded cursor-pointer"
          >
            Save House Details
          </button>
        </div>
      </div>
    </div>
  );
};

// 3. Edit Inventory Modal
export const EditInventoryModal = ({ isOpen, onClose, estimate, onSave }) => {
  const [itemsData, setItemsData] = useState({ inventory: [] });
  const [newCustomName, setNewCustomName] = useState('');
  const [newCustomQty, setNewCustomQty] = useState('1');
  const [newCustomDesc, setNewCustomDesc] = useState('');

  useEffect(() => {
    if (estimate?.items) {
      setItemsData(JSON.parse(JSON.stringify(estimate.items)));
    }
  }, [estimate]);

  if (!isOpen || !estimate) return null;

  // Change quantity of regular item
  const updateQty = (sectionId, catId, itemId, delta) => {
    setItemsData((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      for (const sec of copy.inventory) {
        if (sec.id === sectionId || sec.name === sectionId) {
          for (const cat of sec.category) {
            if (cat.id === catId || cat.name === catId) {
              for (const it of cat.items) {
                if (it.id === itemId) {
                  const current = Number(it.qty) || 0;
                  it.qty = Math.max(0, current + delta);
                }
              }
            }
          }
        }
      }
      return copy;
    });
  };

  // Add custom item
  const addCustomItem = () => {
    if (!newCustomName.trim()) return;
    const newItem = {
      id: 'custom_' + Date.now(),
      item_name: newCustomName.trim(),
      item_qty: Number(newCustomQty) || 1,
      item_description: newCustomDesc.trim(),
    };
    setItemsData((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      if (!copy.customItems) copy.customItems = { units: 'feet', items: [] };
      if (!Array.isArray(copy.customItems.items)) copy.customItems.items = [];
      copy.customItems.items.push(newItem);
      return copy;
    });
    setNewCustomName('');
    setNewCustomQty('1');
    setNewCustomDesc('');
  };

  // Delete custom item
  const removeCustomItem = (id) => {
    setItemsData((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      if (copy.customItems?.items) {
        copy.customItems.items = copy.customItems.items.filter((it) => it.id !== id);
      }
      return copy;
    });
  };

  const handleSave = () => {
    // Calculate total count
    let total = 0;
    for (const sec of itemsData.inventory || []) {
      for (const cat of sec.category || []) {
        for (const it of cat.items || []) {
          total += Number(it.qty) || 0;
        }
      }
    }
    for (const ci of itemsData.customItems?.items || []) {
      total += Number(ci.item_qty) || 0;
    }
    onSave(itemsData, total);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden border border-gray-100 max-h-[90vh] flex flex-col">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-bold text-gray-900 text-base">Edit Move Inventory</h3>
          <button onClick={onClose} className="p-1 rounded-md text-gray-400 hover:text-gray-700 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          <p className="text-xs text-gray-600">
            Adjust quantities of active inventory items below, or add custom household goods.
          </p>

          {/* Active Items List with +/- buttons */}
          <div className="space-y-4">
            {itemsData.inventory?.map((sec) => (
              <div key={sec.id || sec.name} className="border border-gray-100 rounded p-3 bg-gray-50/50">
                <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider mb-2">
                  {sec.displayName}
                </h4>
                <div className="space-y-2">
                  {sec.category?.flatMap((cat) =>
                    cat.items
                      ?.filter((it) => Number(it.qty) > 0 || (it.type && it.type.some((t) => t.selected)))
                      .map((it) => (
                        <div
                          key={it.id}
                          className="flex items-center justify-between bg-white p-2 rounded border border-gray-200 text-xs"
                        >
                          <div>
                            <span className="font-medium text-gray-800">{it.displayName}</span>
                            <span className="text-gray-400 ml-2">({cat.displayName})</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              type="button"
                              onClick={() => updateQty(sec.id, cat.id, it.id, -1)}
                              className="w-6 h-6 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold flex items-center justify-center cursor-pointer"
                            >
                              -
                            </button>
                            <span className="w-6 text-center font-bold text-gray-900">
                              {it.qty || 0}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQty(sec.id, cat.id, it.id, 1)}
                              className="w-6 h-6 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold flex items-center justify-center cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      ))
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Custom Items */}
          <div className="border border-gray-200 rounded p-4 bg-white">
            <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider mb-3">
              Add Custom Item (Large Art, Aquarium, Pianos, etc.)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2">
              <input
                type="text"
                placeholder="Item Name (e.g. Fish Tank)"
                value={newCustomName}
                onChange={(e) => setNewCustomName(e.target.value)}
                className="text-xs p-2 border border-gray-300 rounded focus:outline-none focus:border-[#ec5a37]"
              />
              <input
                type="number"
                min="1"
                placeholder="Qty"
                value={newCustomQty}
                onChange={(e) => setNewCustomQty(e.target.value)}
                className="text-xs p-2 border border-gray-300 rounded focus:outline-none focus:border-[#ec5a37]"
              />
              <button
                type="button"
                onClick={addCustomItem}
                className="bg-[#ec5a37] text-white text-xs font-semibold px-3 py-2 rounded hover:bg-[#d84826] cursor-pointer flex items-center justify-center gap-1"
              >
                <Plus className="w-4 h-4" /> Add Item
              </button>
            </div>
            <input
              type="text"
              placeholder="Description or Dimensions (optional)"
              value={newCustomDesc}
              onChange={(e) => setNewCustomDesc(e.target.value)}
              className="w-full text-xs p-2 border border-gray-300 rounded focus:outline-none focus:border-[#ec5a37]"
            />

            {/* List of custom items */}
            {itemsData.customItems?.items && itemsData.customItems.items.length > 0 && (
              <div className="mt-3 space-y-1.5 border-t border-gray-100 pt-3">
                {itemsData.customItems.items.map((ci) => (
                  <div
                    key={ci.id}
                    className="flex items-center justify-between text-xs p-2 bg-gray-50 rounded"
                  >
                    <div>
                      <span className="font-bold text-gray-800">{ci.item_name}</span> (Qty: {ci.item_qty})
                      {ci.item_description && <span className="text-gray-500 ml-2 italic"> - {ci.item_description}</span>}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeCustomItem(ci.id)}
                      className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                      title="Remove custom item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="px-6 py-3.5 bg-gray-50 flex justify-end space-x-2 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 rounded cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 text-xs font-semibold text-white bg-[#ec5a37] hover:bg-[#d84826] rounded cursor-pointer"
          >
            Apply & Save Inventory
          </button>
        </div>
      </div>
    </div>
  );
};

// 4. Date Picker Modal
export const DatePickerModal = ({ isOpen, onClose, estimate, onSaveDate }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('10:00');

  useEffect(() => {
    if (estimate?.moving_on) {
      const d = new Date(estimate.moving_on.replace(' ', 'T'));
      if (!isNaN(d.getTime())) {
        setSelectedDate(d.toISOString().slice(0, 10));
        setSelectedTime(
          `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
        );
      } else {
        setSelectedDate('2021-11-10');
      }
    }
  }, [estimate]);

  if (!isOpen || !estimate) return null;

  const handleSave = () => {
    if (!selectedDate) return;
    const finalStr = `${selectedDate} ${selectedTime}:00`;
    onSaveDate(finalStr);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm overflow-hidden border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-[#ec5a37]" />
            <h3 className="font-bold text-gray-900 text-sm">Reschedule Move Date</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-md text-gray-400 hover:text-gray-700 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Select Shifting Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full text-xs p-2.5 rounded border border-gray-300 focus:outline-none focus:border-[#ec5a37]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Select Preferred Time
            </label>
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full text-xs p-2.5 rounded border border-gray-300 focus:outline-none focus:border-[#ec5a37]"
            />
          </div>
          <p className="text-[11px] text-gray-500 leading-normal">
            * Remember: Disclaimer requires move date update at least two days prior to the shifting date.
          </p>
        </div>
        <div className="px-6 py-3 bg-gray-50 flex justify-end space-x-2 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 rounded cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#ec5a37] hover:bg-[#d84826] rounded cursor-pointer"
          >
            Update Date
          </button>
        </div>
      </div>
    </div>
  );
};
