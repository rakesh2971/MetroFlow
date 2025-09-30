import { Package, Percent, AlertTriangle } from 'lucide-react';
import { KpiCard } from '@/components/dashboard/kpi-card';
import { FleetAvailabilityChart } from '@/components/dashboard/fleet-availability-chart';
import { BrandingExposureChart } from '@/components/dashboard/branding-exposure-chart';
import { ConflictAlerts } from '@/components/dashboard/conflict-alerts';

export default function DashboardPage() {
  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
      <div className="grid gap-4 md:grid-cols-3 col-span-1 lg:col-span-2">
        <KpiCard
          title="Fleet Availability"
          value="92%"
          description="23 of 25 trainsets available"
          icon={Package}
        />
        <KpiCard
          title="Branding Exposure"
          value="68.75%"
          description="Achieved vs. required hours"
          icon={Percent}
        />
        <KpiCard
          title="Withdrawal Risk"
          value="High"
          description="1 trainset with expired certificate"
          icon={AlertTriangle}
        />
      </div>

      <FleetAvailabilityChart />
      <BrandingExposureChart />
      
      <div className="col-span-1 lg:col-span-2">
        <ConflictAlerts />
      </div>
    </div>
  );
}
