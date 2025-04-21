import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Upload } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { profileService } from '@/services/api';

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  location: z.string().min(2, "Location is required"),
  experience: z.string().min(1, "Experience is required"),
  specialties: z.array(z.string()),
  crops: z.array(z.string()),
  contact: z.object({
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
  }),
  image: z.any().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface ProfileEditProps {
  onClose: () => void;
  farmerData: {
    _id: string;
    name: string;
    location: string;
    experience: string;
    specialties: string[];
    crops: string[];
    contact: {
      email: string;
      phone: string;
    };
    image?: string;
  };
  mode?: 'edit' | 'add';
}

export function ProfileEdit({ onClose, farmerData, mode = 'edit' }: ProfileEditProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [previewImage, setPreviewImage] = useState<string | null>(farmerData.image || null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: farmerData.name,
      location: farmerData.location,
      experience: farmerData.experience,
      specialties: farmerData.specialties,
      crops: farmerData.crops,
      contact: {
        email: farmerData.contact.email,
        phone: farmerData.contact.phone,
      },
      image: null,
    },
  });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "Image size should be less than 2MB",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue("image", file);
    }
  };

  async function onSubmit(values: FormData) {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      
      // Append text fields
      formData.append("name", values.name);
      formData.append("location", values.location);
      formData.append("experience", values.experience);
      formData.append("specialties", JSON.stringify(values.specialties));
      formData.append("crops", JSON.stringify(values.crops));
      formData.append("contact", JSON.stringify(values.contact));

      // Append image if exists
      if (values.image) {
        formData.append("image", values.image);
      }

      const response = await profileService.updateProfile(farmerData._id, formData);

      toast({
        title: "Success",
        description: response.message,
        variant: "default",
      });
      onClose();
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Header */}
        <div className="border-b pb-6">
          <h2 className="text-xl font-semibold">Edit Profile</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Update your farming profile details below.
          </p>
        </div>

        {/* Scrollable Content */}
        <div className="space-y-6">
          {/* Image Upload Section */}
          <div className="flex flex-col items-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Recommended size: 500x500px, Max size: 2MB
            </p>
            <div className="relative w-32 h-32">
              <div 
                className="w-full h-full rounded-full border-2 border-dashed border-gray-300 
                          flex flex-col items-center justify-center cursor-pointer hover:border-gray-400
                          transition-colors relative overflow-hidden bg-white"
                onClick={() => document.getElementById("profile-image-edit")?.click()}
              >
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-400"
                    >
                      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                      <path d="M12 12v9" />
                      <path d="m16 16-4-4-4 4" />
                    </svg>
                  </div>
                )}
              </div>
              <input
                type="file"
                id="profile-image-edit"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <p className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-sm text-gray-600 whitespace-nowrap">
                Change Image
              </p>
            </div>
          </div>

          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Personal Information</h3>
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your full name" 
                        {...field} 
                        className="bg-white border-gray-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your farm location" 
                        {...field} 
                        className="bg-white border-gray-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Experience</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter years of farming experience" 
                        {...field} 
                        className="bg-white border-gray-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Contact Information</h3>
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="contact.email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="Enter your email address" 
                        {...field} 
                        className="bg-white border-gray-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contact.phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your phone number" 
                        {...field} 
                        className="bg-white border-gray-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        {/* Form Actions - Fixed at Bottom */}
        <div className="border-t pt-6 mt-6 sticky bottom-0 bg-white">
          <div className="flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="bg-white border-gray-200 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-black text-white hover:bg-gray-800"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
} 


