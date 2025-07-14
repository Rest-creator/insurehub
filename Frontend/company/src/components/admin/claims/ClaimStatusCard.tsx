
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LucideIcon } from "lucide-react";

interface ClaimStatusCardProps {
  title: string;
  count: number;
  totalClaims: number;
  icon: LucideIcon;
  color: string;
}

const ClaimStatusCard = ({ title, count, totalClaims, icon: Icon, color }: ClaimStatusCardProps) => {
  const percentage = Math.round((count / totalClaims) * 100);
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between space-x-2">
          <div className="flex items-center space-x-2">
            <Icon className={`h-4 w-4 ${color}`} />
            <span className="text-2xl font-bold">{count}</span>
          </div>
          <div className="text-xs text-muted-foreground">
            {percentage}% of total
          </div>
        </div>
        <Progress className="mt-2" value={percentage} />
      </CardContent>
    </Card>
  );
};

export default ClaimStatusCard;