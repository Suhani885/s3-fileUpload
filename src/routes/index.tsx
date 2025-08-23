import { createFileRoute } from "@tanstack/react-router";
import { Upload, X } from "lucide-react";
import * as React from "react";
import { Button } from "../components/ui/button";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from "../components/ui/file-upload";
// import { toast } from "sonner";
export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const [files, setFiles] = React.useState<File[]>([]);

  const onFileValidate = React.useCallback(
    (file: File): string | null => {
      if (!file.type.startsWith("image/")) {
        return "Only image files are allowed";
      }
      const MAX_SIZE = 5 * 1024 * 1024;
      if (file.size > MAX_SIZE) {
        return `File size must be less than ${MAX_SIZE / (1024 * 1024)}MB`;
      }

      return null;
    },
    [files]
  );

  const onFileReject = React.useCallback((file: File, message: string) => {
    // toast(message, {
    //   description: `"${file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name}" has been rejected`,
    // });
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-green-50  gap-3">
      <div className="flex flex-cols justify-center items-center">
        <FileUpload
          value={files}
          onValueChange={setFiles}
          onFileValidate={onFileValidate}
          onFileReject={onFileReject}
          accept="image/*"
          maxFiles={1}
          className="w-full max-w-md"
        >
          <FileUploadDropzone>
            <div className="flex flex-col items-center gap-1 text-center">
              <div className="flex items-center justify-center rounded-full border p-2.5">
                <Upload className="size-6 text-muted-foreground" />
              </div>
              <p className="font-medium text-sm">Drag & drop files here</p>
              <p className="text-muted-foreground text-xs">
                Or click to browse (up to 5MB)
              </p>
            </div>
            <FileUploadTrigger asChild>
              <Button variant="outline" size="sm" className="mt-2 w-fit">
                Browse files
              </Button>
            </FileUploadTrigger>
          </FileUploadDropzone>
          <FileUploadList>
            {files.map((file, index) => (
              <FileUploadItem key={index} value={file}>
                <FileUploadItemPreview />
                <FileUploadItemMetadata />
                <FileUploadItemDelete asChild>
                  <Button variant="ghost" size="icon" className="size-7">
                    <X />
                  </Button>
                </FileUploadItemDelete>
              </FileUploadItem>
            ))}
          </FileUploadList>
        </FileUpload>
        <Button>Upload</Button>
      </div>
    </div>
  );
}
