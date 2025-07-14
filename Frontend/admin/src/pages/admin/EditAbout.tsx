
import ContentEditor from '@/components/admin/ContentEditor';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';

const EditAbout = () => {
  const { toast } = useToast();
  const [missionTitle, setMissionTitle] = useState('Our Mission');
  
  const handleSaveMission = (content: string) => {
    // In a real app, this would save to a database
    console.log("Saving mission content:", content);
    toast({
      title: "Mission updated",
      description: "The mission content has been updated successfully."
    });
  };
  
  const handleSaveTeam = (content: string) => {
    // In a real app, this would save to a database
    console.log("Saving team content:", content);
    toast({
      title: "Team information updated",
      description: "The team information has been updated successfully."
    });
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-4">Edit About Page</h2>
        <p className="text-muted-foreground">
          Update the mission statement and team information on the About Us page.
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Page Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="missionTitle">Mission Section Title</Label>
              <Input 
                id="missionTitle" 
                value={missionTitle}
                onChange={(e) => setMissionTitle(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button>Update Settings</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <ContentEditor 
        title="Company Mission" 
        initialValue={`# Our Mission

## Transforming the Insurance Industry

At InsureHub, we believe insurance should be simple, transparent, and accessible to everyone. Our platform brings together cutting-edge technology and industry expertise to create a seamless insurance experience.

### Our Values:

- **Simplicity**: Making complex insurance concepts easy to understand
- **Transparency**: Clear information about coverage, costs, and claims
- **Innovation**: Using technology to improve the insurance experience
- **Customer-First**: Prioritizing your needs in everything we do`}
        onSave={handleSaveMission}
      />
      
      <ContentEditor 
        title="Team Information" 
        initialValue={`# Our Team

## The People Behind InsureHub

Our diverse team brings together expertise from insurance, technology, and customer service. We're united by our passion to transform the insurance industry.

### Leadership:

- **Sarah Johnson** - CEO & Co-founder
  *20+ years of experience in insurance technology*
  
- **Michael Chen** - CTO & Co-founder
  *Former lead architect at InsureTech Global*
  
- **Priya Sharma** - Chief Insurance Officer
  *Previously VP of Underwriting at National Insurance*
  
- **David Rodriguez** - Head of Customer Experience
  *Specialist in creating seamless digital experiences*`}
        onSave={handleSaveTeam}
      />
    </div>
  );
};

export default EditAbout;
