"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {
  Bell,
  ChevronRight,
  LogOut,
  Settings,
  User as UserIcon,
} from 'lucide-react';
import { useUser } from '@/contexts/user-context';
import { SidebarTrigger } from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';

function getBreadcrumb(pathname: string) {
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs = segments.map((segment, index) => {
        const href = '/' + segments.slice(0, index + 1).join('/');
        const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
        return { href, label };
    });

    if (pathname === '/dashboard') {
        return [{ href: '/dashboard', label: 'Dashboard' }];
    }

    return [{ href: '/dashboard', label: 'Home' }, ...breadcrumbs];
}


export function Header() {
  const { user } = useUser();
  const pathname = usePathname();
  const breadcrumbs = getBreadcrumb(pathname);
  const userAvatar = PlaceHolderImages.find(img => img.id === 'user-avatar');


  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <SidebarTrigger className="sm:hidden" />
      
      <div className="hidden items-center gap-2 text-sm text-muted-foreground md:flex">
        {breadcrumbs.map((crumb, index) => (
            <div key={crumb.href + index} className="flex items-center gap-2">
                {index > 0 && <ChevronRight className="h-4 w-4" />}
                <Link href={crumb.href} className={`transition-colors ${index === breadcrumbs.length - 1 ? 'text-foreground font-medium' : 'hover:text-foreground'}`}>
                    {crumb.label}
                </Link>
            </div>
        ))}
      </div>

      <div className="relative ml-auto flex items-center gap-2">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage 
                  src={userAvatar?.imageUrl} 
                  alt={user.name} 
                  data-ai-hint={userAvatar?.imageHint}
                />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="font-semibold">{user.name}</span>
                <span className="text-xs text-muted-foreground">{user.email}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <UserIcon />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/login">
                <LogOut />
                <span>Logout</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
