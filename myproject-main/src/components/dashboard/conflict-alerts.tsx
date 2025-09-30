'use client';

import { useState } from 'react';
import { AlertTriangle, Bot, Loader } from 'lucide-react';
import { useUser } from '@/contexts/user-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { checkConflicts } from '@/app/(app)/dashboard/actions';
import { trainsets } from '@/lib/data';

export function ConflictAlerts() {
  const { user } = useUser();
  const [alerts, setAlerts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckConflicts = async () => {
    setIsLoading(true);
    setAlerts([]);
    const result = await checkConflicts(trainsets, user.role);
    if (result.success) {
      setAlerts(result.alerts);
    } else {
      setAlerts(['An error occurred while checking for conflicts.']);
    }
    setIsLoading(false);
  };

  const canRun = user.role === 'admin' || user.role === 'supervisor';

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1.5">
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            AI Conflict Detection
          </CardTitle>
          <CardDescription>
            Identify potential issues in the trainset data.
          </CardDescription>
        </div>
        <Button onClick={handleCheckConflicts} disabled={isLoading || !canRun}>
          {isLoading ? (
            <Loader className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <AlertTriangle className="mr-2 h-4 w-4" />
          )}
          {isLoading ? 'Analyzing...' : 'Run Check'}
        </Button>
      </CardHeader>
      <CardContent>
        {!canRun && (
          <Alert variant="default" className="bg-muted">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Permission Denied</AlertTitle>
            <AlertDescription>
              You must be an Admin or Supervisor to run conflict checks.
            </AlertDescription>
          </Alert>
        )}
        {canRun && alerts.length === 0 && !isLoading && (
          <div className="text-center text-sm text-muted-foreground p-8">
            Click &quot;Run Check&quot; to scan for conflicts.
          </div>
        )}
        {isLoading && (
            <div className="flex justify-center items-center p-8">
                <Loader className="h-8 w-8 animate-spin text-primary"/>
            </div>
        )}
        {alerts.length > 0 && (
          <div className="space-y-2">
            {alerts.map((alert, index) => (
              <Alert key={index} variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Conflict Detected</AlertTitle>
                <AlertDescription>{alert}</AlertDescription>
              </Alert>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
