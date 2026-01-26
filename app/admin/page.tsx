"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MoreHorizontal } from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

// Type pour un décompteur
type Countdown = {
  id: string;
  title: string;
  targetDate: Date;
  timezone: string;
  isPublic: boolean;
};

export default function CountdownsPage() {
  const [countdowns, setCountdowns] = useState<Countdown[]>([]);
  const [newCountdown, setNewCountdown] = useState<Omit<Countdown, "id">>({
    title: "",
    targetDate: new Date(Date.now() + 86400000), // Par défaut : demain
    timezone: "Europe/Paris",
    isPublic: false,
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const mockData: Countdown[] = [
      {
        id: "1",
        title: "Nouvel An 2026",
        targetDate: new Date("2026-01-01T00:00:00+01:00"),
        timezone: "Europe/Paris",
        isPublic: true,
      },
      {
        id: "2",
        title: "Lancement projet",
        targetDate: new Date("2025-12-15T09:00:00+01:00"),
        timezone: "Europe/Paris",
        isPublic: false,
      },
    ];
    setCountdowns(mockData);
  }, []);

  const getTimeRemaining = (targetDate: Date) => {
    return formatDistanceToNow(targetDate, { locale: fr });
  };

  const handleAdd = () => {
    const id = crypto.randomUUID();
    setCountdowns([...countdowns, { ...newCountdown, id }]);
    setIsDialogOpen(false);
    setNewCountdown({
      title: "",
      targetDate: new Date(Date.now() + 86400000),
      timezone: "Europe/Paris",
      isPublic: false,
    });
  };

  const handleDelete = (id: string) => {
    setCountdowns(countdowns.filter((c) => c.id !== id));
  };

  const handleTogglePublic = (id: string) => {
    setCountdowns(
      countdowns.map((c) =>
        c.id === id ? { ...c, isPublic: !c.isPublic } : c,
      ),
    );
  };

  return (
    <div className=" mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des décompteurs</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Create countdown</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New countdown</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newCountdown.title}
                  onChange={(e) =>
                    setNewCountdown({ ...newCountdown, title: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="targetDate">Target Date</Label>
                <Input
                  id="targetDate"
                  type="datetime-local"
                  value={newCountdown.targetDate.toISOString().slice(0, 16)}
                  onChange={(e) =>
                    setNewCountdown({
                      ...newCountdown,
                      targetDate: new Date(e.target.value),
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="timezone">Timezone</Label>
                <Input
                  id="timezone"
                  value={newCountdown.timezone}
                  onChange={(e) =>
                    setNewCountdown({
                      ...newCountdown,
                      timezone: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="isPublic">Public</Label>
                <Switch
                  id="isPublic"
                  checked={newCountdown.isPublic}
                  onCheckedChange={(checked) =>
                    setNewCountdown({ ...newCountdown, isPublic: checked })
                  }
                  className="col-span-3"
                />
              </div>
              <Button onClick={handleAdd} className="w-full">
                Ajouter
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Target Date</TableHead>
            <TableHead>Time Remaining</TableHead>
            <TableHead>Public</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {countdowns.map((countdown) => (
            <TableRow key={countdown.id}>
              <TableCell className="font-medium">{countdown.title}</TableCell>
              <TableCell>
                {format(countdown.targetDate, "PPpp", { locale: fr })}
              </TableCell>
              <TableCell>{getTimeRemaining(countdown.targetDate)}</TableCell>
              <TableCell>
                <Switch
                  checked={countdown.isPublic}
                  onCheckedChange={() => handleTogglePublic(countdown.id)}
                />
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onSelect={() =>
                        navigator.clipboard.writeText(
                          `https://countdownly.raclette.ovh/${countdown.id}`,
                        )
                      }
                    >
                      Copy link
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => handleDelete(countdown.id)}
                      className="text-red-600"
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
