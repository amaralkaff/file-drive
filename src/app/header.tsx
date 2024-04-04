import { Button } from "@/components/ui/button";
import {
  OrganizationSwitcher,
  SignInButton,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export function Header() {
  return (
    <div className="sticky top-0 z-10 bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4">
        <div>
          <a href="/" className="text-xl font-semibold">
            DriveMangLy
          </a>
        </div>
        <div className="flex items-center gap-4">
          <OrganizationSwitcher />
          <UserButton />
          <SignedOut>
            <SignInButton mode="modal">
              <Button>Sign in</Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </div>
  );
}
