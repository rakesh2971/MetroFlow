import { SimulatorClient } from "@/components/simulator/simulator-client";

export default function SimulatorPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Conflict & What-if Simulator</h1>
        <p className="text-muted-foreground">
          Adjust weights and run a new optimization to compare outcomes.
        </p>
      </div>
      <SimulatorClient />
    </div>
  );
}
