"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { ImagePlus, UploadCloud, X } from "lucide-react";

import { adminText, type AdminLanguage } from "@/lib/admin-language";
import { cn } from "@/lib/utils";

export function ImageUploadField({
  name,
  label,
  helperText = "Accepted formats: JPG, PNG (max 2MB)",
  existingUrl,
  lang = "en",
}: {
  name: string;
  label: string;
  helperText?: string;
  existingUrl?: string | null;
  lang?: AdminLanguage;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  const previewUrl = useMemo(
    () => (file ? URL.createObjectURL(file) : existingUrl ?? ""),
    [existingUrl, file],
  );

  useEffect(() => {
    if (!file) {
      return;
    }

    return () => URL.revokeObjectURL(previewUrl);
  }, [file, previewUrl]);

  function applyFile(nextFile: File | null) {
    if (!nextFile) {
      setFile(null);
      setError("");
      return;
    }

    const isValidType = ["image/jpeg", "image/png"].includes(nextFile.type);
    if (!isValidType) {
      setError(
        adminText(lang, "Please upload a JPG or PNG image.", "يرجى رفع صورة من نوع JPG أو PNG."),
      );
      return;
    }

    if (nextFile.size > 2 * 1024 * 1024) {
      setError(adminText(lang, "Image must be 2MB or smaller.", "يجب أن يكون حجم الصورة 2MB أو أقل."));
      return;
    }

    setFile(nextFile);
    setError("");
  }

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">{label}</label>
      <div
        className={cn(
          "rounded-[1.5rem] border border-dashed bg-white p-4 transition-colors",
          dragging ? "border-primary bg-primary/5" : "border-slate-300",
        )}
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          const droppedFile = event.dataTransfer.files?.[0] ?? null;
          applyFile(droppedFile);
          if (inputRef.current && droppedFile) {
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(droppedFile);
            inputRef.current.files = dataTransfer.files;
          }
        }}
      >
        <input
          ref={inputRef}
          type="file"
          name={name}
          accept=".jpg,.jpeg,.png,image/jpeg,image/png"
          className="hidden"
          onChange={(event) => applyFile(event.target.files?.[0] ?? null)}
        />

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="flex min-h-28 flex-1 items-center justify-center rounded-[1.25rem] bg-slate-50 p-4 text-center">
            {previewUrl ? (
              <div className="relative h-32 w-full overflow-hidden rounded-[1rem] border border-slate-200">
                <Image
                  src={previewUrl}
                  alt="Selected upload preview"
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="text-slate-500">
                <ImagePlus className="mx-auto size-6" />
                <p className="mt-2 text-sm">
                  {adminText(lang, "No image selected yet", "لم يتم اختيار صورة بعد")}
                </p>
              </div>
            )}
          </div>

          <div className="flex-1">
            <p className="text-sm font-medium text-slate-900">
              {adminText(
                lang,
                "Drag and drop an image here, or choose it from your device.",
                "اسحب الصورة إلى هنا أو اخترها من جهازك.",
              )}
            </p>
            <p className="mt-1 text-xs leading-6 text-slate-500">{helperText}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0097A7]"
              >
                <UploadCloud className="size-4" />
                {adminText(lang, "Choose image", "اختيار صورة")}
              </button>
              {file || existingUrl ? (
                <button
                  type="button"
                  onClick={() => {
                    if (inputRef.current) {
                      inputRef.current.value = "";
                    }
                    setFile(null);
                    setError("");
                  }}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                >
                  <X className="size-4" />
                  {adminText(lang, "Clear preview", "مسح المعاينة")}
                </button>
              ) : null}
            </div>
            {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
