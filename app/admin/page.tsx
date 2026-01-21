import { SimpleSortableList } from "@/components/custom/dnd/KanbanBoard";

export default function Admin() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Liste triable</h1>
      <SimpleSortableList />
    </div>
  );
}
