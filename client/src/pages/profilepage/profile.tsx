import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Edit, MapPin, Phone, Mail, Tractor, Wheat } from "lucide-react";
import { ProfileEdit } from "@/components/profile/ProfileEdit";
import styles from "./Profile.module.scss";

const Profile = () => {
  const farmerData = {
    name: "John Deere",
    location: "Midwest Valley, CA",
    experience: "15+ years",
    specialties: ["Organic Farming", "Crop Rotation", "Sustainable Agriculture"],
    crops: ["Wheat", "Corn", "Soybeans"],
    contact: {
      email: "john.deere@farmmail.com",
      phone: "(555) 123-4567",
    },
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.content}>
        <header className={styles.header}>
          <h1 className={styles.title}>Farmer Profile</h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="default" className={styles.editButton}>
                <Edit className="w-4 h-4" /> Edit Profile
              </Button>
            </SheetTrigger>
            <SheetContent className={styles.sheetContent}>
              <SheetHeader>
                <SheetTitle className={styles.sheetTitle}>Edit Profile</SheetTitle>
                <SheetDescription className={styles.sheetDescription}>
                  Update your farming profile details below.
                </SheetDescription>
              </SheetHeader>
              <ProfileEdit farmerData={farmerData} />
            </SheetContent>
          </Sheet>
        </header>

        <Card className={styles.profileCard}>
          <CardContent className={styles.profileCardContent}>
            <Avatar className={styles.avatar}>
              <AvatarImage
                src="https://images.unsplash.com/photo-1560982037-1b99d8372384?q=80&w=200&h=200"
                alt="Farmer profile"
              />
              <AvatarFallback>JD</AvatarFallback>
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
                {farmerData.specialties.map((specialty) => (
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
                  {farmerData.crops.map((crop) => (
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