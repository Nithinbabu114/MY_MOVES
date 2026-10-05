import React from 'react';
import { Truck, User, Calculator, LogOut, X } from 'lucide-react';

export const Sidebar = ({
  activeTab,
  setActiveTab,
  isOpenMobile,
  setIsOpenMobile,
  onLogoutClick,
}) => {
  const navItems = [
    {
      id: 'my-moves',
      label: 'MY MOVES',
      icon: Truck,
    },
    {
      id: 'my-profile',
      label: 'MY PROFILE',
      icon: User,
    },
    {
      id: 'get-quote',
      label: 'GET QUOTE',
      icon: Calculator,
    },
    {
      id: 'logout',
      label: 'LOGOUT',
      icon: LogOut,
      isAction: true,
    },
  ];

  const handleNavClick = (item) => {
    if (item.isAction) {
      onLogoutClick();
    } else {
      setActiveTab(item.id);
    }
    setIsOpenMobile(false);
  };

  const navContent = (
    <div className="flex flex-col h-full bg-white select-none">
      {/* Brand header / spacing */}
      <div className="py-6 px-6 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded bg-[#ec5a37] flex items-center justify-center text-white shadow-sm font-bold text-lg">
            M
          </div>
          <span className="font-extrabold tracking-tight text-gray-900 text-lg">
            MOVERS<span className="text-[#ec5a37]">&</span>CO
          </span>
        </div>
        <button
          onClick={() => setIsOpenMobile(false)}
          className="md:hidden p-1.5 rounded-lg text-gray-500 hover:bg-gray-100"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Nav List */}
      <nav className="flex-1 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item)}
              className={`w-full flex items-center px-6 py-4 text-sm font-bold tracking-wider transition-all duration-150 relative text-left ${
                isActive
                  ? 'text-gray-950 font-extrabold bg-orange-50/50'
                  : 'text-gray-700 hover:text-gray-950 hover:bg-gray-50'
              }`}
            >
              {/* Active Red indicator bar on left edge */}
              {isActive && (
                <span className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#ec5a37] rounded-r" />
              )}

              <Icon
                className={`w-5 h-5 mr-4 shrink-0 transition-colors ${
                  isActive ? 'text-gray-950 stroke-[2.4]' : 'text-gray-600 stroke-[2]'
                }`}
              />
              <span className="tracking-wide text-[13px]">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer subtle version info */}
      <div className="p-6 text-xs text-gray-400 border-t border-gray-100">
        <p className="font-medium text-gray-500">Live API Connected</p>
        <p className="text-[11px] text-gray-400 mt-0.5">Fast, verified movers in Bengaluru</p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 shrink-0 border-r border-gray-200/80 bg-white min-h-screen sticky top-0 self-start shadow-sm z-20">
        {navContent}
      </aside>

      {/* Mobile Drawer Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 md:hidden"
          onClick={() => setIsOpenMobile(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 bottom-0 left-0 w-72 bg-white z-50 shadow-2xl transform transition-transform duration-300 md:hidden ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {navContent}
      </div>
    </>
  );
};
