import { trainsets } from "@/lib/data";
import { InductionListClient } from "@/components/induction-list/induction-list-client";

export default function InductionListPage() {
  const sortedData = [...trainsets].sort((a, b) => a.rank - b.rank);
  
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Induction List</h1>
        <p className="text-muted-foreground">
          Nightly trainset allocation. Drag to reorder if you have permissions.
        </p>
      </div>
      <InductionListClient initialData={sortedData} />
    </div>
  );
}
