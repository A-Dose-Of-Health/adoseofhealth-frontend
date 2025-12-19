import React, { useState } from "react";

const tabs = ["All", "Videos", "Podcasts", "Articles", "Games"];

export default function FrostedTabs() {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="overflow-x-auto py-6 bottom-0">
      {/* Tabs container */}
      <div
        role="tablist"
        aria-orientation="horizontal"
        className="flex flex-col sm:flex-row flex-wrap gap-4 max-w-[72%] mx-auto rounded-xl sm:rounded-full bg-primary/5 backdrop-blur-2xl shadow-sm text-lg font-medium text-primary justify-center p-1"
      >
        {tabs.map((tab) => {
          const isActive = tab === activeTab;
          return (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`tab-${tab.toLowerCase()}`}
              onClick={() => setActiveTab(tab)}
              className={`
                flex-1 flex items-center justify-center gap-2
                rounded-lg sm:rounded-full
                px-6 py-2 transition relative
                border-2 border-transparent
                ${
                  isActive
                    ? "bg-primary text-white backdrop-blur-lg shadow-[0_0_20px_2px_rgba(255,255,255,0.2)]"
                    : "bg-transparent text-gray-700 dark:text-gray-300 hover:ring-1 hover:ring-primary"
                }
              `}
            >
              {tab}
            </button>
          );
        })}
      </div>
    </div>
  );
}
