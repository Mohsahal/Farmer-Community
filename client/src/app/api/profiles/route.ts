import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const image = formData.get("image") as File;
    
    // Handle image upload
    if (image) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // Create unique filename
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
      const filename = `profile-${uniqueSuffix}.${image.name.split('.').pop()}`;
      
      // Save image to public directory
      const imagePath = join(process.cwd(), 'public/uploads', filename);
      await writeFile(imagePath, buffer);
      
      // Update image path in form data
      formData.set('image', `/uploads/${filename}`);
    }

    // Get other form data
    const profileData = {
      name: formData.get("name"),
      location: formData.get("location"),
      experience: formData.get("experience"),
      specialties: JSON.parse(formData.get("specialties") as string),
      crops: JSON.parse(formData.get("crops") as string),
      contact: JSON.parse(formData.get("contact") as string),
      image: formData.get("image"),
      createdAt: new Date().toISOString(),
    };

    // TODO: Save profile data to your database
    // For now, we'll just return the data
    // In a real application, you would save this to your database

    return NextResponse.json(
      { message: "Profile created successfully", data: profileData },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in profile creation:", error);
    return NextResponse.json(
      { message: "Error creating profile" },
      { status: 500 }
    );
  }
} 