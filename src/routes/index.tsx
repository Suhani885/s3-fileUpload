import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import axios from "axios";
import { Upload, X } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";
import { Scroller } from "~/components/ui/scroller";
import {
  urlAcknowledgmentUpdateMutation,
  urlLinkGenerateCreateMutation,
  urlLinkGenerateDestroyMutation,
  urlLinkGenerateListOptions,
  urlLinkGenerateListQueryKey,
} from "~/services/api/@tanstack/react-query.gen";
import { Button } from "../components/ui/button";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadProps,
  FileUploadTrigger,
} from "../components/ui/file-upload";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const [files, setFiles] = React.useState<File[]>([]);
  const uploadMutation = useMutation(urlLinkGenerateCreateMutation());
  const acknowledgeMutation = useMutation(urlAcknowledgmentUpdateMutation());
  const deleteMutation = useMutation(urlLinkGenerateDestroyMutation());
  const queryClient = useQueryClient();

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

  const { data: images } = useQuery({ ...urlLinkGenerateListOptions() });
  console.log(images);

  const onUpload: NonNullable<FileUploadProps["onUpload"]> = React.useCallback(
    async (files, { onProgress, onSuccess, onError }) => {
      uploadMutation.mutate(
        {},
        {
          onSuccess: async (data) => {
            const url = data.url;
            const uuid: string = data.uuid;
            if (url) {
              const uploadResponse = await axios.put(url, files[0], {
                headers: {
                  "Content-Type": files[0].type,
                },
              });

              if (uploadResponse.status === 200) {
                console.log(uuid);
                acknowledgeMutation.mutate(
                  {
                    body: {
                      acknowledgement: true,
                      uuid: uuid,
                    },
                  },
                  {
                    onSuccess: (data) => {
                      console.log(data);
                      toast.success("File uploaded successfully.");
                      queryClient.invalidateQueries({
                        queryKey: urlLinkGenerateListQueryKey(),
                      });
                      setFiles([]);
                    },
                  }
                );
              } else {
                toast.error("Upload failed.");
              }
            }
          },
          onError: (error) => {
            console.log(error);
          },
        }
      );
    },
    []
  );

  const handleDelete = (uuid: string) => {
    deleteMutation.mutate(
      {
        query: {
          uuid: uuid,
        },
      },
      {
        onSuccess: (data) => {
          console.log(data);
          toast.success("Image Deleted successfully.");
          queryClient.invalidateQueries({
            queryKey: urlLinkGenerateListQueryKey(),
          });
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };
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
            {images?.map((item, index) => (
              <div
                key={index}
                className="flex h-40 w-full justify-between items-center rounded-md bg-accent p-4 "
              >
                <img src={item.Url} width={75} height={50} alt="img" />
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-7"
                  onClick={() => handleDelete(item.Key)}
                >
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
