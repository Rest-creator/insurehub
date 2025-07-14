
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

interface FlaggedIssue {
  id: string;
  message: string;
  priority: string;
}

interface FlaggedIssuesProps {
  issues: FlaggedIssue[];
}

const FlaggedIssues = ({ issues }: FlaggedIssuesProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Flagged Issues</CardTitle>
        <CardDescription>Claims requiring immediate attention</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {issues.map(issue => (
            <li key={issue.id} className="border-b pb-3 last:border-0">
              <div className="flex items-start">
                <AlertCircle className={`h-5 w-5 mr-3 mt-0.5 ${issue.priority === 'high' ? 'text-red-500' : 'text-yellow-500'}`} />
                <div>
                  <p className="text-sm font-medium">{issue.message}</p>
                  <p className="text-xs text-muted-foreground">Priority: {issue.priority}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default FlaggedIssues;