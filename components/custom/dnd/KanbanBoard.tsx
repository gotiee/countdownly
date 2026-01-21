"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { Task, TaskCard } from "./TaskCard";

const initialTasks: Task[] = [
  { id: "task1", content: "Project initiation and planning" },
  { id: "task2", content: "Gather requirements from stakeholders" },
  { id: "task3", content: "Create wireframes and mockups" },
  { id: "task4", content: "Develop homepage layout" },
  { id: "task5", content: "Design color scheme and typography" },
];

export function SimpleSortableList() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setTasks((tasks) => {
      const oldIndex = tasks.findIndex((task) => task.id === active.id);
      const newIndex = tasks.findIndex((task) => task.id === over.id);
      return arrayMove(tasks, oldIndex, newIndex);
    });
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={tasks}>
        <div className="space-y-2 max-w-md">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
