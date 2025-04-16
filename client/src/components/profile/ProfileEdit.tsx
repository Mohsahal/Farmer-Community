// // import { zodResolver } from "@hookform/resolvers/zod"
// // import { useForm } from "react-hook-form"
// // import * as z from "zod"
// // import { Button } from "@/components/ui/button"
// // import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// // import { Input } from "@/components/ui/input"
// // import { Textarea } from "@/components/ui/textarea"
// // import { SheetClose } from "@/components/ui/sheet"

// // const formSchema = z.object({
// //   name: z.string().min(2, "Name must be at least 2 characters"),
// //   location: z.string().min(2, "Location is required"),
// //   experience: z.string(),
// //   email: z.string().email("Invalid email address"),
// //   phone: z.string().min(10, "Phone number must be at least 10 digits"),
// // })

// // interface ProfileEditProps {
// //   farmerData: {
// //     name: string
// //     location: string
// //     experience: string
// //     contact: {
// //       email: string
// //       phone: string
// //     }
// //   }
// // }

// // export function ProfileEdit({ farmerData }: ProfileEditProps) {
// //   const form = useForm<z.infer<typeof formSchema>>({
// //     resolver: zodResolver(formSchema),
// //     defaultValues: {
// //       name: farmerData.name,
// //       location: farmerData.location,
// //       experience: farmerData.experience,
// //       email: farmerData.contact.email,
// //       phone: farmerData.contact.phone,
// //     },
// //   })

// //   function onSubmit(values: z.infer<typeof formSchema>) {
// //     console.log(values)
// //     // Handle form submission here
// //   }

// //   return (
// //     <Form {...form}>
// //       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
// //         <FormField
// //           control={form.control}
// //           name="name"
// //           render={({ field }) => (
// //             <FormItem>
// //               <FormLabel>Name</FormLabel>
// //               <FormControl>
// //                 <Input placeholder="Your name" {...field} />
// //               </FormControl>
// //               <FormMessage />
// //             </FormItem>
// //           )}
// //         />

// //         <FormField
// //           control={form.control}
// //           name="location"
// //           render={({ field }) => (
// //             <FormItem>
// //               <FormLabel>Location</FormLabel>
// //               <FormControl>
// //                 <Input placeholder="Your location" {...field} />
// //               </FormControl>
// //               <FormMessage />
// //             </FormItem>
// //           )}
// //         />

// //         <FormField
// //           control={form.control}
// //           name="experience"
// //           render={({ field }) => (
// //             <FormItem>
// //               <FormLabel>Experience</FormLabel>
// //               <FormControl>
// //                 <Input placeholder="Years of experience" {...field} />
// //               </FormControl>
// //               <FormMessage />
// //             </FormItem>
// //           )}
// //         />

// //         <FormField
// //           control={form.control}
// //           name="email"
// //           render={({ field }) => (
// //             <FormItem>
// //               <FormLabel>Email</FormLabel>
// //               <FormControl>
// //                 <Input type="email" placeholder="Your email" {...field} />
// //               </FormControl>
// //               <FormMessage />
// //             </FormItem>
// //           )}
// //         />

// //         <FormField
// //           control={form.control}
// //           name="phone"
// //           render={({ field }) => (
// //             <FormItem>
// //               <FormLabel>Phone</FormLabel>
// //               <FormControl>
// //                 <Input placeholder="Your phone number" {...field} />
// //               </FormControl>
// //               <FormMessage />
// //             </FormItem>
// //           )}
// //         />

// //         <div className="flex justify-end gap-4">
// //           <SheetClose asChild>
// //             <Button type="button" variant="outline" className="w-32">
// //               Cancel
// //             </Button>
// //           </SheetClose>
// //           <Button type="submit" className="w-32">
// //             Save Changes
// //           </Button>
// //         </div>
// //       </form>
// //     </Form>
// //   )
// // } 




// // import { zodResolver } from "@hookform/resolvers/zod";
// // import { useForm } from "react-hook-form";
// // import * as z from "zod";
// // import { Button } from "@/components/ui/button";
// // import {
// //   Form,
// //   FormControl,
// //   FormField,
// //   FormItem,
// //   FormLabel,
// //   FormMessage,
// // } from "@/components/ui/form";
// // import { Input } from "@/components/ui/input";
// // import { SheetClose } from "@/components/ui/sheet";
// // import { useToast } from "@/components/ui/use-toast";
// // import { Loader2 } from "lucide-react";
// // import { useState } from "react";

// // const formSchema = z.object({
// //   name: z.string().min(2, "Name must be at least 2 characters"),
// //   location: z.string().min(2, "Location is required"),
// //   experience: z.string().min(1, "Experience is required"),
// //   email: z.string().email("Invalid email address"),
// //   phone: z.string().min(10, "Phone number must be at least 10 digits"),
// // });

