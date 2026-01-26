"use client";
import { toast } from "sonner";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export function CopyLinkButton({ countdownId }: { countdownId: string }) {
  return (
    <DropdownMenuItem
      onSelect={() =>
        navigator.clipboard.writeText(
          `https://countdownly.raclette.ovh/${countdownId}`,
        )
      }
      onClick={() => toast.success("Link copied to clipboard!")}
    >
      Copy Link
    </DropdownMenuItem>
  );
}
