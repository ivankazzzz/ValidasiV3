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
  { value: 1, label: 'STL', color: 'red', fullLabel: 'Sangat Tidak Layak' },
  { value: 2, label: 'TL', color: 'orange', fullLabel: 'Tidak Layak' },
  { value: 3, label: 'CL', color: 'yellow', fullLabel: 'Cukup Layak' },
  { value: 4, label: 'L', color: 'blue', fullLabel: 'Layak' },
  { value: 5, label: 'SL', color: 'green', fullLabel: 'Sangat Layak' },
];

export default function RatingScale({ id, label, value, onChange, required = true }: RatingScaleProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:border-indigo-300 transition-colors">
      <label className="block text-sm font-medium text-gray-800 mb-3">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="flex flex-wrap gap-2">
        {scales.map((scale) => (
          <button
            key={scale.value}
            type="button"
            onClick={() => onChange(scale.value)}
            className={`flex-1 min-w-[60px] px-3 py-2 rounded-lg border-2 transition-all duration-200 ${
              value === scale.value
                ? `border-${scale.color}-500 bg-${scale.color}-50 ring-2 ring-${scale.color}-200`
                : 'border-gray-300 hover:border-gray-400 bg-white'
            }`}
            title={scale.fullLabel}
          >
            <div className="text-center">
              <div className={`font-bold text-sm ${value === scale.value ? `text-${scale.color}-700` : 'text-gray-600'}`}>
                {scale.label}
              </div>
              <div className={`text-xs ${value === scale.value ? `text-${scale.color}-600` : 'text-gray-500'}`}>
                {scale.value}
              </div>
            </div>
          </button>
        ))}
      </div>
      <div className="mt-2 flex justify-between text-xs text-gray-500">
        <span>1 = Sangat Tidak Layak</span>
        <span>5 = Sangat Layak</span>
      </div>
    </div>
  );
}
