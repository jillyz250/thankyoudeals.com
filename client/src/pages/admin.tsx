import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { AnalyticsStats } from "@shared/schema";

const RANGES = [7, 30, 90] as const;

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value.toLocaleString()}</div>
      </CardContent>
    </Card>
  );
}

function CountTable({ title, labelHeader, rows }: { title: string; labelHeader: string; rows: { label: string; views: number }[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {rows.length === 0 ? (
          <p className="text-sm text-muted-foreground">No data yet.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{labelHeader}</TableHead>
                <TableHead className="text-right">Views</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.label}>
                  <TableCell className="break-all">{r.label}</TableCell>
                  <TableCell className="text-right">{r.views}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

function AnalyticsTab() {
  const [days, setDays] = useState<number>(30);
  const { data, isLoading, isError } = useQuery<AnalyticsStats>({
    queryKey: [`/api/analytics?days=${days}`],
  });

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {RANGES.map((r) => (
          <button
            key={r}
            onClick={() => setDays(r)}
            className={`min-h-[44px] rounded-md border px-4 text-sm font-medium ${
              days === r ? "bg-primary text-primary-foreground" : "bg-background hover:bg-muted"
            }`}
          >
            Last {r} days
          </button>
        ))}
      </div>

      {isLoading && <p className="text-muted-foreground">Loading…</p>}
      {isError && <p className="text-destructive">Could not load analytics.</p>}

      {data && (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Stat label="Page views" value={data.totalViews} />
            <Stat label="Unique visitors" value={data.uniqueVisitors} />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Page views per day</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.daily}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" tickFormatter={(d: string) => d.slice(5)} fontSize={12} minTickGap={16} />
                    <YAxis allowDecimals={false} fontSize={12} width={32} />
                    <Tooltip />
                    <Bar dataKey="views" className="fill-primary" radius={[3, 3, 0, 0]} isAnimationActive={false} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <CountTable
              title="Top pages"
              labelHeader="Page"
              rows={data.topPages.map((p) => ({ label: p.path, views: p.views }))}
            />
            <CountTable
              title="Top referrers"
              labelHeader="Site"
              rows={data.topReferrers.map((r) => ({ label: r.referrer, views: r.views }))}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default function Admin() {
  useEffect(() => {
    document.title = "Admin | ThankYouDeals";
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Admin</h1>
      <Tabs defaultValue="analytics">
        <TabsList>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="analytics" className="mt-6">
          <AnalyticsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
