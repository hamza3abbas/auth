"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostCreateSchema } from "@/src/schemas"; // Ensure this is correctly defined
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/src/components/ui/form";
import { Textarea } from "@/src/components/ui/textarea"; 
import { FormError } from "@/src/components/form-error";
import { FormSuccess } from "@/src/components/form-success";
import { useState, useTransition } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"; 
export const PostForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof PostCreateSchema>>({
    resolver: zodResolver(PostCreateSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      placeholderImage: "",
      status: "DRAFT", // Default value for status
    },
  });

  const onSubmit = async (values: z.infer<typeof PostCreateSchema>) => {
    setError("");
    setSuccess("");
    console.log("sss");
    try {
      const response = await fetch('/api/cms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        setError(data.error || 'An unexpected error occurred.');
        setSuccess(undefined);
      } else {
        setSuccess("Post created successfully!");
        form.reset(); // Reset the form fields
      }
    } catch (error) {
      console.error('Failed to submit the form', error);
      setError("An unexpected error occurred.");
      setSuccess(undefined);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField control={form.control} name="title" render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  {...field}
                  placeholder="Enter the post title"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="description" render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  disabled={isPending}
                  {...field}
                  placeholder="Brief description of the post"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="content" render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea
                  disabled={isPending}
                  {...field}
                  placeholder="Write the post content here"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="placeholderImage" render={({ field }) => (
            <FormItem>
              <FormLabel>Placeholder Image URL</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  {...field}
                  placeholder="https://example.com/image.jpg"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="status" render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Select
                  disabled={isPending}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DRAFT">Draft</SelectItem>
                    <SelectItem value="PUBLISHED">Published</SelectItem>
                    <SelectItem value="ARCHIVED">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button disabled={isPending} type="submit" className="w-full">
          {isPending ? "Submitting..." : "Create Post"}
        </Button>
      </form>
    </Form>
  );
};
