import React, { useState, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Edit, MapPin, Phone, Mail, Tractor, Wheat, Plus } from "lucide-react";
import { ProfileEdit } from "@/components/profile/ProfileEdit";
import { AddProfile } from "@/components/profile/AddProfile";
import { profileService } from "@/services/api";
import styles from "./Profile.module.scss";

interface Contact {
  email: string;
  phone: string;
}

interface FarmerData {
  _id: string;
  name: string;
  location: string;
  experience: string;
  specialties: string[];
  crops: string[];
  contact: Contact;
  image?: string;
}

const Profile = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [farmerData, setFarmerData] = useState<FarmerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching profile data...');
        const response = await profileService.getAllProfiles();
        console.log('Profile response:', response);

        if (response.data && Array.isArray(response.data)) {
          if (response.data.length > 0) {
            console.log('Setting farmer data:', response.data[0]);
            setFarmerData(response.data[0]);
          } else {
            console.log('No profiles found');
            setError("No profiles found. Please create a new profile.");
          }
        } else {
          console.error('Unexpected response structure:', response);
          setError("Invalid data format received from server");
        }
      } catch (err) {
        console.error('Error in fetchProfileData:', err);
        setError(err instanceof Error ? err.message : "Failed to fetch profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleAddProfileSuccess = async () => {
    setIsAddOpen(false);
    // Refresh the profile data
    try {
      setLoading(true);
      const response = await profileService.getAllProfiles();
      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        setFarmerData(response.data[0]);
        setError(null);
      }
    } catch (err) {
      console.error('Error refreshing profiles:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.profileContainer}>
        <div className={styles.loadingState}>Loading profile data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.profileContainer}>
        <div className={styles.errorState}>
          <p>{error}</p>
          <Button 
            variant="default" 
            className={styles.addButton}
            onClick={() => setIsAddOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" /> Create New Profile
          </Button>
          <Sheet open={isAddOpen} onOpenChange={setIsAddOpen}>
            <SheetContent 
              side="right" 
              className="w-full max-w-md p-0 bg-white border-l shadow-none flex flex-col"
            >
              <div className="flex-1 overflow-y-auto">
                <div className="px-6 py-4">
                  <AddProfile onClose={handleAddProfileSuccess} />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    );
  }

  if (!farmerData) {
    return (
      <div className={styles.profileContainer}>
        <div className={styles.emptyState}>
          <p>No profile data available</p>
          <Button 
            variant="default" 
            className={styles.addButton}
            onClick={() => setIsAddOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" /> Create New Profile
          </Button>
          <Sheet open={isAddOpen} onOpenChange={setIsAddOpen}>
            <SheetContent 
              side="right" 
              className="w-full max-w-md p-0 bg-white border-l shadow-none flex flex-col"
            >
              <div className="flex-1 overflow-y-auto">
                <div className="px-6 py-4">
                  <AddProfile onClose={handleAddProfileSuccess} />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.content}>
        <header className={styles.header}>
          <h1 className={styles.title}>Farmer Profile</h1>
          <div className={styles.actions}>
            <Sheet open={isAddOpen} onOpenChange={setIsAddOpen}>
              <SheetTrigger asChild>
                <Button variant="default" className={styles.addButton}>
                  <Plus className="w-4 h-4 mr-2" /> Add Profile
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="w-full max-w-md p-0 bg-white border-l shadow-none flex flex-col"
              >
                <div className="flex-1 overflow-y-auto">
                  <div className="px-6 py-4">
                    <AddProfile onClose={handleAddProfileSuccess} />
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <Sheet open={isEditOpen} onOpenChange={setIsEditOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className={styles.editButton}>
                  <Edit className="w-4 h-4 mr-2" /> Edit Profile
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="w-full max-w-md p-0 bg-white border-l shadow-none flex flex-col"
              >
                <div className="flex-1 overflow-y-auto">
                  <div className="px-6 py-4">
                    <ProfileEdit 
                      farmerData={farmerData} 
                      mode="edit" 
                      onClose={() => {
                        setIsEditOpen(false);
                        handleAddProfileSuccess(); // Refresh data after edit
                      }} 
                    />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </header>

        <Card className={styles.profileCard}>
          <CardContent className={styles.profileCardContent}>
            <Avatar className={styles.avatar}>
              <AvatarImage
                src={farmerData.image}
                alt="Farmer profile"
                className={styles.avatarImage}
              />
              <AvatarFallback className={styles.avatarFallback}>{farmerData.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div className={styles.profileInfo}>
              <h1 className={styles.name}>{farmerData.name}</h1>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div className={styles.location}>
                      <MapPin className="w-5 h-5" />
                      <span>{farmerData.location}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>Farm Location</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <div className={styles.specialties}>
                {farmerData.specialties.map((specialty: string) => (
                  <Badge
                    key={specialty}
                    variant="secondary"
                    className={styles.badge}
                  >
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={styles.farmCard}>
          <CardHeader>
            <CardTitle className={styles.cardTitle}>
              <Tractor className="w-5 h-5" /> Farm Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Separator className={styles.separator} />
            <div className={styles.grid}>
              <div>
                <h3 className={styles.subTitle}>Experience</h3>
                <p className={styles.text}>{farmerData.experience}</p>
              </div>
              <div>
                <h3 className={styles.subTitle}>Current Crops</h3>
                <div className={styles.crops}>
                  {farmerData.crops.map((crop: string) => (
                    <Badge key={crop} variant="outline" className={styles.cropBadge}>
                      <Wheat className="w-3 h-3" />
                      {crop}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={styles.contactCard}>
          <CardHeader>
            <CardTitle className={styles.cardTitle}>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Separator className={styles.separator} />
            <div className={styles.contactInfo}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div className={styles.contactItem}>
                      <Mail className="w-5 h-5" />
                      <span>{farmerData.contact.email}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>Email Address</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger>
                    <div className={styles.contactItem}>
                      <Phone className="w-5 h-5" />
                      <span>{farmerData.contact.phone}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>Phone Number</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;


