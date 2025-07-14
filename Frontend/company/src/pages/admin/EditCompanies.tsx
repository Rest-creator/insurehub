
import ContentEditor from '@/components/admin/ContentEditor';
import { useToast } from '@/hooks/use-toast';

const EditCompanies = () => {
  const { toast } = useToast();
  
  const handleSaveContent = (content: string) => {
    console.log("Saving insurance companies content:", content);
    toast({
      title: "Content saved",
      description: "Insurance companies information has been updated."
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-4">Edit Insurance Companies</h2>
        <p className="text-muted-foreground">
          Update the insurance companies information displayed to users.
        </p>
      </div>
      
      <ContentEditor 
        title="Insurance Companies Content" 
        initialValue={`# Insurance Companies

## Our Partner Companies

InsureHub works with leading insurance providers to bring you comprehensive coverage options.

### Featured Insurance Companies:
- **Guardian Insurance**
  *Specializing in home and auto insurance with superior claim service*
  
- **Secure Life & Health**
  *Offering innovative health and life insurance products for individuals and families*
  
- **Business Shield Inc.**
  *Business insurance specialists with industry-specific coverage options*
  
- **Global Coverage Group**
  *Comprehensive international insurance for travelers and expatriates*`}
        onSave={handleSaveContent}
      />
    </div>
  );
};

export default EditCompanies;
