
import { Card } from '@/components/ui/card';
import ContentEditor from '@/components/admin/ContentEditor';
import { useToast } from '@/hooks/use-toast';

const EditHome = () => {
  const { toast } = useToast();

  const handleSaveHero = (content: string) => {
    // In a real app, this would save to a database
    console.log("Saving hero content:", content);
    // Success message is already handled in ContentEditor
  };

  const handleSaveServices = (content: string) => {
    console.log("Saving featured services content:", content);
  };

  const handleSaveCallToAction = (content: string) => {
    console.log("Saving call to action content:", content);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-4">Edit Home Page</h2>
        <p className="text-muted-foreground">
          Update the content displayed on the home page of InsureHub.
        </p>
      </div>

      <ContentEditor 
        title="Hero Section" 
        initialValue={`# InsureHub
## Simplifying Insurance for Everyone
        
Find, compare, and manage all your insurance needs in one place.

*Trusted by over 10,000 customers nationwide*`}
        onSave={handleSaveHero}
      />

      <ContentEditor 
        title="Featured Services" 
        initialValue={`# Our Featured Services
## Discover how InsureHub can help you

- **Insurance Comparisons**: Compare policies from multiple providers
- **Policy Management**: Manage all your policies in one place
- **Claims Assistance**: Get help with filing and tracking claims
- **Expert Consultation**: Talk to our insurance experts`}
        onSave={handleSaveServices}
      />

      <ContentEditor 
        title="Call to Action" 
        initialValue={`# Ready to simplify your insurance experience?
        
Sign up now for free and start exploring our platform.`}
        onSave={handleSaveCallToAction}
      />
    </div>
  );
};

export default EditHome;
