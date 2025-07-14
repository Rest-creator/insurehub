
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from 'react';
import { NewClaimFormData } from './types';

interface FileClaimFormProps {
  onSubmit: (formData: NewClaimFormData) => void;
  onCancel: () => void;
  initialValues?: NewClaimFormData;
}

const FileClaimForm = ({ onSubmit, onCancel, initialValues = { title: '', policyType: '', amount: '', description: '' } }: FileClaimFormProps) => {
  const [formData, setFormData] = useState<NewClaimFormData>(initialValues);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  useEffect(() => {
    // Reset errors when the form opens with new initial values
    setErrors({});
    setFormData(initialValues);
  }, [initialValues]);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Claim title is required";
    }
    
    if (!formData.policyType) {
      newErrors.policyType = "Please select a policy type";
    }
    
    if (!formData.amount) {
      newErrors.amount = "Claim amount is required";
    } else if (isNaN(parseFloat(formData.amount)) || parseFloat(formData.amount) <= 0) {
      newErrors.amount = "Please enter a valid amount";
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "Please provide a description";
    } else if (formData.description.trim().length < 10) {
      newErrors.description = "Description is too short";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <DialogContent className="sm:max-w-[525px]">
      <DialogHeader>
        <DialogTitle>File a New Claim</DialogTitle>
        <DialogDescription>
          Please provide the details of your insurance claim below.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="claim-title">Claim Title</Label>
          <Input 
            id="claim-title" 
            placeholder="e.g., Car Accident Repair"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className={errors.title ? "border-red-500" : ""}
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="policy-type">Policy Type</Label>
          <Select 
            value={formData.policyType}
            onValueChange={(value) => setFormData({...formData, policyType: value})}
          >
            <SelectTrigger id="policy-type" className={errors.policyType ? "border-red-500" : ""}>
              <SelectValue placeholder="Select policy type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Auto Insurance">Auto Insurance</SelectItem>
              <SelectItem value="Home Insurance">Home Insurance</SelectItem>
              <SelectItem value="Health Insurance">Health Insurance</SelectItem>
              <SelectItem value="Business Insurance">Business Insurance</SelectItem>
              <SelectItem value="Travel Insurance">Travel Insurance</SelectItem>
            </SelectContent>
          </Select>
          {errors.policyType && <p className="text-red-500 text-xs mt-1">{errors.policyType}</p>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="claim-amount">Claim Amount ($)</Label>
          <Input 
            id="claim-amount" 
            type="number" 
            placeholder="0.00"
            value={formData.amount}
            onChange={(e) => setFormData({...formData, amount: e.target.value})}
            className={errors.amount ? "border-red-500" : ""}
          />
          {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="claim-description">Description</Label>
          <Textarea 
            id="claim-description" 
            placeholder="Please describe the incident or damage in detail"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className={errors.description ? "border-red-500" : ""}
          />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit Claim</Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default FileClaimForm;