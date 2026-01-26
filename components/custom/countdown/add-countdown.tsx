"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createCountdown } from "./actions";

export function AddCountdownForm({ userId }: { userId: string }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newCountdown, setNewCountdown] = useState({
    title: "",
    targetDate: new Date(Date.now() + 86400000).toISOString().slice(0, 16),
    timezone: "Europe/Paris",
    isPublic: false,
  });

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button>Create Countdown</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Countdown</DialogTitle>
        </DialogHeader>
        <form
          action={async (formData) => {
            await createCountdown(formData, userId);
            setIsDialogOpen(false);
          }}
          className="space-y-4 py-4"
        >
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={newCountdown.title}
              onChange={(e) =>
                setNewCountdown({ ...newCountdown, title: e.target.value })
              }
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="targetDate">Target Date</Label>
            <Input
              id="targetDate"
              name="targetDate"
              type="datetime-local"
              value={newCountdown.targetDate}
              onChange={(e) =>
                setNewCountdown({ ...newCountdown, targetDate: e.target.value })
              }
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="timezone">Timezone</Label>
            <Input
              id="timezone"
              name="timezone"
              value={newCountdown.timezone}
              onChange={(e) =>
                setNewCountdown({ ...newCountdown, timezone: e.target.value })
              }
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="isPublic">Public</Label>
            <Switch
              id="isPublic"
              name="isPublic"
              checked={newCountdown.isPublic}
              onCheckedChange={(checked) =>
                setNewCountdown({ ...newCountdown, isPublic: checked })
              }
              className="col-span-3"
            />
            <input
              type="hidden"
              name="isPublic"
              value={String(newCountdown.isPublic)}
            />
          </div>
          <Button type="submit" className="w-full">
            Add
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
