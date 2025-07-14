
import ContentEditor from '@/components/admin/ContentEditor';
import { useToast } from '@/hooks/use-toast';

const EditClaims = () => {
  const { toast } = useToast();
  
  const handleSaveContent = (content: string) => {
    console.log("Saving Claims Management content:", content);
    toast({
      title: "Content saved",
      description: "Claims Management information has been updated."
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-4">Edit Claims Management</h2>
        <p className="text-muted-foreground">
          Update the content and features of the Claims Management system.
        </p>
      </div>
      
      <ContentEditor 
        title="Claims Management Information" 
        initialValue={`# Claims Management System

## Simplifying the Claims Process

Our Claims Management system streamlines the insurance claims process, providing you with clear guidance and support when you need it most.

### How Our Claims Management Works:
1. **Report your claim** through our simple online interface
2. **Upload supporting documents** like photos, reports, and estimates
3. **Track your claim status** in real-time as it progresses
4. **Communicate directly** with claims adjusters through our secure messaging system

### Key Features:
- Step-by-step claim filing guidance
- Document management and storage
- Real-time status updates
- Direct communication with claims personnel
- Claim history and documentation for your records

### Types of Claims Supported:
- Auto insurance claims
- Home insurance claims
- Health insurance claims
- Life insurance claims
- Business insurance claims`}
        onSave={handleSaveContent}
      />
    </div>
  );
};

export default EditClaims;
