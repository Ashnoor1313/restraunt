import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Armchair } from 'lucide-react';

const tablesConfig = [
  // Window Side Zone (Premium)
  { id: 1, x: 50, y: 70, capacity: 2, zone: 'Window View', priceMultiplier: 1.2 },
  { id: 2, x: 120, y: 70, capacity: 4, zone: 'Window View', priceMultiplier: 1.2 },
  { id: 3, x: 190, y: 70, capacity: 2, zone: 'Window View', priceMultiplier: 1.2 },
  
  // Main Hall Zone
  { id: 4, x: 50, y: 180, capacity: 4, zone: 'Main Hall', priceMultiplier: 1.0 },
  { id: 5, x: 120, y: 180, capacity: 6, zone: 'Main Hall', priceMultiplier: 1.0 },
  { id: 6, x: 190, y: 180, capacity: 4, zone: 'Main Hall', priceMultiplier: 1.0 },
  
  // Terrace Garden (Al Fresco)
  { id: 7, x: 300, y: 70, capacity: 4, zone: 'Terrace Garden', priceMultiplier: 1.1 },
  { id: 8, x: 370, y: 70, capacity: 2, zone: 'Terrace Garden', priceMultiplier: 1.1 },
  { id: 9, x: 300, y: 180, capacity: 4, zone: 'Terrace Garden', priceMultiplier: 1.1 },
  
  // Chef's Counter (VIP)
  { id: 10, x: 480, y: 100, capacity: 2, zone: "Chef's Counter", priceMultiplier: 1.3 },
  { id: 11, x: 480, y: 150, capacity: 2, zone: "Chef's Counter", priceMultiplier: 1.3 }
];

const TableLayout = ({ selectedTable, onSelectTable, occupiedTables = [] }) => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h4 className="text-sm font-bold uppercase tracking-widest text-theme-accent">Select Dining Zone & Table</h4>
        <p className="text-xs text-theme-text-muted max-w-sm mx-auto font-light leading-relaxed">
          Hover over tables to check capacities. Premium tables may incur service adjustments.
        </p>
      </div>

      {/* SVG Interactive Restaurant Layout */}
      <div className="w-full overflow-x-auto pb-4 bg-theme-bg/60 border border-theme-card-border/30 rounded-3xl p-6 relative">
        <div className="min-w-[550px] aspect-[100/40] relative">
          <svg viewBox="0 0 580 250" className="w-full h-full">
            {/* Background grid lines */}
            <line x1="260" y1="20" x2="260" y2="230" stroke="rgba(212, 175, 55, 0.1)" strokeDasharray="4 4" />
            <line x1="440" y1="20" x2="440" y2="230" stroke="rgba(212, 175, 55, 0.1)" strokeDasharray="4 4" />
            
            {/* Zone Titles */}
            <text x="120" y="30" fill="var(--theme-accent)" fontSize="9" fontWeight="bold" letterSpacing="1" textAnchor="middle">WINDOW VIEW</text>
            <text x="120" y="235" fill="var(--theme-text-muted)" fontSize="8" textAnchor="middle">MAIN DINING FLOOR</text>
            <text x="350" y="30" fill="var(--theme-accent)" fontSize="9" fontWeight="bold" letterSpacing="1" textAnchor="middle">TERRACE GARDEN</text>
            <text x="510" y="50" fill="var(--theme-accent)" fontSize="9" fontWeight="bold" letterSpacing="1" textAnchor="middle">CHEF COUNTER</text>

            {/* Render Tables */}
            {tablesConfig.map((t) => {
              const isOccupied = occupiedTables.includes(t.id);
              const isSelected = selectedTable === t.id;
              
              // Colors based on state
              let fillColor = 'rgba(255,255,255,0.05)';
              let strokeColor = 'rgba(212, 175, 55, 0.3)';
              
              if (isOccupied) {
                fillColor = 'rgba(239, 68, 68, 0.1)';
                strokeColor = 'rgba(239, 68, 68, 0.5)';
              } else if (isSelected) {
                fillColor = 'var(--theme-accent)';
                strokeColor = 'var(--theme-accent)';
              }

              return (
                <g
                  key={t.id}
                  onClick={() => !isOccupied && onSelectTable(t.id)}
                  className={`${isOccupied ? 'cursor-not-allowed' : 'cursor-pointer'} group`}
                >
                  {/* Table Shape (Circle or Rectangle depending on size) */}
                  <motion.circle
                    cx={t.x}
                    cy={t.y}
                    r={t.capacity > 4 ? 20 : 16}
                    fill={fillColor}
                    stroke={strokeColor}
                    strokeWidth="1.5"
                    whileHover={!isOccupied ? { scale: 1.1 } : {}}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  />
                  
                  {/* Table Label */}
                  <text
                    x={t.x}
                    y={t.y + 4}
                    fill={isSelected && !isOccupied ? 'var(--theme-bg)' : 'var(--theme-text)'}
                    fontSize="9"
                    fontWeight="bold"
                    textAnchor="middle"
                    pointerEvents="none"
                  >
                    T{t.id}
                  </text>

                  {/* Micro chairs drawn around circle */}
                  <circle cx={t.x - 20} cy={t.y} r="2.5" fill={strokeColor} />
                  <circle cx={t.x + 20} cy={t.y} r="2.5" fill={strokeColor} />
                  {t.capacity >= 4 && (
                    <>
                      <circle cx={t.x} cy={t.y - 20} r="2.5" fill={strokeColor} />
                      <circle cx={t.x} cy={t.y + 20} r="2.5" fill={strokeColor} />
                    </>
                  )}
                  {t.capacity >= 6 && (
                    <>
                      <circle cx={t.x - 14} cy={t.y - 14} r="2.5" fill={strokeColor} />
                      <circle cx={t.x + 14} cy={t.y + 14} r="2.5" fill={strokeColor} />
                    </>
                  )}

                  {/* Simple Tooltip on SVG hover */}
                  <title>
                    {`Table ${t.id} - ${t.capacity} Guests (${t.zone})${isOccupied ? ' - RESERVED' : ''}`}
                  </title>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Legend details */}
      <div className="flex justify-center gap-6 text-xs text-theme-text-muted">
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 rounded-full border border-theme-accent bg-transparent" />
          <span>Available</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 rounded-full bg-theme-accent border border-theme-accent" />
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 rounded-full bg-red-500/10 border border-red-500/50" />
          <span>Reserved</span>
        </div>
      </div>
    </div>
  );
};

export default TableLayout;