// // interface ProfileEditProps {
// //   farmerData: {
// //     name: string;
// //     location: string;
// //     experience: string;
// //     contact: {
// //       email: string;
// //       phone: string;
// //     };
// //   };
// // }

// // export function ProfileEdit({ farmerData }: ProfileEditProps) {
// //   const { toast } = useToast();
// //   const [isSubmitting, setIsSubmitting] = useState(false);

// //   const form = useForm<z.infer<typeof formSchema>>({
// //     resolver: zodResolver(formSchema),
// //     defaultValues: {
// //       name: farmerData.name,
// //       location: farmerData.location,
// //       experience: farmerData.experience,
// //       email: farmerData.contact.email,
// //       phone: farmerData.contact.phone,
// //     },
// //   });

// //   async function onSubmit(values: z.infer<typeof formSchema>) {
// //     setIsSubmitting(true);
// //     try {
// //       // Simulate API call
// //       await new Promise((resolve) => setTimeout(resolve, 1000));
// //       console.log(values);
// //       toast({
// //         title: "Profile Updated",
// //         description: "Your profile has been successfully updated.",
// //         variant: "default",
// //       });
// //     } catch (error) {
// //       toast({
// //         title: "Error",
// //         description: "Failed to update profile. Please try again.",
// //         variant: "destructive",
// //       });
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   }

// //   return (
// //     <Form {...form}>
// //       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
// //         {/* Personal Information */}
// //         <div className="space-y-4">
// //           <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
// //           <FormField
// //             control={form.control}
// //             name="name"
// //             render={({ field }) => (
// //               <FormItem>
// //                 <FormLabel>Name</FormLabel>
// //                 <FormControl>
// //                   <Input
// //                     placeholder="Enter your name"
// //                     className="transition-all focus:ring-2 focus:ring-green-500"
// //                     {...field}
// //                   />
// //                 </FormControl>
// //                 <FormMessage />
// //               </FormItem>
// //             )}
// //           />
// //           <FormField
// //             control={form.control}
// //             name="location"
// //             render={({ field }) => (
// //               <FormItem>
// //                 <FormLabel>Location</FormLabel>
// //                 <FormControl>
// //                   <Input
// //                     placeholder="Enter your location"
// //                     className="transition-all focus:ring-2 focus:ring-green-500"
// //                     {...field}
// //                   />
// //                 </FormControl>
// //                 <FormMessage />
// //               </FormItem>
// //             )}
// //           />
// //           <FormField
// //             control={form.control}
// //             name="experience"
// //             render={({ field }) => (
// //               <FormItem>
// //                 <FormLabel>Experience</FormLabel>
// //                 <FormControl>
// //                   <Input
// //                     placeholder="Years of experience"
// //                     className="transition-all focus:ring-2 focus:ring-green-500"
// //                     {...field}
// //                   />
// //                 </FormControl>
// //                 <FormMessage />
// //               </FormItem>
// //             )}
// //           />
// //         </div>

// //         {/* Contact Information */}
// //         <div className="space-y-4">
// //           <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
// //           <FormField
// //             control={form.control}
// //             name="email"
// //             render={({ field }) => (
// //               <FormItem>
// //                 <FormLabel>Email</FormLabel>
// //                 <FormControl>
// //                   <Input
// //                     type="email"
// //                     placeholder="Enter your email"
// //                     className="transition-all focus:ring-2 focus:ring-green-500"
// //                     {...field}
// //                   />
// //                 </FormControl>
// //                 <FormMessage />
// //               </FormItem>
// //             )}
// //           />
// //           <FormField
// //             control={form.control}
// //             name="phone"
// //             render={({ field }) => (
// //               <FormItem>
// //                 <FormLabel>Phone</FormLabel>
// //                 <FormControl>
// //                   <Input
// //                     placeholder="Enter your phone number"
// //                     className="transition-all focus:ring-2 focus:ring-green-500"
// //                     {...field}
// //                   />
// //                 </FormControl>
// //                 <FormMessage />
// //               </FormItem>
// //             )}
// //           />
// //         </div>

// //         {/* Form Actions */}
// //         <div className="flex justify-end gap-4 pt-4 border-t">
// //           <SheetClose asChild>
// //             <Button
// //               type="button"
// //               variant="outline"
// //               className="w-32 transition-all hover:bg-gray-100"
// //               disabled={isSubmitting}
// //             >
// //               Cancel
// //             </Button>
// //           </SheetClose>
// //           <Button
// //             type="submit"
// //             className="w-32 bg-green-600 hover:bg-green-700 transition-all"
// //             disabled={isSubmitting}
// //           >
// //             {isSubmitting ? (
// //               <>
// //                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
// //                 Saving...
// //               </>
// //             ) : (
// //               "Save Changes"
// //             )}
// //           </Button>
// //         </div>
// //       </form>
// //     </Form>
// //   );
// // }




