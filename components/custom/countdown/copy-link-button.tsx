"use client";
import { toast } from "sonner";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";

export function CopyLinkButton({ countdownId }: { countdownId: string }) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);
  return (
    <DropdownMenuItem
      onSelect={() =>
        navigator.clipboard.writeText(
          `${url?.replace("/admin", "")}/${countdownId}`,
        )
      }
      onClick={() => toast.success("Link copied to clipboard!")}
    >
      Copy Link
    </DropdownMenuItem>
  );
}
