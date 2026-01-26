"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { deleteCountdown } from "./actions";

export function DeleteCountdownForm({ countdownId }: { countdownId: string }) {
  return (
    <DropdownMenuItem
      asChild
      className="text-red-600 focus:text-red-600 cursor-pointer"
    >
      <form action={deleteCountdown.bind(null, countdownId)}>
        <button type="submit" className="w-full text-left">
          Delete
        </button>
      </form>
    </DropdownMenuItem>
  );
}
