'use client';
import React, { useCallback, useState } from "react";
import { UploadedFile } from "./FileCard";
import { FileGrid } from "./FileGrid";
import { Sidebar } from "@/components/SideBar";
import LoadingScreen from "./Loading";
import DownloadResult from "./Download";
import Servererror from "./Servererror";
import {
  DndContext,
  closestCenter,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";



interface FileListProps {
  files: UploadedFile[];
  setFiles: React.Dispatch<React.SetStateAction<UploadedFile[]>>;
  operationtype: "convert" | "merge" | "compress" | "split" | "protect" | "imageconverter";
  title: string;
  SelectType: string;
  accept: string;
  onRemove?: (id: string) => void;
  onOperation?: (operation: string, files: UploadedFile[]) => void;
}

export default function FileList({files, setFiles, operationtype, title, SelectType, onRemove, accept}: FileListProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(false);
  const [downloadData, setDownloadData] = useState<{url: string;name: string;} | null>(null);
  const [qualityOption, setQualityOption] =useState<'low' | 'medium' | 'high'>('medium')
  const [password, setPassword] = useState("");
  const [customRange, setCustomRange] = useState("");
  const [mode, setMode] = useState("custom");
  const [checked, setChecked] = useState(false);

  const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

  const handleCheckboxChange = (value: boolean) => {
    setChecked(value);
  };

  const handleOperation = useCallback(async () => {
  if (!files.length) return;

  setIsProcessing(true);
  setError(false);

  try {
    const formData = new FormData();
    formData.append("operationType", operationtype);
    formData.append("qualityOption", qualityOption);
    formData.append("password", password);
    formData.append("check_box_value", String(checked));
    formData.append("page_range", customRange);
    formData.append("mode", mode);
    files.forEach((file) => formData.append("files", file.file));

    const [response] = await Promise.all([
      fetch("/api/endpoint", {
        method: "POST",
        body: formData,
      }),
      sleep(3000),
    ]);

    if (!response.ok) {
      setError(true);
      return;
    }

    const data = await response.json();

    if (data.files_count === 1 || data.pdfUrl) {
      downloadFile(data.pdfUrl, files[0].file.name);
      setDownloadData({ url: data.pdfUrl, name: files[0].file.name });
    } else if (data.files_count > 1 && data.zipUrl) {
      downloadFile(data.zipUrl, "files.zip");
      setDownloadData({ url: data.zipUrl, name: "files.zip" });
    }
  } catch (err) {
    setError(true);
  } finally {
    setIsProcessing(false);
  }
}, [files, operationtype, qualityOption, password , checked, customRange, mode]);


  const downloadFile = (url: string, originalName: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = originalName.replace(/\.[^/.]+$/, "") + ".pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = files.findIndex((file) => file.id === active.id);
      const newIndex = files.findIndex((file) => file.id === over?.id);
      setFiles((files) => arrayMove(files, oldIndex, newIndex));
    }
  };

    const handleAddMoreFiles = (newFileList: FileList) => {
      const newFiles = Array.from(newFileList).map((file) => ({
        id: crypto.randomUUID(),
        file,
        status: "Ready" as const,
        SelectType,
      }));
      setFiles((prev) => [...prev, ...newFiles]);
  };



  return (
    <div className="flex flex-col md:flex-row h-full min-h-screen w-full">
      <section className="flex-1  overflow-y-auto p-6 flex flex-col items-center bg-gray-100">
        {operationtype === "merge" ? (
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={files.map((f) => f.id)} strategy={verticalListSortingStrategy}>
              <FileGrid
                files={files}
                onRemove={onRemove}
                SelectType={SelectType}
                isSortable={true}
              />
            </SortableContext>
          </DndContext>
        ) : (
          <FileGrid files={files} onRemove={onRemove} SelectType={SelectType} />
        )}
      </section>

      {!isProcessing && !downloadData && !error && (
        <Sidebar
          files={files.map(f => f.file)}
          onAddMoreFilesClick={handleAddMoreFiles}
          operationtype={operationtype}
          accept={accept}
          onCheckboxChange={handleCheckboxChange}
          title={title}
          onPasswordChange={setPassword}
          SelectType={SelectType}
          qualityOption={qualityOption}
          onModeChange={setMode}
          onPageRangeChange={setCustomRange}
          setQualityOption={setQualityOption}
          isProcessing={isProcessing}
          onOperationClick={handleOperation}
        />
      )}

      {isProcessing &&  (
        <LoadingScreen
          operationtype={operationtype}
          subtitle="This may take a few seconds"
        />
      )}
      {downloadData && (
        <DownloadResult
          fileUrl={downloadData.url}
          operationType={operationtype}
          SelectType={SelectType}
          fileName={downloadData.name}
          onClose={() => setDownloadData(null)}
        />
      )}
      {error && (
        <Servererror />
      )}
    </div>
  );
}
