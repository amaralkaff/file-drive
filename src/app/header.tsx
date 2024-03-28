import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";

export function Header() {
    return (
        <div className="border-b">
            <div className="container mx-auto justify-between flex items-center py-4 bg-gray-50">
                <div>
                    <a href="/" className="text-lg font-bold">Drive-MangLy</a>
                </div>
                <div className="flex gap-2">
                    <OrganizationSwitcher />
                    <UserButton />
                </div>
            </div>
        </div>
    )
}