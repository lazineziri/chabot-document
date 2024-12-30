import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Trash2, FileText, RefreshCw } from "lucide-react";
import FileUploadZone from "./FileUploadZone";

interface KnowledgeBaseFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: "processed" | "processing" | "failed";
  uploadedAt: string;
}

interface KnowledgeBaseManagerProps {
  files?: KnowledgeBaseFile[];
  onFileUpload?: (files: File[]) => void;
  onFileDelete?: (fileId: string) => void;
  onFileRefresh?: (fileId: string) => void;
}

const KnowledgeBaseManager = ({
  files = [
    {
      id: "1",
      name: "product-documentation.pdf",
      size: 2500000,
      type: "application/pdf",
      status: "processed",
      uploadedAt: "2024-01-15T10:00:00Z",
    },
    {
      id: "2",
      name: "user-guide.docx",
      size: 1500000,
      type: "application/docx",
      status: "processing",
      uploadedAt: "2024-01-15T11:30:00Z",
    },
  ],
  onFileUpload = () => {},
  onFileDelete = () => {},
  onFileRefresh = () => {},
}: KnowledgeBaseManagerProps) => {
  const [activeTab, setActiveTab] = useState("all");

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getStatusBadge = (status: KnowledgeBaseFile["status"]) => {
    switch (status) {
      case "processed":
        return <Badge className="bg-green-500">Processed</Badge>;
      case "processing":
        return <Badge className="bg-yellow-500">Processing</Badge>;
      case "failed":
        return <Badge className="bg-red-500">Failed</Badge>;
      default:
        return null;
    }
  };

  const filteredFiles = files.filter((file) => {
    if (activeTab === "all") return true;
    return file.status === activeTab;
  });

  return (
    <Card className="w-full bg-white shadow-lg rounded-2xl border-gray-200/50">
      <CardHeader>
        <CardTitle>Knowledge Base Manager</CardTitle>
        <CardDescription>
          Upload and manage your knowledge base documents
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <FileUploadZone
            onFileUpload={onFileUpload}
            acceptedFileTypes={[".pdf", ".doc", ".docx", ".txt"]}
            maxFileSize={10485760} // 10MB
          />

          <Tabs
            defaultValue="all"
            className="w-full"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All Files</TabsTrigger>
              <TabsTrigger value="processing">Processing</TabsTrigger>
              <TabsTrigger value="processed">Processed</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-4">
              <ScrollArea className="h-[400px] w-full rounded-md border">
                <div className="p-4 space-y-4">
                  {filteredFiles.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-4 rounded-xl border bg-gray-50 hover:bg-gray-100 transition-colors shadow-sm"
                    >
                      <div className="flex items-center space-x-4">
                        <FileText className="h-8 w-8 text-gray-500" />
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-sm text-gray-500">
                            {formatFileSize(file.size)} • Uploaded{" "}
                            {new Date(file.uploadedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        {getStatusBadge(file.status)}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onFileRefresh(file.id)}
                        >
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onFileDelete(file.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {filteredFiles.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No files found
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};

export default KnowledgeBaseManager;
