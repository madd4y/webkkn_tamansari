"use client";

import { ImageIcon, UploadCloud, X } from "lucide-react";
import { useEffect, useId, useState, type ChangeEvent } from "react";
import { uploadImageToCloudinary } from "@/services/cloudinary.service";

type ImageUploadProps = {
  label: string;
  value: string;
  onChange: (url: string) => void;
  error?: string;
  disabled?: boolean;
};

export function ImageUpload({
  label,
  value,
  onChange,
  error,
  disabled = false,
}: ImageUploadProps) {
  const inputId = useId();
  const [previewUrl, setPreviewUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  useEffect(() => {
    return () => {
      if (previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setUploadError("File harus berupa gambar.");
      return;
    }

    const localPreview = URL.createObjectURL(file);
    setPreviewUrl((current) => {
      if (current.startsWith("blob:")) {
        URL.revokeObjectURL(current);
      }

      return localPreview;
    });
    setProgress(0);
    setUploadError("");
    setIsUploading(true);

    try {
      const imageUrl = await uploadImageToCloudinary(file, setProgress);
      onChange(imageUrl);
      setPreviewUrl(imageUrl);
      setProgress(100);
    } catch (uploadError) {
      setUploadError(
        uploadError instanceof Error ? uploadError.message : "Upload gambar gagal.",
      );
    } finally {
      setIsUploading(false);
    }
  }

  function handleRemove() {
    if (previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl("");
    setProgress(0);
    setUploadError("");
    onChange("");
  }

  const currentPreview = previewUrl || value;
  const errorMessage = uploadError || error;

  return (
    <div>
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <div className="mt-2 grid gap-3">
        <div className="relative flex min-h-40 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-[#f7faf9]">
          {currentPreview ? (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${currentPreview})` }}
            />
          ) : (
            <ImageIcon className="text-slate-400" size={32} aria-hidden="true" />
          )}
          {isUploading ? (
            <div className="absolute inset-x-4 bottom-4 rounded-xl bg-white/95 p-3 shadow-sm">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                <span>Mengunggah...</span>
                <span>{progress}%</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-slate-100">
                <div
                  className="h-2 rounded-full bg-emerald-600 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-2">
          <label
            htmlFor={inputId}
            className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-white px-3 text-sm font-semibold text-emerald-800 transition hover:border-emerald-300 hover:bg-emerald-50"
          >
            <UploadCloud size={16} aria-hidden="true" />
            Pilih Gambar
          </label>
          {currentPreview ? (
            <button
              type="button"
              onClick={handleRemove}
              disabled={disabled || isUploading}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-red-600 px-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:pointer-events-none disabled:opacity-60"
            >
              <X size={16} aria-hidden="true" />
              Hapus Foto
            </button>
          ) : null}
        </div>
        <input
          id={inputId}
          type="file"
          accept="image/*"
          disabled={disabled || isUploading}
          className="sr-only"
          onChange={handleFileChange}
        />
        {errorMessage ? (
          <p className="text-xs font-medium text-red-600">{errorMessage}</p>
        ) : null}
      </div>
    </div>
  );
}
