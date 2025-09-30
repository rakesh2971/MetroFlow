"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Play } from "lucide-react";
import { trainsets } from "@/lib/data";
import type { Trainset } from "@/types";
import { InductionListClient } from "../induction-list/induction-list-client";

export function SimulatorClient() {
    const [optimizationResult, setOptimizationResult] = useState<Trainset[] | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // State for each slider
    const [fitnessWeight, setFitnessWeight] = useState(85);
    const [jobCardWeight, setJobCardWeight] = useState(75);
    const [brandingWeight, setBrandingWeight] = useState(65);
    const [mileageWeight, setMileageWeight] = useState(55);
    const [cleaningWeight, setCleaningWeight] = useState(45);
    const [stablingWeight, setStablingWeight] = useState(35);

    const handleRunOptimization = () => {
        // Create a deep copy to avoid mutating the original data
        const simulatedData = JSON.parse(JSON.stringify(trainsets)) as Trainset[];

        // Simulate a new optimization run based on slider weights
        const newResult = simulatedData.map(train => {
            let newScore = 0;

            // 1. Fitness Certificates
            const certScore = train.certificates.some(c => c.status === 'expired') ? 0.1 : (train.certificates.some(c => c.status === 'expiring_soon') ? 0.6 : 1.0);
            newScore += certScore * (fitnessWeight / 100);

            // 2. Job-Card Status
            const jobCardScore = train.jobCards.some(j => j.status === 'open') ? 0.3 : 1.0;
            newScore += jobCardScore * (jobCardWeight / 100);
            
            // 3. Branding Priorities
            const brandingScore = train.branding ? (train.branding.exposureAchieved / train.branding.exposureHoursRequired) : 0.5;
            newScore += brandingScore * (brandingWeight / 100);

            // 4. Mileage Balancing (normalize mileage - lower is better for balancing)
            const maxMileage = Math.max(...trainsets.map(t => t.mileage));
            const mileageScore = 1 - (train.mileage / maxMileage);
            newScore += mileageScore * (mileageWeight / 100);

            // 5. Cleaning & Detailing
            const cleaningScore = train.cleaningReady ? 1.0 : 0.2;
            newScore += cleaningScore * (cleaningWeight / 100);

            // 6. Stabling Geometry (this is a mock score as we don't have geometry data)
            const stablingScore = Math.random(); // Placeholder
            newScore += stablingScore * (stablingWeight / 100);

            train.score = Math.round(newScore * 100); // Scale score to 0-100
            return train;
        });

        // Sort by the new score DESC
        const sortedData = newResult.sort((a, b) => b.score - a.score);

        // Update ranks
        const rankedData = sortedData.map((item, index) => ({
            ...item,
            rank: index + 1
        }));
        
        setOptimizationResult(rankedData);
        setIsDialogOpen(true);
    };

    return (
        <div className="space-y-4">
            <Card>
                <CardHeader>
                <CardTitle>Objective Weights</CardTitle>
                <CardDescription>Change the importance of different factors in the optimization.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8 pt-6">
                    <div className="space-y-4">
                        <Label htmlFor="fitness-certificates">Fitness Certificates Weight ({fitnessWeight})</Label>
                        <Slider id="fitness-certificates" value={[fitnessWeight]} onValueChange={(v) => setFitnessWeight(v[0])} max={100} step={1} />
                    </div>
                    <div className="space-y-4">
                        <Label htmlFor="job-card-status">Job-Card Status Weight ({jobCardWeight})</Label>
                        <Slider id="job-card-status" value={[jobCardWeight]} onValueChange={(v) => setJobCardWeight(v[0])} max={100} step={1} />
                    </div>
                    <div className="space-y-4">
                        <Label htmlFor="branding-priorities">Branding Priorities Weight ({brandingWeight})</Label>
                        <Slider id="branding-priorities" value={[brandingWeight]} onValueChange={(v) => setBrandingWeight(v[0])} max={100} step={1} />
                    </div>
                    <div className="space-y-4">
                        <Label htmlFor="mileage-balancing">Mileage Balancing Weight ({mileageWeight})</Label>
                        <Slider id="mileage-balancing" value={[mileageWeight]} onValueChange={(v) => setMileageWeight(v[0])} max={100} step={1} />
                    </div>
                    <div className="space-y-4">
                        <Label htmlFor="cleaning-slots">Cleaning & Detailing Slots Weight ({cleaningWeight})</Label>
                        <Slider id="cleaning-slots" value={[cleaningWeight]} onValueChange={(v) => setCleaningWeight(v[0])} max={100} step={1} />
                    </div>
                    <div className="space-y-4">
                        <Label htmlFor="stabling-geometry">Stabling Geometry Weight ({stablingWeight})</Label>
                        <Slider id="stabling-geometry" value={[stablingWeight]} onValueChange={(v) => setStablingWeight(v[0])} max={100} step={1} />
                    </div>
                    <Button onClick={handleRunOptimization}>
                        <Play className="mr-2 h-4 w-4"/>
                        Run New Optimization
                    </Button>
                </CardContent>
            </Card>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>New Optimization Result</DialogTitle>
                  <DialogDescription>This is the result of the new optimization based on the weights you set.</DialogDescription>
                </DialogHeader>
                {optimizationResult && (
                  <div className="mt-4">
                    <InductionListClient initialData={optimizationResult} />
                  </div>
                )}
              </DialogContent>
            </Dialog>
        </div>
    );
}
