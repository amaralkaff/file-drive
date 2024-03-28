"use client";
import { Button } from "@/components/ui/button";
import { api } from "../../convex/_generated/api";
import { SignInButton, SignOutButton, SignedIn, SignedOut, useOrganization } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";

export default function Page() {
  const { organization } = useOrganization();
  console.log(organization?.id);
  const createFile = useMutation(api.files.createFile);
  const files = useQuery(api.files.getFiles, { name: "Hello World" });
  return (
    <main className="flex flex-col items-center justify-center w-screen h-screen space-y-4">
      <h1 className="text-4xl font-bold">Welcome to Drive-mangLy</h1>
      <SignedIn>
        <SignOutButton>
          <Button>Sign out</Button>
        </SignOutButton>
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal" >
          <Button>Sign in</Button>
        </SignInButton>
      </SignedOut>

      {files?.map(file => {
        return <div key={file._id}>{file.name}</div>
      })}

      <Button onClick={() => {
        if (!organization) {
          return;
        }
        createFile({ name: "Hello World", orgId: organization.id })
      }
      }>Create file</Button>
    </main>
  )
}
