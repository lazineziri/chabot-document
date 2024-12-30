import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, FileText, AlertCircle, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface FileUploadZoneProps {
  onFileUpload?: (files: File[]) => void;
  acceptedFileTypes?: string[];
  maxFileSize?: number;
  multiple?: boolean;
}

const FileUploadZone = ({
  onFileUpload = () => {},
  acceptedFileTypes = [".pdf", ".doc", ".docx", ".txt"],
  maxFileSize = 5242880, // 5MB
  multiple = true,
}: FileUploadZoneProps) => {
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setError("");
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 500);

      setUploadedFiles(acceptedFiles);
      onFileUpload(acceptedFiles);
    },
    [onFileUpload],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes.reduce(
      (acc, type) => ({ ...acc, [type]: [] }),
      {},
    ),
    maxSize: maxFileSize,
    multiple,
    onDropRejected: () => {
      setError("Invalid file type or size exceeded");
    },
  });

  const removeFile = (index: number) => {
    const newFiles = [...uploadedFiles];
    newFiles.splice(index, 1);
    setUploadedFiles(newFiles);
  };

  return (
    <div className="w-full p-6 bg-white rounded-2xl shadow-lg border border-gray-200/50 card-hover">
      <div
        {...getRootProps()}
        className={`p-8 border-2 border-dashed rounded-xl text-center cursor-pointer transition-all
          ${isDragActive ? "border-primary bg-primary/5 scale-[0.99]" : "border-gray-300 hover:border-primary hover:bg-gray-50"}`}
      >
        <input {...getInputProps()} />
        <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <p className="text-lg font-medium text-gray-600">
          {isDragActive ? "Drop files here" : "Drag & drop files here"}
        </p>
        <p className="mt-2 text-sm text-gray-500">or click to select files</p>
        <p className="mt-1 text-xs text-gray-400">
          Supported files: {acceptedFileTypes.join(", ")}
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mt-4 rounded-xl">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {uploadProgress > 0 && uploadProgress < 100 && (
        <div className="mt-4">
          <Progress value={uploadProgress} className="h-2 rounded-full" />
          <p className="mt-2 text-sm text-gray-500 text-center">
            Uploading... {uploadProgress}%
          </p>
        </div>
      )}

      {uploadedFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          {uploadedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all card-hover"
            >
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-700">{file.name}</span>
                {uploadProgress === 100 && (
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFile(index)}
                className="rounded-full hover:bg-red-50 hover:text-red-500"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploadZone;
