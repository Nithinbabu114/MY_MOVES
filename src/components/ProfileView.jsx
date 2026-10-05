import React from 'react';
import { MapPin, Phone, Mail, CheckCircle2 } from 'lucide-react';

export const ProfileView = ({ estimates }) => {
  const first = estimates[0];
  const userName = first?.from_address?.firstName
    ? `${first.from_address.firstName} ${first.from_address.lastName || ''}`.trim()
    : 'Salman Dev';

  return (
    <div className="max-w-4xl space-y-6 animate-fadeIn">
      {/* Header Profile Card */}
      <div className="bg-white rounded-lg border border-gray-200/80 p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-2xs">
        <div className="w-20 h-20 rounded-full bg-linear-to-tr from-[#ec5a37] to-orange-400 text-white flex items-center justify-center text-3xl font-bold shadow-md shrink-0">
          {userName.charAt(0)}
        </div>
        <div className="flex-1 text-center sm:text-left space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{userName}</h2>
              <p className="text-xs text-gray-500 font-medium">Customer ID: {first?.user_id || 'C47795'}</p>
            </div>
            <span className="inline-flex items-center text-xs font-semibold px-3 py-1 bg-green-50 text-green-700 rounded-full border border-green-200 self-center sm:self-auto">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Verified Account
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-gray-600">
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-gray-400" />
              <span>salman.dev@example.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-gray-400" />
              <span>+91 98765 43210</span>
            </div>
          </div>
        </div>
      </div>

      {/* Saved Relocation Addresses */}
      <div className="bg-white rounded-lg border border-gray-200/80 p-6 shadow-2xs space-y-4">
        <h3 className="font-bold text-gray-900 text-base">Saved Moving Locations</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border border-gray-200 bg-gray-50/50 space-y-1">
            <div className="flex items-center space-x-2 text-xs font-bold text-[#ec5a37]">
              <MapPin className="w-4 h-4" />
              <span>Default Origin (Koramangala)</span>
            </div>
            <p className="text-xs text-gray-700">
              {first?.moving_from || 'Koramangala 4th Block, Bengaluru, Karnataka - 560011'}
            </p>
          </div>
          <div className="p-4 rounded-lg border border-gray-200 bg-gray-50/50 space-y-1">
            <div className="flex items-center space-x-2 text-xs font-bold text-blue-600">
              <MapPin className="w-4 h-4" />
              <span>Primary Destination (Ejipura)</span>
            </div>
            <p className="text-xs text-gray-700">
              {first?.moving_to || 'Ejipura Main Road, Viveknagar, Bengaluru, Karnataka - 560022'}
            </p>
          </div>
        </div>
      </div>

      {/* Move Statistics */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-lg border border-gray-200 text-center shadow-2xs">
          <span className="text-2xl font-extrabold text-[#ec5a37] block">
            {estimates.length}
          </span>
          <span className="text-xs font-semibold text-gray-600">Total Move Requests</span>
        </div>
        <div className="bg-white p-5 rounded-lg border border-gray-200 text-center shadow-2xs">
          <span className="text-2xl font-extrabold text-gray-900 block">5</span>
          <span className="text-xs font-semibold text-gray-600">Completed Shifts</span>
        </div>
        <div className="bg-white p-5 rounded-lg border border-gray-200 text-center shadow-2xs">
          <span className="text-2xl font-extrabold text-green-600 block">100%</span>
          <span className="text-xs font-semibold text-gray-600">Satisfaction Score</span>
        </div>
      </div>
    </div>
  );
};
