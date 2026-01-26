"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export function CopyLinkButton({ countdownId }: { countdownId: string }) {
  return (
    <DropdownMenuItem
      onSelect={() =>
        navigator.clipboard.writeText(
          `https://countdownly.raclette.ovh/${countdownId}`,
        )
      }
    >
      Copy Link
    </DropdownMenuItem>
  );
}
