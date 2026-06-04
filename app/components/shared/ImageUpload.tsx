"use client";

import React, { useRef, useState, useEffect } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";

interface ImageUploadProps {
  value?: File | string | null;
  onChange: (file: File | null) => void;
  error?: string;
}

export default function ImageUpload({ value, onChange, error }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  // Manage URL previews for both files and existing strings
  useEffect(() => {
    if (!value) {
      setPreviewUrl(null);
      return;
    }

    if (typeof value === "string") {
      setPreviewUrl(value);
      return;
    }

    if (value instanceof File) {
      const objectUrl = URL.createObjectURL(value);
      setPreviewUrl(objectUrl);

      // Clean up object URL to prevent memory leaks
      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    }
  }, [value]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      onChange(file);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      onChange(file);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Book Cover Image
      </label>
      
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={onButtonClick}
        className={`
          relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 overflow-hidden
          ${isDragActive ? "border-purple-600 bg-purple-50/50" : "border-gray-200 hover:border-purple-400 bg-gray-50/50"}
          ${error ? "border-red-500 focus-within:border-red-500" : ""}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          className="hidden"
          onChange={handleFileInputChange}
        />

        {previewUrl ? (
          <div className="relative w-full h-full group">
            {/* Image Preview */}
            <img
              src={previewUrl}
              alt="Book cover preview"
              className="w-full h-full object-contain bg-white"
            />
            {/* Hover Backdrop Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={onButtonClick}
                className="px-4 py-2 bg-white text-gray-800 rounded-xl text-sm font-medium hover:bg-gray-100 transition shadow-lg"
              >
                Replace
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="p-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition shadow-lg"
                title="Remove Image"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {/* Show metadata banner in preview */}
            {value instanceof File && (
              <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs flex justify-between items-center">
                <span className="truncate max-w-[150px]">{value.name}</span>
                <span>{(value.size / (1024 * 1024)).toFixed(2)} MB</span>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-6 text-center">
            <div className="p-4 bg-purple-50 text-purple-600 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
              <Upload className="w-6 h-6" />
            </div>
            <p className="font-semibold text-gray-700 text-sm mb-1">
              Drag & drop book cover here, or <span className="text-purple-600">browse</span>
            </p>
            <p className="text-xs text-gray-500">
              Supports JPEG, JPG, PNG, WEBP (Max 5MB)
            </p>
          </div>
        )}
      </div>

      {error && (
        <p className="mt-2 text-xs font-medium text-red-600 flex items-center gap-1 animate-pulse">
          <span>⚠️</span> {error}
        </p>
      )}
    </div>
  );
}
