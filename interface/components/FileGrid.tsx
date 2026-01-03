import React from "react";
import { UploadedFile, FileCard } from "./FileCard";
import { SortableFileItem } from "@/components/SortableFileItem";

interface FileGridProps {
  files: UploadedFile[];
  SelectType: string;
  isSortable?: boolean;
  onRemove?: (id: string) => void;
}

export function FileGrid({ files, SelectType, onRemove, isSortable }: FileGridProps) {
  if (files.length === 0) {
    return (
      <p className="text-gray-500 text-center col-span-full">No files uploaded yet.</p>
    );
  }

  return (
    <div className="flex max-5xl mt-20">
       <div className="w-full flex max-w-5xl grid grid-cols-3 gap-4 mt-20 md:grid-cols-4 lg:grid-cols-5">
          {files.map((file) => (
            isSortable ? (
              <SortableFileItem key={file.id} id={file.id}>
                <FileCard fileData={file} onRemove={onRemove} selectedFileType={SelectType} />
              </SortableFileItem>
            ) : (
              <FileCard key={file.id} fileData={file} onRemove={onRemove} selectedFileType={SelectType} />
            )
          ))}
        </div>
    </div>
   
  );
}
