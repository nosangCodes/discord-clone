import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <p className="text-3xl font-bold text-indigo-500">
        This is a procted page
      </p>
      <ModeToggle />
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
