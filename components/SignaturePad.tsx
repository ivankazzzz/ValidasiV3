'use client';

import React, { useRef, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';

interface SignaturePadProps {
  value?: string;
  onChange: (signature: string) => void;
  label?: string;
}

export default function SignaturePad({ value, onChange, label = 'Tanda Tangan' }: SignaturePadProps) {
  const sigPadRef = useRef<SignatureCanvas>(null);

  useEffect(() => {
    if (value && sigPadRef.current) {
      sigPadRef.current.fromDataURL(value);
    }
  }, [value]);

  const clear = () => {
    sigPadRef.current?.clear();
    onChange('');
  };

  const handleEnd = () => {
    if (sigPadRef.current) {
      const signature = sigPadRef.current.toDataURL();
      onChange(signature);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="border-2 border-gray-300 rounded-lg overflow-hidden bg-white">
        <SignatureCanvas
          ref={sigPadRef}
          canvasProps={{
            className: 'signature-canvas w-full h-48',
            style: { width: '100%', height: '192px' }
          }}
          onEnd={handleEnd}
        />
      </div>
      <button
        type="button"
        onClick={clear}
        className="mt-2 px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
      >
        Hapus Tanda Tangan
      </button>
    </div>
  );
}
