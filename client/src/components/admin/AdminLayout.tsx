import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { BarChart3, Inbox, LayoutDashboard, Megaphone, Menu, Settings, Store, type LucideIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import logo from "@assets/image_1750091632559.png";

type NavItem = { label: string; href: string; icon: LucideIcon };
type NavGroup = { heading?: string; items: NavItem[] };

export const ADMIN_NAV: NavGroup[] = [
  {
    items: [
      { label: "Overview", href: "/admin", icon: LayoutDashboard },
      { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    ],
  },
  {
    heading: "Operations",
    items: [
      { label: "Leads", href: "/admin/leads", icon: Inbox },
      { label: "Retailers", href: "/admin/retailers", icon: Store },
      { label: "Advertisers", href: "/admin/advertisers", icon: Megaphone },
    ],
  },
  {
    items: [{ label: "Settings", href: "/admin/settings", icon: Settings }],
  },
];

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const [location] = useLocation();
  return (
    <nav className="flex flex-col gap-6 px-3">
      {ADMIN_NAV.map((group, i) => (
        <div key={group.heading ?? i} className="flex flex-col gap-1">
          {group.heading && (
            <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wider brand-green">
              {group.heading}
            </p>
          )}
          {group.items.map(({ label, href, icon: Icon }) => {
            const active = location === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={onNavigate}
                className={`flex min-h-[44px] items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors ${
                  active
                    ? "bg-brand-yellow text-gray-900"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5" />
                {label}
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}

function Brand() {
  return (
    <Link href="/admin" className="flex items-center gap-2 px-6">
      <img src={logo} alt="ThankYouDeals.com" className="h-9 w-auto rounded bg-white p-1" />
      <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Admin</span>
    </Link>
  );
}

export default function AdminLayout({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.title = `${title} | Admin | ThankYouDeals`;
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, [title]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 md:flex">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col gap-8 bg-gray-900 py-6 md:flex">
        <Brand />
        <NavLinks />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile top bar */}
        <header className="flex items-center gap-3 border-b-4 border-brand-yellow bg-gray-900 px-4 py-3 md:hidden">
          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-md text-white hover:bg-white/10"
          >
            <Menu className="h-6 w-6" />
          </button>
          <span className="font-semibold text-white">Admin</span>
        </header>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="left" className="w-64 border-0 bg-gray-900 px-0 py-6 [&>button]:text-white">
            <SheetTitle className="sr-only">Admin menu</SheetTitle>
            <SheetDescription className="sr-only">Navigate the admin area</SheetDescription>
            <div className="flex flex-col gap-8">
              <Brand />
              <NavLinks onNavigate={() => setOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>

        <main className="flex-1 p-4 md:p-8">
          <h1 className="mb-6 border-l-4 border-brand-yellow pl-3 text-2xl font-bold text-gray-900">{title}</h1>
          {children}
        </main>
      </div>
    </div>
  );
}
