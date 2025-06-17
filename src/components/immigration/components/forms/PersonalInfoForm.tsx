"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, Mail, Phone, MapPin, Calendar } from "lucide-react";

import { personalInfoSchema, PersonalInfoFormData } from "../../schemas/case-form.schemas";
import { CaseFormData, ChecklistProgress } from "../../types/workflow.types";

interface PersonalInfoFormProps {
  formData: CaseFormData;
  onFieldChange: (field: string, value: any) => void;
  onStepComplete: (stepData: any) => void;
  validationErrors: Record<string, string>;
  checklistProgress: ChecklistProgress;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  formData,
  onFieldChange,
  onStepComplete,
  validationErrors,
  checklistProgress
}) => {
  const form = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: formData.personalInfo || {
      surname: "",
      forename: "",
      otherName: "",
      dateOfBirth: "",
      gender: "Male",
      countryOfBirth: "",
      currentLocation: "",
      address: {
        line1: "",
        line2: "",
        line3: "",
        line4: "",
      },
      contactPhone: "",
      contactEmail: "",
    },
  });

  const onSubmit = (data: PersonalInfoFormData) => {
    onFieldChange('personalInfo', data);
    onStepComplete({ personalInfo: data });
  };

  // Watch form changes and update parent
  React.useEffect(() => {
    const subscription = form.watch((value) => {
      if (value) {
        onFieldChange('personalInfo', value);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, onFieldChange]);

  const countries = [
    "Afghanistan", "Albania", "Algeria", "Argentina", "Australia", "Austria",
    "Bangladesh", "Belgium", "Brazil", "Canada", "China", "Denmark",
    "Egypt", "France", "Germany", "Ghana", "India", "Indonesia",
    "Ireland", "Italy", "Japan", "Kenya", "Malaysia", "Mexico",
    "Netherlands", "Nigeria", "Norway", "Pakistan", "Philippines", "Poland",
    "Portugal", "Russia", "Saudi Arabia", "South Africa", "Spain", "Sweden",
    "Switzerland", "Thailand", "Turkey", "Ukraine", "United Kingdom", "United States"
  ];

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-medium text-blue-900 mb-2">Personal Information</h3>
        <p className="text-sm text-blue-700">
          Please provide your personal details exactly as they appear on your passport. 
          All fields marked with * are required.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="surname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <User size={16} />
                    Surname *
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your surname" 
                      {...field}
                      className={validationErrors.surname ? "border-red-500" : ""}
                    />
                  </FormControl>
                  <FormMessage />
                  {validationErrors.surname && (
                    <p className="text-sm text-red-600">{validationErrors.surname}</p>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="forename"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <User size={16} />
                    Forename *
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your forename" 
                      {...field}
                      className={validationErrors.forename ? "border-red-500" : ""}
                    />
                  </FormControl>
                  <FormMessage />
                  {validationErrors.forename && (
                    <p className="text-sm text-red-600">{validationErrors.forename}</p>
                  )}
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="otherName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Other Names (if any)</FormLabel>
                <FormControl>
                  <Input placeholder="Enter any other names" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Personal Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Calendar size={16} />
                    Date of Birth *
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="DD/MM/YYYY" 
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="countryOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country of Birth *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="currentLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <MapPin size={16} />
                    Current Location *
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="City, Country" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Address */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Current Address</h4>
            
            <FormField
              control={form.control}
              name="address.line1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Line 1 *</FormLabel>
                  <FormControl>
                    <Input placeholder="Street address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="address.line2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address Line 2</FormLabel>
                    <FormControl>
                      <Input placeholder="Apartment, suite, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address.line3"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address Line 3</FormLabel>
                    <FormControl>
                      <Input placeholder="City" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address.line4"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Line 4</FormLabel>
                  <FormControl>
                    <Input placeholder="State/Province, Postal Code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Contact Information</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="contactPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Phone size={16} />
                      Phone Number *
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="+1 234 567 8900" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Mail size={16} />
                      Email Address *
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="your.email@example.com" 
                        {...field}
                        className={validationErrors.contactEmail ? "border-red-500" : ""}
                      />
                    </FormControl>
                    <FormMessage />
                    {validationErrors.contactEmail && (
                      <p className="text-sm text-red-600">{validationErrors.contactEmail}</p>
                    )}
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-between pt-6 border-t">
            <div className="text-sm text-gray-600">
              * Required fields
            </div>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Save and Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PersonalInfoForm;
