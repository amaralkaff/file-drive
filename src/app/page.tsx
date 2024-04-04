"use client";
import { api } from "../../convex/_generated/api";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";

import { UploadButton } from "./upload-button";
import { FileCard } from "./file-card";

export default function Page() {
  const organization = useOrganization();
  const user = useUser();

  let orgId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const files = useQuery(api.files.getFiles, orgId ? { orgId } : "skip");
  return (
    <main className="container mx-auto py-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Your files</h1>
        <UploadButton />
      </div>
      <div className="grid grid-cols-4 gap-4 mt-8">
        {files?.map((file) => (
          <FileCard key={file._id} file={file} />
        ))}
      </div>

      {files?.length === 0 && <div>No files found</div>}
    </main>
  );
}
