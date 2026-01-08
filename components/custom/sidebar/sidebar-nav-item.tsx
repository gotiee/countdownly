"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";


import {

    SidebarMenuButton,
} from "@/components/ui/sidebar";


export function SidebarNavItem({ name, href }: { name: string, href: string }) {
    const pathname = usePathname();

    return (
        <SidebarMenuButton asChild className={pathname === href ? "bg-accent " : ""}>
            <Link href={href} className="pl-8">
                <span className={pathname === href ? "font-bold" : ""}>{name}</span>
            </Link>
        </SidebarMenuButton>
    )
}
