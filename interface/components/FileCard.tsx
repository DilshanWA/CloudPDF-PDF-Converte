import React from "react";
import { X } from "lucide-react";
import Preview from "./Preview";

export interface UploadedFile {
  id: string;
  file: File;
  SelectType: string;
  status: "Ready" | "Converting" | "completed" | "error";
  errorMessage?: string;
}

interface FileCardProps {
  selectedFileType: string;
  fileData: UploadedFile;
  onRemove?: (id: string) => void;
}

export function FileCard({ fileData, onRemove }: FileCardProps) {
  const { id, file, SelectType } = fileData;

  return (
    <div className="w-[160px] flex-shrink-0 mx-2">
      <div
        className="
          group relative
          h-[200px] w-full
          rounded-sm border border-gray-200
          bg-white
          shadow-sm hover:shadow-md
          transition-all duration-200
          flex items-center justify-center
        "
      >
        {/* Remove Button */}
        {onRemove && (
         <button
          onClick={(e) => {
            e.stopPropagation()
            onRemove?.(id)
          }}
          onPointerDown={(e) => e.stopPropagation()}
          className="
            absolute top-0 right-0 m-1 p-1
              rounded-full
              bg-red-500 bg-opacity-75
              opacity-0 group-hover:opacity-100
              text-white hover:text-white
              transition
              z-50
          "
        >
          <X className="w-4 h-4" />
        </button>

        )}

        {/* Preview */}
        <div className="p-2 w-full h-full flex items-center justify-center">
          <Preview selectedFileType={SelectType} file={file} />
        </div>
      </div>

      <p
        className="
          mt-2 text-sm text-gray-700 text-center
          truncate
        "
        title={file.name}
      >
        {file.name}
      </p>
    </div>
  );
}


{/*
  
  <button
            onClick={() => onRemove(id)}
            className="
              absolute top-0 right-0 m-1 p-1
              rounded-full
              bg-red-500 bg-opacity-75
              opacity-0 group-hover:opacity-100
              text-white hover:text-white
              transition
              z-50
            "
          >
            <X className="w-4 h-4" />
          </button>
  */}