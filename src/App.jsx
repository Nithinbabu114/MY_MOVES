import React, { useState, useEffect } from 'react';
import { Menu, RefreshCw, Search, AlertCircle } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { MoveCard } from './components/MoveCard';
import {
  EditNotesModal,
  EditHouseDetailsModal,
  EditInventoryModal,
  DatePickerModal,
} from './components/EditModals';
import { QuotesModal } from './components/QuotesModal';
import { ProfileView } from './components/ProfileView';
import { GetQuoteView } from './components/GetQuoteView';
import { LogoutModal } from './components/LogoutModal';
import { fallbackData } from './data/fallbackData';

const API_URL = 'https://apis2.ccbp.in/packers-and-movers/packers-and-movers-details';

export default function App() {
  const [activeTab, setActiveTab] = useState('my-moves');
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const [estimates, setEstimates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [editingNotesEstimate, setEditingNotesEstimate] = useState(null);
  const [editingHouseEstimate, setEditingHouseEstimate] = useState(null);
  const [editingInventoryEstimate, setEditingInventoryEstimate] = useState(null);
  const [editingDateEstimate, setEditingDateEstimate] = useState(null);
  const [viewingQuotesEstimate, setViewingQuotesEstimate] = useState(null);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  // Fetch API data on load
  const fetchMoves = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data && Array.isArray(data.Customer_Estimate_Flow)) {
        setEstimates(data.Customer_Estimate_Flow);
      } else {
        throw new Error('Unexpected API response structure');
      }
    } catch (err) {
      console.warn('Live API request failed, loading guaranteed fallback data:', err);
      // Graceful fallback to cached API response
      if (fallbackData && Array.isArray(fallbackData.Customer_Estimate_Flow)) {
        setEstimates(fallbackData.Customer_Estimate_Flow);
      } else {
        setError('Could not load moves data. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMoves();
  }, []);

  // Update an estimate in state
  const handleUpdateEstimate = (updated) => {
    setEstimates((prev) =>
      prev.map((item) => (item.estimate_id === updated.estimate_id ? updated : item))
    );
  };

  // Add new estimate from "Get Quote" tab
  const handleAddEstimate = (newEstimate) => {
    setEstimates((prev) => [newEstimate, ...prev]);
  };

  // Filter moves
  const filteredEstimates = estimates.filter((e) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      e.estimate_id.toLowerCase().includes(q) ||
      e.moving_from.toLowerCase().includes(q) ||
      e.moving_to.toLowerCase().includes(q) ||
      e.property_size.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col md:flex-row font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpenMobile={isOpenMobile}
        setIsOpenMobile={setIsOpenMobile}
        onLogoutClick={() => setIsLogoutOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 flex flex-col min-h-screen">
        {/* Top bar on mobile */}
        <header className="md:hidden bg-white border-b border-gray-200 px-4 py-3.5 flex items-center justify-between sticky top-0 z-10 shadow-2xs">
          <button
            onClick={() => setIsOpenMobile(true)}
            className="p-1.5 rounded-md text-gray-700 hover:bg-gray-100 cursor-pointer"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-extrabold text-gray-900 tracking-tight text-base">
            MOVERS<span className="text-[#ec5a37]">&</span>CO
          </span>
          <button
            onClick={fetchMoves}
            disabled={loading}
            className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 cursor-pointer"
            title="Reload moves from API"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-[#ec5a37]' : ''}`} />
          </button>
        </header>

        {/* Content Container */}
        <div className="flex-1 p-4 sm:p-8 lg:p-10 max-w-6xl w-full mx-auto">
          {activeTab === 'my-moves' && (
            <div className="space-y-6">
              {/* Header Row matching image.png */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
                <div>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-gray-950 tracking-tight">
                    My Moves
                  </h1>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Manage active shifting estimates, verify inventory, and track mover quotes
                  </p>
                </div>

                {/* Search & Refresh controls */}
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
                    <input
                      type="text"
                      placeholder="Search Request# or city..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8 pr-3 py-1.5 text-xs bg-white border border-gray-200 rounded-md focus:outline-none focus:border-[#ec5a37] w-48 sm:w-56 shadow-2xs"
                    />
                  </div>
                  <button
                    onClick={fetchMoves}
                    disabled={loading}
                    title="Refresh data from API"
                    className="p-1.5 bg-white border border-gray-200 text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-50 transition cursor-pointer shadow-2xs"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#ec5a37]' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Status or Error Banner if applicable */}
              {error && (
                <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                  <button
                    onClick={fetchMoves}
                    className="text-xs font-bold underline hover:no-underline cursor-pointer"
                  >
                    Retry
                  </button>
                </div>
              )}

              {/* Moves List Card Container */}
              <div className="bg-white rounded-xl border border-gray-200/80 shadow-2xs p-4 sm:p-8">
                {loading ? (
                  /* Loading Skeletons */
                  <div className="space-y-8 py-4">
                    {[1, 2, 3].map((n) => (
                      <div key={n} className="space-y-4 animate-pulse">
                        <div className="grid grid-cols-12 gap-4">
                          <div className="col-span-5 h-4 bg-gray-200 rounded w-3/4"></div>
                          <div className="col-span-1 h-8 w-8 bg-gray-200 rounded-full mx-auto"></div>
                          <div className="col-span-4 h-4 bg-gray-200 rounded w-3/4"></div>
                          <div className="col-span-2 h-4 bg-gray-200 rounded w-1/2 ml-auto"></div>
                        </div>
                        <div className="h-8 bg-gray-100 rounded w-full"></div>
                        <div className="h-4 bg-gray-100 rounded w-1/3"></div>
                      </div>
                    ))}
                  </div>
                ) : filteredEstimates.length > 0 ? (
                  <div>
                    {filteredEstimates.map((estimate) => (
                      <MoveCard
                        key={estimate.estimate_id}
                        estimate={estimate}
                        onUpdateEstimate={handleUpdateEstimate}
                        onOpenQuotes={(est) => setViewingQuotesEstimate(est)}
                        onOpenDatePicker={(est) => setEditingDateEstimate(est)}
                        onOpenEditNotes={(est) => setEditingNotesEstimate(est)}
                        onOpenEditHouse={(est) => setEditingHouseEstimate(est)}
                        onOpenEditInventory={(est) => setEditingInventoryEstimate(est)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center space-y-3">
                    <p className="text-gray-500 text-sm">No moves found matching "{searchQuery}"</p>
                    <button
                      onClick={() => setSearchQuery('')}
                      className="text-xs font-bold text-[#ec5a37] hover:underline cursor-pointer"
                    >
                      Clear search filter
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'my-profile' && <ProfileView estimates={estimates} />}

          {activeTab === 'get-quote' && (
            <GetQuoteView
              onAddEstimate={handleAddEstimate}
              onNavigateToMoves={() => setActiveTab('my-moves')}
            />
          )}
        </div>
      </main>

      {/* Edit Notes Modal */}
      <EditNotesModal
        isOpen={!!editingNotesEstimate}
        estimate={editingNotesEstimate}
        onClose={() => setEditingNotesEstimate(null)}
        onSave={({ oldNotes, newNotes }) => {
          if (editingNotesEstimate) {
            handleUpdateEstimate({
              ...editingNotesEstimate,
              old_house_additional_info: oldNotes,
              new_house_additional_info: newNotes,
            });
          }
        }}
      />

      {/* Edit House Details Modal */}
      <EditHouseDetailsModal
        isOpen={!!editingHouseEstimate}
        estimate={editingHouseEstimate}
        onClose={() => setEditingHouseEstimate(null)}
        onSave={(details) => {
          if (editingHouseEstimate) {
            handleUpdateEstimate({
              ...editingHouseEstimate,
              ...details,
            });
          }
        }}
      />

      {/* Edit Inventory Modal */}
      <EditInventoryModal
        isOpen={!!editingInventoryEstimate}
        estimate={editingInventoryEstimate}
        onClose={() => setEditingInventoryEstimate(null)}
        onSave={(updatedItems, newTotal) => {
          if (editingInventoryEstimate) {
            handleUpdateEstimate({
              ...editingInventoryEstimate,
              items: updatedItems,
              total_items: newTotal,
            });
          }
        }}
      />

      {/* Reschedule Date Modal */}
      <DatePickerModal
        isOpen={!!editingDateEstimate}
        estimate={editingDateEstimate}
        onClose={() => setEditingDateEstimate(null)}
        onSaveDate={(newDate) => {
          if (editingDateEstimate) {
            handleUpdateEstimate({
              ...editingDateEstimate,
              moving_on: newDate,
            });
          }
        }}
      />

      {/* Quotes Status Modal */}
      <QuotesModal
        isOpen={!!viewingQuotesEstimate}
        estimate={viewingQuotesEstimate}
        onClose={() => setViewingQuotesEstimate(null)}
      />

      {/* Logout Confirmation Modal */}
      <LogoutModal
        isOpen={isLogoutOpen}
        onClose={() => setIsLogoutOpen(false)}
        onConfirm={() => {
          setActiveTab('my-moves');
        }}
      />
    </div>
  );
}
