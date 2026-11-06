import { useLocation } from "wouter";
import AdminLayout from "@/components/admin/AdminLayout";

const PAGES: Record<string, { title: string; blurb: string }> = {
  "/admin": { title: "Overview", blurb: "A snapshot of the business will live here." },
  "/admin/analytics": { title: "Analytics", blurb: "Traffic and conversions will live here once Google Analytics 4 is connected." },
  "/admin/leads": { title: "Leads", blurb: "Demo requests from the website will live here." },
  "/admin/retailers": { title: "Retailers", blurb: "Retail partners will be managed here." },
  "/admin/advertisers": { title: "Advertisers", blurb: "Advertisers and their deals will be managed here." },
  "/admin/settings": { title: "Settings", blurb: "Admin settings will live here." },
};

export default function Admin() {
  const [location] = useLocation();
  const page = PAGES[location.replace(/\/$/, "") || "/admin"] ?? PAGES["/admin"];

  return (
    <AdminLayout title={page.title}>
      <div className="rounded-lg border-2 border-dashed border-gray-300 bg-white p-10 text-center">
        <p className="text-lg font-semibold text-gray-900">Coming soon</p>
        <p className="mt-1 text-sm text-gray-600">{page.blurb}</p>
        <span className="mt-4 inline-block h-1 w-12 rounded bg-brand-green" />
      </div>
    </AdminLayout>
  );
}
