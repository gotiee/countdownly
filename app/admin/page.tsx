import { Button } from "@/components/ui/button";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { enGB } from "date-fns/locale";
import { db } from "@/db/drizzle";
import { countdown } from "@/db/auth-schema";
import { desc, eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { AddCountdownForm } from "@/components/custom/countdown/add-countdown";
import { TogglePublicForm } from "@/components/custom/countdown/toggle-public";
import { CopyLinkButton } from "@/components/custom/countdown/copy-link-button";
import { DeleteCountdownDialog } from "@/components/custom/countdown/delete-countdown";
import { ToggleDisplayInDays } from "@/components/custom/countdown/togge-display-in-day";

export type Countdown = {
  id: string;
  title: string;
  targetDate: Date;
  timezone: string;
  displayInDays: boolean;
  isPublic: boolean;
  userId: string;
};

export default async function CountdownsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    redirect("/login");
  }

  const countdowns = await db
    .select()
    .from(countdown)
    .where(eq(countdown.userId, session.user.id))
    .orderBy(desc(countdown.targetDate), countdown.id);

  const getTimeRemaining = (targetDate: Date) => {
    const now = new Date();
    const isPast = targetDate < now;
    const distance = formatDistanceToNow(targetDate, { locale: enGB });

    return isPast ? `Done (${distance} ago)` : `In ${distance}`;
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Countdown Management</h1>
        <AddCountdownForm userId={session.user.id} />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Target Date</TableHead>
            <TableHead>Time Remaining</TableHead>
            <TableHead>Display in day</TableHead>
            <TableHead>Public</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {countdowns.map((c) => (
            <TableRow key={c.id}>
              <TableCell className="font-medium">{c.title}</TableCell>
              <TableCell>
                {format(c.targetDate, "PPpp", { locale: enGB })}
              </TableCell>
              <TableCell>{getTimeRemaining(c.targetDate)}</TableCell>
              <TableCell>
                <ToggleDisplayInDays
                  id={c.id}
                  displayInDays={c.displayInDays}
                />
              </TableCell>
              <TableCell>
                <TogglePublicForm id={c.id} isPublic={c.isPublic} />
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <CopyLinkButton countdownId={c.id} />
                    <DeleteCountdownDialog countdownId={c.id} />
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
