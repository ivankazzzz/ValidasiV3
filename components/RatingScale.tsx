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
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:border-indigo-300 transition-colors">
      <label className="block text-sm font-medium text-gray-800 mb-3">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="flex flex-col gap-2">
        {scales.map((scale) => (
          <button
            key={scale.value}
            type="button"
            onClick={() => onChange(scale.value)}
            className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 text-left ${
              value === scale.value
                ? `border-${scale.color}-500 bg-${scale.color}-50 ring-2 ring-${scale.color}-200`
                : 'border-gray-300 hover:border-gray-400 bg-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className={`font-semibold text-sm md:text-base ${value === scale.value ? `text-${scale.color}-700` : 'text-gray-700'}`}>
                {scale.label}
              </div>
              <div className={`font-bold text-lg ${value === scale.value ? `text-${scale.color}-700` : 'text-gray-500'}`}>
                {scale.value}
              </div>
            </div>
          </button>
        ))}
      </div>
      <div className="mt-3 text-xs text-gray-500 text-center">
        Pilih salah satu skala penilaian di atas
      </div>
    </div>
  );
}