// // src/components/profile/ProfileEdit.tsx
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { SheetClose } from "@/components/ui/sheet";
// import { useToast } from "@/components/ui/use-toast";
// import { Loader2 } from "lucide-react";
// import { useState } from "react";
// import styles from "./ProfileEdit.module.scss";

// const formSchema = z.object({
//   name: z.string().min(2, "Name must be at least 2 characters"),
//   location: z.string().min(2, "Location is required"),
//   experience: z.string().min(1, "Experience is required"),
//   email: z.string().email("Invalid email address"),
//   phone: z.string().min(10, "Phone number must be at least 10 digits"),
// });

// interface ProfileEditProps {
//   farmerData: {
//     name: string;
//     location: string;
//     experience: string;
//     contact: {
//       email: string;
//       phone: string;
//     };
//   };
// }

// export function ProfileEdit({ farmerData }: ProfileEditProps) {
//   const { toast } = useToast();
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: farmerData.name,
//       location: farmerData.location,
//       experience: farmerData.experience,
//       email: farmerData.contact.email,
//       phone: farmerData.contact.phone,
//     },
//   });

//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     setIsSubmitting(true);
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 1000));
//       console.log(values);
//       toast({
//         title: "Profile Updated",
//         description: "Your profile has been successfully updated.",
//         variant: "default",
//       });
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to update profile. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   }

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className={styles.formContainer}>
//         <div className={styles.section}>
//           <h3 className={styles.sectionTitle}>Personal Information</h3>
//           <FormField
//             control={form.control}
//             name="name"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Name</FormLabel>
//                 <FormControl>
//                   <Input
//                     placeholder="Enter your name"
//                     className={styles.input}
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="location"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Location</FormLabel>
//                 <FormControl>
//                   <Input
//                     placeholder="Enter your location"
//                     className={styles.input}
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="experience"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Experience</FormLabel>
//                 <FormControl>
//                   <Input
//                     placeholder="Years of experience"
//                     className={styles.input}
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>

//         <div className={styles.section}>
//           <h3 className={styles.sectionTitle}>Contact Information</h3>
//           <FormField
//             control={form.control}
//             name="email"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Email</FormLabel>
//                 <FormControl>
//                   <Input
//                     type="email"
//                     placeholder="Enter your email"
//                     className={styles.input}
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="phone"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Phone</FormLabel>
//                 <FormControl>
//                   <Input
//                     placeholder="Enter your phone number"
//                     className={styles.input}
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>

//         <div className={styles.actions}>
//           <SheetClose asChild>
//             <Button
//               type="button"
//               variant="outline"
//               className={styles.cancelButton}
//               disabled={isSubmitting}
//             >
//               Cancel
//             </Button>
//           </SheetClose>
//           <Button
//             type="submit"
//             className={styles.saveButton}
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Saving...
//               </>
//             ) : (
//               "Save Changes"
//             )}
//           </Button>
//         </div>
//       </form>
//     </Form>
//   );
// }



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
import { SheetClose } from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import styles from "./ProfileEdit.module.scss";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  location: z.string().min(2, "Location is required"),
  experience: z.string().min(1, "Experience is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
});

interface ProfileEditProps {
  farmerData: {
    name: string;
    location: string;
    experience: string;
    contact: {
      email: string;
      phone: string;
    };
  };
}

export function ProfileEdit({ farmerData }: ProfileEditProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: farmerData.name,
      location: farmerData.location,
      experience: farmerData.experience,
      email: farmerData.contact.email,
      phone: farmerData.contact.phone,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(values);
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
        variant: "default",
        className: styles.toastSuccess,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
        className: styles.toastError,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={styles.formContainer}>
        <div className={styles.editHeader}>
          <h2 className={styles.headerTitle}>Edit Profile</h2>
          <p className={styles.headerSubtitle}>Update your farming profile details below.</p>
        </div>
        <div className={styles.formGrid}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Personal Information</h3>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" className={styles.input} {...field} />
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
                    <Input placeholder="Enter your location" className={styles.input} {...field} />
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
                    <Input placeholder="Years of experience" className={styles.input} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Contact Information</h3>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter your email" className={styles.input} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your phone number" className={styles.input} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className={styles.actions}>
          <SheetClose asChild>
            <Button
              type="button"
              variant="outline"
              className={styles.cancelButton}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </SheetClose>
          <Button
            type="submit"
            className={styles.saveButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}