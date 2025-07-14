
import ContentEditor from '@/components/admin/ContentEditor';
import { useToast } from '@/hooks/use-toast';

const EditCommercial = () => {
  const { toast } = useToast();
  
  const handleSaveContent = (content: string) => {
    console.log("Saving commercial programs content:", content);
    toast({
      title: "Content saved",
      description: "Commercial programs information has been updated."
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-4">Edit Commercial Programs</h2>
        <p className="text-muted-foreground">
          Update the commercial insurance programs information.
        </p>
      </div>
      
      <ContentEditor 
        title="Commercial Programs Content" 
        initialValue={`# Commercial Insurance Programs

## Business Insurance Solutions

InsureHub provides specialized insurance programs for businesses of all sizes.

### Our Commercial Insurance Options:
- **Small Business Coverage**
  *Comprehensive protection tailored for small businesses and startups*
  
- **Industry-Specific Programs**
  *Specialized coverage for retail, professional services, construction, and more*
  
- **Enterprise Risk Solutions**
  *Custom insurance packages for large corporations with complex needs*
  
- **Liability Protection**
  *Professional liability, general liability, and product liability options*
  
### Why Choose Our Commercial Programs:
- Competitive rates through our network of providers
- Simplified application and claims process
- Risk management tools and resources
- Dedicated business insurance specialists`}
        onSave={handleSaveContent}
      />
    </div>
  );
};

export default EditCommercial;
