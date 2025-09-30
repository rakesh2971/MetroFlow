import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const bays = {
  A: ['A1', 'A2', 'A3', 'A4'],
  B: ['B1', 'B2', 'B3', 'B4'],
  C: ['C1', 'C2', 'C3', 'C4'],
};

const trainPositions: { [key: string]: string } = {
  'A1': 'TS01',
  'A2': 'TS02',
  'A3': 'TS05',
  'B1': 'TS03',
  'B2': 'TS06',
  'C1': 'TS04',
};

export default function StablingYardPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Stabling Yard Map</h1>
        <p className="text-muted-foreground">
          Visualize trainset positions in the stabling yard.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Yard Layout</CardTitle>
          <CardDescription>Drag and drop trainsets to simulate shunting (UI only).</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(bays).map(([line, bayIds]) => (
              <div key={line}>
                <h3 className="font-semibold text-lg mb-2">Line {line}</h3>
                <div className="grid grid-cols-2 gap-2">
                  {bayIds.map(bayId => (
                    <div key={bayId} className="border rounded-lg p-4 min-h-[80px] bg-muted/50 flex flex-col justify-between">
                      <span className="text-sm font-medium text-muted-foreground">{bayId}</span>
                      {trainPositions[bayId] ? (
                         <Badge className="w-fit">{trainPositions[bayId]}</Badge>
                      ) : (
                        <span className="text-sm text-muted-foreground">Empty</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
