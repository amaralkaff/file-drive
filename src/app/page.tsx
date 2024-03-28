"use client"
import { Button } from "@/components/ui/button";
import { api } from "../../convex/_generated/api";
import { SignInButton, SignOutButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";

export default function Page() {
  const createFile = useMutation(api.files.createFile);
  const files = useQuery(api.files.getFiles);
  return (
    <main className="flex flex-col items-center justify-center w-screen h-screen space-y-4">
      <h1 className="text-4xl font-bold">Welcome to Clerk!</h1>
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

      <Button onClick={() => createFile({ name: "Hello World" })}>
        Create a data
      </Button>
    </main>
  )
}
