"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, FileText, Wrench, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Trainset } from "@/types";

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'service':
      return 'default';
    case 'standby':
      return 'secondary';
    case 'IBL':
      return 'outline';
    default:
      return 'secondary';
  }
};

const getConstraintBadges = (train: Trainset) => {
  const badges = [];
  if (train.certificates.some(c => c.status !== 'valid')) {
    badges.push(
      <Badge key="cert" variant="destructive" className="flex items-center gap-1">
        <FileText className="h-3 w-3" /> Cert
      </Badge>
    );
  }
  if (train.jobCards.some(j => j.status === 'open')) {
    badges.push(
      <Badge key="job" variant="outline" className="text-foreground border-amber-500 flex items-center gap-1">
        <Wrench className="h-3 w-3" /> Job
      </Badge>
    );
  }
  if (!train.cleaningReady) {
    badges.push(
      <Badge key="clean" variant="outline" className="text-foreground border-sky-500 flex items-center gap-1">
        <Droplets className="h-3 w-3" /> Clean
      </Badge>
    );
  }
  return badges;
};

export const columns: ColumnDef<Trainset>[] = [
  {
    accessorKey: "rank",
    header: "Rank",
    cell: ({ row }) => <div className="font-medium">{row.getValue("rank")}</div>,
  },
  {
    accessorKey: "fleetNumber",
    header: "Trainset ID",
  },
  {
    accessorKey: "status",
    header: "Assigned State",
    cell: ({ row }) => (
      <Badge variant={getStatusVariant(row.getValue("status"))} className="capitalize">
        {row.getValue("status")}
      </Badge>
    ),
  },
  {
    id: "constraints",
    header: "Constraints",
    cell: ({ row }) => <div className="flex gap-2">{getConstraintBadges(row.original)}</div>,
  },
  {
    accessorKey: "mileage",
    header: "Mileage (km)",
    cell: ({ row }) => {
      const mileage = row.getValue("mileage") as number;
      return <div className="text-right">{mileage.toLocaleString()}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const train = row.original;

      return (
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DialogTrigger asChild>
                 <DropdownMenuItem>View Reasoning</DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Reasoning for {train.fleetNumber}</DialogTitle>
            </DialogHeader>
            <div className="mt-4 max-h-[60vh] overflow-y-auto rounded-md bg-muted p-4">
              <pre className="text-sm">{JSON.stringify({ score: train.score, reasons: train.reasons }, null, 2)}</pre>
            </div>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
