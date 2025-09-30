'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ListOrdered,
  Map,
  SlidersHorizontal,
  History,
  TrainFront,
} from 'lucide-react';

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { UserSwitcher } from './user-switcher';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/induction-list', icon: ListOrdered, label: 'Induction List' },
  { href: '/stabling-yard', icon: Map, label: 'Stabling Yard' },
  { href: '/simulator', icon: SlidersHorizontal, label: 'Simulator' },
  { href: '/history', icon: History, label: 'History' },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <Link
          href="/dashboard"
          className="flex items-center gap-2.5 text-lg font-semibold text-primary"
        >
          <TrainFront className="h-6 w-6" />
          <span className="text-xl font-bold tracking-tight text-foreground">
            Metro<span className="text-primary">Flow</span>
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} passHref>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={item.label}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <UserSwitcher />
      </SidebarFooter>
    </Sidebar>
  );
}
