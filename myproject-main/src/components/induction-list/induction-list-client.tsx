"use client";

import { useState, useRef, DragEvent } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { columns } from "./columns";
import type { Trainset } from "@/types";
import { cn } from "@/lib/utils";
import { useUser } from "@/contexts/user-context";

interface InductionListClientProps {
  initialData: Trainset[];
}

export function InductionListClient({ initialData }: InductionListClientProps) {
  const { user } = useUser();
  const [data, setData] = useState(initialData);
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);
  const [draggedRowIndex, setDraggedRowIndex] = useState<number | null>(null);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowIndex: number, columnId: string, value: unknown) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
    },
  });

  const canDrag = user.role === 'admin' || user.role === 'supervisor';

  const handleDragStart = (e: DragEvent<HTMLTableRowElement>, index: number) => {
    dragItem.current = index;
    setDraggedRowIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnter = (index: number) => {
    dragOverItem.current = index;
  };
  
  const handleDragEnd = () => {
    if (dragItem.current !== null && dragOverItem.current !== null && dragItem.current !== dragOverItem.current) {
        const newData = [...data];
        const draggedItemContent = newData.splice(dragItem.current, 1)[0];
        newData.splice(dragOverItem.current, 0, draggedItemContent);
        
        // Update ranks
        const rankedData = newData.map((item, index) => ({
            ...item,
            rank: index + 1
        }));

        setData(rankedData);
    }
    dragItem.current = null;
    dragOverItem.current = null;
    setDraggedRowIndex(null);
  };


  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                draggable={canDrag}
                onDragStart={(e) => handleDragStart(e, row.index)}
                onDragEnter={() => handleDragEnter(row.index)}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => e.preventDefault()}
                className={cn(
                  "transition-colors",
                  canDrag && "cursor-move",
                  draggedRowIndex === row.index && "bg-muted opacity-50"
                )}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
