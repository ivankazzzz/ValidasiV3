'use client';

import React from 'react';

interface RatingScaleProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  required?: boolean;
}

const scales = [
  { value: 1, label: 'Sangat Tidak Layak', color: 'red', shortLabel: 'STL' },
  { value: 2, label: 'Tidak Layak', color: 'orange', shortLabel: 'TL' },
  { value: 3, label: 'Cukup Layak', color: 'yellow', shortLabel: 'CL' },
  { value: 4, label: 'Layak', color: 'blue', shortLabel: 'L' },
  { value: 5, label: 'Sangat Layak', color: 'green', shortLabel: 'SL' },
];

export default function RatingScale({ label, value, onChange, required = true }: RatingScaleProps) {
  return (
    <div className="bg-white p-3 md:p-4 rounded-lg shadow-sm border border-gray-200 hover:border-indigo-300 transition-colors">
      <label className="block text-sm font-medium text-gray-800 mb-3">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {/* Desktop & Tablet: 5 columns horizontal */}
      <div className="hidden sm:grid sm:grid-cols-5 gap-2">
        {scales.map((scale) => (
          <button
            key={scale.value}
            type="button"
            onClick={() => onChange(scale.value)}
            className={`px-2 py-3 rounded-lg border-2 transition-all duration-200 ${
              value === scale.value
                ? `border-${scale.color}-500 bg-${scale.color}-50 ring-2 ring-${scale.color}-200`
                : 'border-gray-300 hover:border-gray-400 bg-white'
            }`}
          >
            <div className="text-center">
              <div className={`font-bold text-lg mb-1 ${value === scale.value ? `text-${scale.color}-700` : 'text-gray-600'}`}>
                {scale.value}
              </div>
              <div className={`text-xs leading-tight ${value === scale.value ? `text-${scale.color}-700` : 'text-gray-600'}`}>
                {scale.label}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Mobile: 2 rows layout for better readability */}
      <div className="sm:hidden space-y-2">
        {/* Row 1: Options 1-3 */}
        <div className="grid grid-cols-3 gap-2">
          {scales.slice(0, 3).map((scale) => (
            <button
              key={scale.value}
              type="button"
              onClick={() => onChange(scale.value)}
              className={`px-2 py-2.5 rounded-lg border-2 transition-all duration-200 ${
                value === scale.value
                  ? `border-${scale.color}-500 bg-${scale.color}-50 ring-2 ring-${scale.color}-200`
                  : 'border-gray-300 hover:border-gray-400 bg-white'
              }`}
            >
              <div className="text-center">
                <div className={`font-bold text-base mb-0.5 ${value === scale.value ? `text-${scale.color}-700` : 'text-gray-600'}`}>
                  {scale.value}
                </div>
                <div className={`text-[10px] leading-tight ${value === scale.value ? `text-${scale.color}-700` : 'text-gray-600'}`}>
                  {scale.label}
                </div>
              </div>
            </button>
          ))}
        </div>
        {/* Row 2: Options 4-5 centered */}
        <div className="grid grid-cols-2 gap-2 max-w-[66%] mx-auto">
          {scales.slice(3, 5).map((scale) => (
            <button
              key={scale.value}
              type="button"
              onClick={() => onChange(scale.value)}
              className={`px-2 py-2.5 rounded-lg border-2 transition-all duration-200 ${
                value === scale.value
                  ? `border-${scale.color}-500 bg-${scale.color}-50 ring-2 ring-${scale.color}-200`
                  : 'border-gray-300 hover:border-gray-400 bg-white'
              }`}
            >
              <div className="text-center">
                <div className={`font-bold text-base mb-0.5 ${value === scale.value ? `text-${scale.color}-700` : 'text-gray-600'}`}>
                  {scale.value}
                </div>
                <div className={`text-[10px] leading-tight ${value === scale.value ? `text-${scale.color}-700` : 'text-gray-600'}`}>
                  {scale.label}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3 flex justify-between text-[10px] sm:text-xs text-gray-500">
        <span>1 = Sangat Tidak Layak</span>
        <span>5 = Sangat Layak</span>
      </div>
    </div>
  );
}
