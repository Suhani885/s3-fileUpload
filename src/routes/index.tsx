import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Upload, X } from "lucide-react";
import * as React from "react";
import { Button } from "../components/ui/button";
import { urlLinkGenerateCreate } from "~/services/api";
import { Scroller } from "~/components/ui/scroller";
import axios from "axios";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
  FileUploadProps

} from "../components/ui/file-upload";
import { toast } from "sonner";
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
    toast.error(message, {
      description: `"${file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name}" has been rejected`,
    });
  }, []);

  const onUpload: NonNullable<FileUploadProps["onUpload"]> = React.useCallback(
    async (files, { onProgress, onSuccess, onError }) => {

      const data = await urlLinkGenerateCreate()
      const url = data?.data?.url
      if (url) {
        const uploadResponse = await axios.put(url, files[0], {
          headers: {
            "Content-Type": files[0].type,
          },
        });


        if (uploadResponse.status === 200) {
          toast.success("File uploaded successfully.");
          console.log("uploadResponse", uploadResponse)
        } else {
          toast.error("Upload failed.");
        }
      }

    },
    [],
  );

  const handleDelete = (index: number) => {
    console.log(index)
    toast.success(`delete ${index}`)
  }
  return (
    <div className="flex justify-center items-center min-w-screen min-h-screen bg-slate  gap-3">
      <div className="flex flex-col justify-center items-center w-1/2">
        <FileUpload
          value={files}
          onValueChange={setFiles}
          onFileValidate={onFileValidate}
          onUpload={onUpload}
          onFileReject={onFileReject}
          accept="image/*"
          maxFiles={1}

          className="w-full "
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
        {/* <Button>Upload</Button> */}

        <div className="w-full flex flex-col border m-5 rounded-xl">
          <h1 className="h1 font-bold mt-5 ms-5">Uploaded Images</h1>
          <Scroller className="flex h-80 w-full flex-col gap-2.5 p-4">
            {Array.from({ length: 100 }).map((_, index) => (
              <div
                key={index}
                className="flex h-40 w-full justify-between items-center rounded-md bg-accent p-4 "
              >
                <img src="https://img.freepik.com/free-photo/woman-beach-with-her-baby-enjoying-sunset_52683-144131.jpg?size=626&ext=jpg" width={75} alt="img" />
                <Button variant="ghost" size="icon" className="size-7" onClick={() => handleDelete(index)}>
                  <X />
                </Button>
              </div>
            ))}
          </Scroller>

        </div>

      </div>
    </div>
  );
}
