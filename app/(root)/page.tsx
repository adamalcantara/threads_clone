import { ClerkProvider, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      {/* The user button which controls account information */}
      <ClerkProvider>
        <UserButton afterSignOutUrl="/" />
      </ClerkProvider>
    </div>
  )
}