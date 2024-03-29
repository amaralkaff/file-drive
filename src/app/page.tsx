"use client";
import { Button } from "@/components/ui/button";
import { api } from "../../convex/_generated/api";
import { SignInButton, SignOutButton, SignedIn, SignedOut, useOrganization, useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";


export default function Page() {
  const organization = useOrganization();
  const user = useUser()
  let orgId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }
  const files = useQuery(api.files.getFiles, orgId ? { orgId } : "skip");
  const createFile = useMutation(api.files.createFile);
  return (
    <main className="flex flex-col items-center justify-center w-screen h-screen space-y-4">
      <h1 className="text-4xl font-bold">Welcome to Drive-mangLy</h1>
      {files?.map(file => (
        <div key={file._id}>{file.name}</div>
      ))}

      {files?.length === 0 && (
        <div>No files found</div>
      )}

      <Button onClick={() => {
        console.log(organization, "orgId", orgId);
        if (!orgId) {
          return;
        }
        createFile({ name: "Hello World", orgId })
      }
      }>Create file</Button>
    </main>
  )
}
