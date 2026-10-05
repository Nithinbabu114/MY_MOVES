import React from 'react';
import { LogOut } from 'lucide-react';

export const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm overflow-hidden border border-gray-100 p-6 text-center space-y-4">
        <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
          <LogOut className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-bold text-gray-900">Sign Out</h3>
          <p className="text-xs text-gray-500">
            Are you sure you want to sign out of your Packers & Movers account?
          </p>
        </div>
        <div className="flex items-center justify-center space-x-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 rounded border border-gray-200 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-5 py-2 text-xs font-semibold text-white bg-[#ec5a37] hover:bg-[#d84826] rounded cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};
