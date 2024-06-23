"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserValidation } from "@/lib/validations/user";
import * as z from "zod";
import Image from "next/image";
import { ChangeEvent, useState } from "react";

interface Props {
    user: {
        id: string;
        objectId: string;
        username: string;
        name: string;
        bio: string;
        image: string;
    };
    btnTitle: string;
}

const AccountProfile = ({ user, btnTitle }: Props) => {
    // state for the image upload, set it to file, initiallhy an empty array
    const [files, setFiles] = useState<File[]>([]);
    
    const form = useForm({
        resolver: zodResolver(UserValidation),
        defaultValues: {
            profile_photo: user?.image || '',
            name: user?.name || '',
            username: user?.username || '',
            bio: user?.bio || '',
        }
    })

    // function for the image upload
    const handleImage = (e: ChangeEvent<HTMLInputElement>, fieldChange: (value: string) => void) => {
        // prevent browser reload
        e.preventDefault();

        // initialize a new instance of the file reader
        const fileReader = new FileReader();

        // check if there is anything
        if(e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];

            setFiles(Array.from(e.target.files));

            // If the file type is not an image, do nothing
            if(!file.type.includes('image')) return;


            fileReader.onload = async (event) => {
                // set imageDataUrl to the result of the uploaded image as a string
                const imageDataUrl = event.target?.result?.toString() || '';

                fieldChange(imageDataUrl);
            }

            fileReader.readAsDataURL(file);
        }
    }

    // onSubmit function from shadcn
    function onSubmit(values: z.infer<typeof UserValidation>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
      }

    return (
        <Form {...form}>
          <form 
          onSubmit={form.handleSubmit(onSubmit)} 
          className="flex flex-col justify-start gap-10">
            <FormField
              control={form.control}
              name="profile_photo"
              render={({ field }) => (
                <FormItem className="flex items-center gap-4">
                  <FormLabel className="account-form_image-label">
                    {/* If there is a profile image, display it. Otherwise, display a default */}
                    {field.value ? (
                        <Image src={field.value} alt="profile photo" width={96} height={96} priority className="rounded-full object-contain" />
                    ) : (
                        <Image src="/assets/profile.svg" alt="profile photo" width={24} height={24} className="object-contain" />
                    )}
                  </FormLabel>
                  <FormControl className="flex-1 text-base-semibold text-gray-200">
                    <Input type="file" accept="image/*" placeholder="Upload a photo" className="account-form_image-input" onChange={(e) => handleImage(e, field.onChange)} />
                  </FormControl>
                </FormItem>
              )}
            />
            {/* Field for Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-3 w-full">
                  <FormLabel className="text-base-semibold text-light-2">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input type='text' className="account-form_input no-focus" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            {/* Username */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-3 w-full">
                  <FormLabel className="text-base-semibold text-light-2">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input type='text' className="account-form_input no-focus" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            {/* User bio */}
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-3 w-full">
                  <FormLabel className="text-base-semibold text-light-2">
                    Bio
                  </FormLabel>
                  <FormControl>
                    <Textarea rows={10} className="account-form_input no-focus" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="bg-primary-500">Submit</Button>
          </form>
        </Form>
      )
}

export default AccountProfile