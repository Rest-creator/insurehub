import { useEffect, useState } from "react";
import {
  Building,
  MapPin,
  Phone,
  Globe,
  Mail,
  Users,
  Shield,
  Calendar,
  Save,
  Upload,
  Loader,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import ContentEditor from "@/components/admin/ContentEditor";
import Server from "@/components/server/Server";

interface CompanyProfile {
  id: number;
  name: string;
  logo: string;
  shortDescription: string;
  longDescription: string;
  establishedYear: string;
  website: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    country: string;
  };
  social_media: {
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
  };
  specialties: string[];
  coverageAreas: string[];
  teamSize: string;
}

const EditCompanyProfile = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("basic");

  const userData = localStorage.getItem("userData");
  const user = userData ? JSON.parse(userData) : null;
  const [loading, setLoading] = useState(false);

  // Example company profile
  const [profile, setProfile] = useState<CompanyProfile>({
    id: user.id,
    name: user.name,
    logo: "/placeholder.svg",
    shortDescription: user.tagline,
    longDescription: user.about,
    establishedYear: user.year,
    website: user.website,
    email: user.email,
    phone: user.phone,
    address: {
      street: user.street,
      city: user.city,
      country: user.country,
    },
    social_media: {
      facebook: user.facebook,
      twitter: user.twitter,
      linkedin: user.linkedin,
      instagram: user.instagram,
    },
    specialties: user.specialties?.split(","),
    coverageAreas: user.coverageAreas?.split(","),
    teamSize: user.teamSize || "1-10 employees",
  });

  const handleInputChange = (field: string, value: string) => {
    setProfile({
      ...profile,
      [field]: value,
    });
  };

  const handleAddressChange = (field: string, value: string) => {
    setProfile({
      ...profile,
      address: {
        ...profile.address,
        [field]: value,
      },
    });
  };

  const handleSocialMediaChange = (field: string, value: string) => {
    setProfile({
      ...profile,
      social_media: {
        ...profile.social_media,
        [field]: value,
      },
    });
  };

  const handleArrayChange = (
    field: "specialties" | "coverageAreas",
    value: string
  ) => {
    setProfile({
      ...profile,
      [field]: value.split(",").map((item) => item.trim()),
    });
  };

  const handleSaveProfile = () => {
    // In a real app, this would save to a database
    setLoading(true);
    console.log("Saving company profile:", profile);
    Server.addCompanyProfile(profile)
      .then((response) => {
        console.log("Profile saved successfully:", response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error saving profile:", error);
        setLoading(false);
        toast({
          title: "Error",
          description: "Failed to save your company profile.",
          variant: "destructive",
        });
      });
    toast({
      title: "Profile saved",
      description: "Your company profile has been updated successfully.",
    });
  };

  const getCompanyProfile = () => {
    Server.getCompanyProfile(user.email)
      .then((response) => {
        if (response.status === 200) {
          setProfile(response.data);
          // console.log(response.data);
          const updatedUserData = {
            ...user,
            companyId: response.data.id  // Assuming the response contains the company ID
          };
          localStorage.setItem("userData", JSON.stringify(updatedUserData));
        } else {
          toast({
            title: "Error",
            description: "Failed to fetch your company profile.",
            variant: "destructive",
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching company profile:", error);
        toast({
          title: "Error",
          description: "Failed to fetch your company profile.",
          variant: "destructive",
        });
      });
  };

  useEffect(() => {
    getCompanyProfile();
  }, []);

  const handleSaveDescription = (content: string) => {
    setProfile({
      ...profile,
      longDescription: content,
    });

    toast({
      title: "Description updated",
      description: "Your company description has been saved.",
    });
  };

  const handleLogoUpload = () => {
    // This would be implemented with a real file upload in a production app
    toast({
      title: "Logo upload",
      description: "File upload feature would be implemented here.",
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-4">Company Profile</h2>
        <p className="text-muted-foreground">
          Manage your insurance company information and public profile.
        </p>
      </div>

      <Tabs
        defaultValue={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="basic">Basic Information</TabsTrigger>
          <TabsTrigger value="contact">Contact Details</TabsTrigger>
          <TabsTrigger value="specialties">Specialties</TabsTrigger>
          <TabsTrigger value="about">About & Description</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Company Identity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3 flex flex-col items-center justify-center">
                  <div className="border rounded-md w-40 h-40 flex items-center justify-center mb-4 overflow-hidden">
                    <img
                      src={profile.logo}
                      alt="Company Logo"
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <Button variant="outline" onClick={handleLogoUpload} disabled>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Logo
                  </Button>
                </div>

                <div className="md:w-2/3 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input
                      id="company-name"
                      value={profile.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      placeholder={user.name}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="short-description">
                      Tagline/Short Description
                    </Label>
                    <Input
                      id="short-description"
                      value={profile.shortDescription}
                      onChange={(e) =>
                        handleInputChange("shortDescription", e.target.value)
                      }
                      placeholder="Brief description of your company"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="established">Year Established</Label>
                      <Input
                        id="established"
                        value={profile.establishedYear}
                        onChange={(e) =>
                          handleInputChange("establishedYear", e.target.value)
                        }
                        placeholder="e.g., 1985"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="team-size">Team Size</Label>
                      <select
                        id="team-size"
                        value={profile.teamSize}
                        onChange={(e) =>
                          handleInputChange("teamSize", e.target.value)
                        }
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <option value="1-10 employees">1-10 employees</option>
                        <option value="11-50 employees">11-50 employees</option>
                        <option value="51-200 employees">
                          51-200 employees
                        </option>
                        <option value="201-500 employees">
                          201-500 employees
                        </option>
                        <option value="501-1000 employees">
                          501-1000 employees
                        </option>
                        <option value="1000+ employees">1000+ employees</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="website">Company Website</Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground">
                        <Globe className="h-4 w-4" />
                      </span>
                      <Input
                        id="website"
                        value={profile.website}
                        onChange={(e) =>
                          handleInputChange("website", e.target.value)
                        }
                        placeholder="https://www.example.com"
                        className="rounded-l-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground">
                        <Mail className="h-4 w-4" />
                      </span>
                      <Input
                        id="email"
                        value={profile.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        placeholder="contact@example.com"
                        className="rounded-l-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground">
                        <Phone className="h-4 w-4" />
                      </span>
                      <Input
                        id="phone"
                        value={profile.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        placeholder="(555) 123-4567"
                        className="rounded-l-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="street">Street Address</Label>
                    <Input
                      id="street"
                      value={profile.address.street}
                      onChange={(e) =>
                        handleAddressChange("street", e.target.value)
                      }
                      placeholder="123 Main Street"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={profile.address.city}
                        onChange={(e) =>
                          handleAddressChange("city", e.target.value)
                        }
                        placeholder="City"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        value={profile.address.country}
                        onChange={(e) =>
                          handleAddressChange("country", e.target.value)
                        }
                        placeholder="Country"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <h3 className="text-lg font-medium mb-4">Social Media</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="facebook">Facebook</Label>
                    <Input
                      id="facebook"
                      value={profile.social_media.facebook}
                      onChange={(e) =>
                        handleSocialMediaChange("facebook", e.target.value)
                      }
                      placeholder="https://facebook.com/yourcompany"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter</Label>
                    <Input
                      id="twitter"
                      value={profile.social_media.twitter}
                      onChange={(e) =>
                        handleSocialMediaChange("twitter", e.target.value)
                      }
                      placeholder="https://twitter.com/yourcompany"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      value={profile.social_media.linkedin}
                      onChange={(e) =>
                        handleSocialMediaChange("linkedin", e.target.value)
                      }
                      placeholder="https://linkedin.com/company/yourcompany"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input
                      id="instagram"
                      value={profile.social_media.instagram}
                      onChange={(e) =>
                        handleSocialMediaChange("instagram", e.target.value)
                      }
                      placeholder="https://instagram.com/yourcompany"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="specialties" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Specialties & Coverage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="specialties">Specialties</Label>
                  <p className="text-sm text-muted-foreground">
                    Enter your insurance specialties separated by commas
                  </p>
                  <Textarea
                    id="specialties"
                    value={profile.specialties?.join(", ")}
                    onChange={(e) =>
                      handleArrayChange("specialties", e.target.value)
                    }
                    placeholder="e.g., Auto Insurance, Home Insurance, Life Insurance"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="coverage-areas">Coverage Areas</Label>
                  <p className="text-sm text-muted-foreground">
                    Enter regions or states where you provide coverage,
                    separated by commas
                  </p>
                  <Textarea
                    id="coverage-areas"
                    value={profile.coverageAreas?.join(", ")}
                    onChange={(e) =>
                      handleArrayChange("coverageAreas", e.target.value)
                    }
                    placeholder="e.g., California, Nevada, Arizona"
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="about">
          <ContentEditor
            title="About Your Company"
            initialValue={profile.longDescription}
            onSave={handleSaveDescription}
          />
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button
          onClick={handleSaveProfile}
          size="lg"
          className="flex items-center justify-center bg-insurance-orange hover:bg-insurance-orange-dark"
        >
          {loading ? (
            <span>
              <Loader className="animate-spin mr-2" /> Saving...
            </span>
          ) : (
            <span className="flex items-center">
              <Save className="h-4 w-4 mr-2" />
              Save Profile
            </span>
          )}
        </Button>
      </div>
    </div>
  );
};

export default EditCompanyProfile;
