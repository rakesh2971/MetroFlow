import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const pastRuns = [
  { id: 'RUN-20240520', date: '2024-05-20', user: 'Supervisor A', changes: 2 },
  { id: 'RUN-20240519', date: '2024-05-19', user: 'Supervisor B', changes: 0 },
  { id: 'RUN-20240518', date: '2024-05-18', user: 'Admin', changes: 5 },
];

export default function HistoryPage() {
  return (
    <div className="space-y-4">
       <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Induction Run History</h1>
            <p className="text-muted-foreground">
            Review past induction runs, overrides, and audit logs.
            </p>
        </div>
        <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export All
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Past Runs</CardTitle>
          <CardDescription>A log of all previously executed induction optimizations.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Run ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Created By</TableHead>
                <TableHead>Manual Overrides</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pastRuns.map(run => (
                <TableRow key={run.id}>
                  <TableCell className="font-medium">{run.id}</TableCell>
                  <TableCell>{run.date}</TableCell>
                  <TableCell>{run.user}</TableCell>
                  <TableCell>
                    <Badge variant={run.changes > 0 ? "destructive" : "secondary"}>
                      {run.changes}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">View Details</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
