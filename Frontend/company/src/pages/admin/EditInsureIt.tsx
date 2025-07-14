
import ContentEditor from '@/components/admin/ContentEditor';
import { useToast } from '@/hooks/use-toast';

const EditInsureIt = () => {
  const { toast } = useToast();
  
  const handleSaveContent = (content: string) => {
    console.log("Saving InsureIt content:", content);
    toast({
      title: "Content saved",
      description: "InsureIt tool information has been updated."
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-4">Edit InsureIt Tool</h2>
        <p className="text-muted-foreground">
          Update the content and features of the InsureIt tool.
        </p>
      </div>
      
      <ContentEditor 
        title="InsureIt Tool Information" 
        initialValue={`# InsureIt Tool

## Smart Insurance Assessment

Our InsureIt tool helps you identify your insurance needs and recommends appropriate coverage options.

### How InsureIt Works:
1. **Answer simple questions** about your personal situation, assets, and concerns
2. **Receive personalized recommendations** based on your profile and risk factors
3. **Compare coverage options** from our partner insurance providers
4. **Apply directly** through our streamlined application process

### Key Features:
- Intelligent risk assessment algorithm
- Customized coverage recommendations
- Budget-conscious options
- Easy comparison of insurance providers
- One-click application process`}
        onSave={handleSaveContent}
      />
    </div>
  );
};

export default EditInsureIt;
