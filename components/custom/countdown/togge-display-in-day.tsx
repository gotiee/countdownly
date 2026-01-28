"use client";

import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { toggleDisplayInDays } from "./actions";

export function ToggleDisplayInDays({
  id,
  displayInDays,
}: {
  id: string;
  displayInDays: boolean;
}) {
  const [displayInDaysState, setDisplayInDaysState] =
    useState<boolean>(displayInDays);
  return (
    <Switch
      checked={displayInDaysState}
      onCheckedChange={(checked) => {
        setDisplayInDaysState(checked);
        toggleDisplayInDays(id, checked);
      }}
    />
  );
}
