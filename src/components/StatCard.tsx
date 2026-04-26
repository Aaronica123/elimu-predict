import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: { value: string; positive: boolean };
  variant?: "default" | "primary" | "success" | "warning" | "danger";
}

const StatCard = ({ label, value, icon: Icon, trend, variant = "default" }: StatCardProps) => (
  <div className={cn("stat-card", variant !== "default" && variant)}>
    <div>
      <p className="label">{label}</p>
      <p className="value">{value}</p>
      {trend && (
        <p className={cn("trend", trend.positive ? "up" : "down")}>
          {trend.positive ? "↑" : "↓"} {trend.value}
        </p>
      )}
    </div>
    <div className={cn("stat-icon", variant !== "default" && variant)}>
      <Icon />
    </div>
  </div>
);

export default StatCard;
