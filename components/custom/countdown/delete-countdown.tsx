"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { deleteCountdown } from "./actions";

export function DeleteCountdownDialog({
  countdownId,
}: {
  countdownId: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="w-full text-left text-red-600 px-2 py-1.5 hover:bg-red-50 rounded-sm text-xs">
          Delete
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trash2 className="h-4 w-4 text-red-600" />
            Confirm deletion
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to permanently delete this countdown?
            <span className="block font-medium mt-2">
              This action cannot be undone.
            </span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <form action={deleteCountdown.bind(null, countdownId)}>
            <Button
              type="submit"
              variant="destructive"
              onClick={() => setOpen(false)}
            >
              Confirm
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
