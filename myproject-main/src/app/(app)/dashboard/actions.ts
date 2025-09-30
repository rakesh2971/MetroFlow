"use server";

import { conflictDetectionAndAlerting } from "@/ai/flows/conflict-detection-and-alerting";
import type { Trainset } from "@/types";

export async function checkConflicts(trainsetData: Trainset[], userRole: string) {
  try {
    const result = await conflictDetectionAndAlerting({
      trainsetData: JSON.stringify(trainsetData, null, 2),
      userRole,
    });
    return { success: true, alerts: result.alerts };
  } catch (error) {
    console.error("Error in conflict detection flow:", error);
    return { success: false, alerts: ["Failed to run conflict detection."] };
  }
}
