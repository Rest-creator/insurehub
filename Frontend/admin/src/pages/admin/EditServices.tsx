
import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ContentEditor from '@/components/admin/ContentEditor';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const EditServices = () => {
  const { toast } = useToast();
  const [services, setServices] = useState<Service[]>([
    { 
      id: 1, 
      title: 'Insurance Comparison', 
      description: 'Compare policies from multiple providers to find the best coverage at the best price.', 
      icon: 'search' 
    },
    { 
      id: 2, 
      title: 'Policy Management', 
      description: 'Access and manage all your insurance policies in one convenient place.', 
      icon: 'file-text' 
    },
    { 
      id: 3, 
      title: 'Claims Assistance', 
      description: 'Get support throughout the claims process, from filing to resolution.', 
      icon: 'help-circle' 
    },
    { 
      id: 4, 
      title: 'Expert Consultation', 
      description: 'Connect with insurance professionals for personalized advice.', 
      icon: 'users' 
    }
  ]);

  const handleSaveIntro = (content: string) => {
    // In a real app, this would save to a database
    console.log("Saving services intro content:", content);
    toast({
      title: "Content updated",
      description: "The services introduction has been updated."
    });
  };

  const addNewService = () => {
    const newService = {
      id: services.length + 1,
      title: 'New Service',
      description: 'Description of the new service.',
      icon: 'star'
    };
    setServices([...services, newService]);
  };

  const updateService = (id: number, field: keyof Service, value: string) => {
    setServices(services.map(service => 
      service.id === id ? {...service, [field]: value} : service
    ));
  };

  const removeService = (id: number) => {
    setServices(services.filter(service => service.id !== id));
    toast({
      title: "Service removed",
      description: "The service has been removed from the list."
    });
  };

  const saveAllServices = () => {
    // In a real app, this would save to a database
    console.log("Saving all services:", services);
    toast({
      title: "Services saved",
      description: "All service information has been updated successfully."
    });
  };

  const iconOptions = ["search", "file-text", "help-circle", "users", "shield", "heart", "home", "car", "briefcase", "star"];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-4">Edit Services Page</h2>
        <p className="text-muted-foreground">
          Update the content and services displayed on the Services page.
        </p>
      </div>

      <ContentEditor 
        title="Services Introduction" 
        initialValue={`# Our Services

## Comprehensive Insurance Solutions

InsureHub offers a range of services designed to simplify your insurance experience. From comparing policies to managing claims, we're here to help at every step.

Whether you're looking for personal insurance coverage or solutions for your business, our platform provides the tools and expertise you need to make informed decisions.`}
        onSave={handleSaveIntro}
      />

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Services List</CardTitle>
          <Button onClick={addNewService}>
            <Plus className="h-4 w-4 mr-2" /> Add Service
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {services.map(service => (
              <div key={service.id} className="p-4 border rounded-md relative">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 right-2 text-gray-500" 
                  onClick={() => removeService(service.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <Label htmlFor={`title-${service.id}`}>Service Title</Label>
                    <Input
                      id={`title-${service.id}`}
                      value={service.title}
                      onChange={(e) => updateService(service.id, 'title', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`icon-${service.id}`}>Icon</Label>
                    <select 
                      id={`icon-${service.id}`}
                      value={service.icon}
                      onChange={(e) => updateService(service.id, 'icon', e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                    >
                      {iconOptions.map(icon => (
                        <option key={icon} value={icon}>{icon}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="mt-4">
                  <Label htmlFor={`desc-${service.id}`}>Description</Label>
                  <Textarea
                    id={`desc-${service.id}`}
                    value={service.description}
                    onChange={(e) => updateService(service.id, 'description', e.target.value)}
                    className="mt-1"
                    rows={2}
                  />
                </div>
              </div>
            ))}
            
            {services.length === 0 && (
              <p className="text-center py-8 text-muted-foreground">
                No services added yet. Add your first service to get started.
              </p>
            )}
            
            {services.length > 0 && (
              <Button onClick={saveAllServices} className="mt-4">
                Save All Services
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditServices;
