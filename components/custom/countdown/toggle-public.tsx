"use client";

import { Switch } from "@/components/ui/switch";
import { togglePublic } from "./actions";
import { useState } from "react";

export function TogglePublicForm({
  id,
  isPublic,
}: {
  id: string;
  isPublic: boolean;
}) {
  const [isPublicState, setIsPublicState] = useState<boolean>(isPublic);
  return (
    <Switch
      checked={isPublicState}
      onCheckedChange={(checked) => {
        setIsPublicState(checked);
        togglePublic(id, checked);
      }}
    />
  );
}
