"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  MessageSquare,
  Users,
  KanbanSquare,
  Megaphone,
  BrainCircuit,
  Target,
  Handshake,
  AreaChart,
  Cog,
  ChevronLeft,
  ChevronRight,
  Building2,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ThemeToggle } from "@/components/theme-toggle";

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Conversations",
    href: "/dashboard/conversations",
    icon: MessageSquare,
  },
  {
    title: "Contacts",
    href: "/dashboard/contacts",
    icon: Users,
  },
  {
    title: "Pipeline",
    href: "/dashboard/pipeline",
    icon: KanbanSquare,
  },
  {
    title: "Marketing Hub",
    href: "/dashboard/marketing-hub",
    icon: Megaphone,
  },
  {
    title: "Intelligence Center",
    href: "/dashboard/intelligence-center",
    icon: BrainCircuit,
  },
  {
    title: "Coaching Hub",
    href: "/dashboard/coaching-hub",
    icon: Target,
  },
  {
    title: "Partner Portal",
    href: "/dashboard/partner-portal",
    icon: Handshake,
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
    icon: AreaChart,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Cog,
  },
];

interface SidebarProps {
  user?: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("user");
      router.push("/login");
    }
  };

  // Check if we're using Executive Suite Light theme for special sidebar styling
  const isExecSuiteLight = typeof window !== 'undefined' && 
    document.documentElement.getAttribute('data-theme') === 'exec-suite-light';

  return (
    <TooltipProvider>
      <div
        className={cn(
          "flex flex-col h-full bg-[var(--c-sidebar)] transition-all duration-300",
          isCollapsed ? "w-16" : "w-64",
          isExecSuiteLight ? "text-[var(--c-text-sidebar)]" : "text-[var(--c-text-primary)]"
        )}
      >
        <div className="flex items-center justify-between p-4">
          <div
            className={cn(
              "flex items-center gap-3",
              isCollapsed && "justify-center",
            )}
          >
            <Building2 className={cn("h-8 w-8 flex-shrink-0", isExecSuiteLight ? "text-[var(--c-text-sidebar)]" : "text-[var(--c-text-primary)]")} />
            {!isCollapsed && (
              <h1 className={cn("text-2xl font-bold", isExecSuiteLight ? "text-[var(--c-text-sidebar)]" : "text-[var(--c-text-primary)]")}>CHOSEN</h1>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={cn("hover:bg-[var(--c-surface)]/10", isExecSuiteLight ? "text-[var(--c-text-sidebar)]" : "text-[var(--c-text-primary)]")}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        <ScrollArea className="flex-1 px-3">
          <nav className="space-y-1 py-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              if (isCollapsed) {
                return (
                  <Tooltip key={item.href} delayDuration={0}>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center justify-center py-3 rounded-lg transition-colors",
                          isExecSuiteLight ? "hover:bg-white/10" : "hover:bg-[var(--c-surface)]",
                          isActive && (isExecSuiteLight ? "bg-white/20" : "bg-[var(--c-primary)]/20"),
                        )}
                      >
                        <Icon className={cn("h-5 w-5", isExecSuiteLight ? "text-[var(--c-text-sidebar)]" : "text-[var(--c-text-primary)]")} />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="ml-2">
                      <p>{item.title}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 rounded-lg transition-colors",
                    isExecSuiteLight ? "hover:bg-white/10" : "hover:bg-[var(--c-surface)]",
                    isActive && (isExecSuiteLight ? "bg-white/20" : "bg-[var(--c-primary)]/20"),
                  )}
                >
                  <Icon className={cn("h-5 w-5 flex-shrink-0", isExecSuiteLight ? "text-[var(--c-text-sidebar)]" : "text-[var(--c-text-primary)]")} />
                  <span className={cn(isExecSuiteLight ? "text-[var(--c-text-sidebar)]" : "text-[var(--c-text-primary)]")}>{item.title}</span>
                </Link>
              );
            })}
          </nav>
        </ScrollArea>

        <div className={cn("border-t p-4 space-y-4", isExecSuiteLight ? "border-white/10" : "border-[var(--c-border)]")}>
          <div className="flex items-center justify-center">
            <ThemeToggle />
          </div>
          
          <div
            className={cn(
              "flex items-center gap-3",
              isCollapsed && "justify-center",
            )}
          >
            <Avatar className="h-10 w-10 flex-shrink-0">
              <AvatarFallback className={cn(isExecSuiteLight ? "bg-white/20 text-[var(--c-text-sidebar)]" : "bg-[var(--c-surface)] text-[var(--c-text-primary)]")}>
                {user ? `${user.firstName[0]}${user.lastName[0]}` : "U"}
              </AvatarFallback>
            </Avatar>
            {!isCollapsed && user && (
              <div className="flex-1 min-w-0">
                <p className={cn("text-sm font-medium truncate", isExecSuiteLight ? "text-[var(--c-text-sidebar)]" : "text-[var(--c-text-primary)]")}>
                  {user.firstName} {user.lastName}
                </p>
                <p className={cn("text-xs truncate", isExecSuiteLight ? "text-[var(--c-text-sidebar)]/70" : "text-[var(--c-text-secondary)]")}>{user.email}</p>
              </div>
            )}
          </div>

          {isCollapsed ? (
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  className={cn("w-full", isExecSuiteLight ? "text-[var(--c-text-sidebar)] hover:bg-white/10" : "text-[var(--c-text-primary)] hover:bg-[var(--c-surface)]")}
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" className="ml-2">
                <p>Logout</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <Button
              variant="ghost"
              onClick={handleLogout}
              className={cn("w-full justify-start", isExecSuiteLight ? "text-[var(--c-text-sidebar)] hover:bg-white/10" : "text-[var(--c-text-primary)] hover:bg-[var(--c-surface)]")}
            >
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </Button>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
}
