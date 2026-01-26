"use client";

import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { Countdown } from "../admin/page";

export default function PublicCountdownPage({
  params,
}: {
  params: { id: string };
}) {
  const [countdown, setCountdown] = useState<Countdown | null>(null);

  useEffect(() => {
    const fetchCountdown = async () => {
      const res = await fetch(`/api/countdowns/${params.id}`);
      const data = await res.json();
      setCountdown(data);
    };
    fetchCountdown();
  }, [params.id]);

  if (!countdown) return <div>Chargement...</div>;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">{countdown.title}</h1>
      <p className="text-2xl">
        {formatDistanceToNow(new Date(countdown.targetDate), { locale: fr })}
      </p>
    </div>
  );
}
