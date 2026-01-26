"use client";

import { Switch } from "@/components/ui/switch";
import { togglePublic } from "./actions";

export function TogglePublicForm({
  id,
  isPublic,
}: {
  id: string;
  isPublic: boolean;
}) {
  return (
    <form action={togglePublic.bind(null, id, isPublic)}>
      <Switch checked={isPublic} />
    </form>
  );
}
