"use client";
import { api } from "../../convex/_generated/api";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";

import { UploadButton } from "./upload-button";
import { FileCard } from "./file-card";
import Image from "next/image";
import { Loader2 } from "lucide-react";

export default function Page() {
  const organization = useOrganization();
  const user = useUser();

  let orgId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const files = useQuery(api.files.getFiles, orgId ? { orgId } : "skip");
  const isLoading = files === undefined;

  return (
    <main className="container mx-auto py-8 mt-8">
      {isLoading && (
        <div className="flex flex-col items-center justify-center mt-24">
          <Loader2 className="w-32 h-32 animate-spin text-gray-600" />
          <div className="text-lg font-semibold mt-4">
            Loading your files...
          </div>
        </div>
      )}
      {!isLoading && files.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-24">
          <Image src="/empty.svg" alt="Empty state" width={400} height={400} />
          <h2 className="text-xl font-semibold mt-4">
            You have no files, upload some!
          </h2>
          <div className="mt-4">
            <UploadButton />
          </div>
        </div>
      )}

      {!isLoading && files.length > 0 && (
        <>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Files</h2>
            <UploadButton />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {files.map((file) => (
              <FileCard key={file._id} file={file} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}