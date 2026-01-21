"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent } from "@/components/ui/card";

export type Task = {
  id: string;
  content: string;
};

export function TaskCard({ task }: { task: Task }) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: "grab",
  };

  return (
    <Card ref={setNodeRef} style={style} className="mb-2">
      <CardContent
        {...attributes}
        {...listeners}
        className="p-4 flex items-center"
      >
        {task.content}
      </CardContent>
    </Card>
  );
}
