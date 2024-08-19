"use client";
import { useState, useTransition, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Textarea } from "@/src/components/ui/textarea";
import { FormError } from "@/src/components/form-error";
import { FormSuccess } from "@/src/components/form-success";
import { PostUpdateSchema } from "@/src/schemas";
import * as z from "zod";
import { Post } from "@prisma/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";

type PostUpdateFormProps = {
  postId: string;
};

const PostUpdateForm = ({ postId }: PostUpdateFormProps) => {
  const [isPending, startTransition] = useTransition();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof PostUpdateSchema>>({
    resolver: zodResolver(PostUpdateSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      placeholderImage: "",
      status: "DRAFT", // Default value
    },
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/cms/${postId}`);
        if (!response.ok) throw new Error("Failed to fetch post");
        const data: Post = await response.json();
        setPost(data);

        // Update form values when post data is fetched
        form.reset({
          title: data.title || "",
          description: data.description || "",
          content: data.content || "",
          placeholderImage: data.placeholderImage || "",
          status: data.status || "DRAFT",
        });
      } catch (err) {
        const error = err as Error;
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId, form]);

  const onSubmit = (values: z.infer<typeof PostUpdateSchema>) => {
    setError("");
    setSuccess("");
    setLoading(true);
    startTransition(() => {
      fetch(`/api/cms/${post?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then(async (response) => {
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to update post");
          }
          setSuccess("Post updated successfully!");
        })
        .catch((error) => {
          setError(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField control={form.control} name="title" render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input disabled={isPending || loading} {...field} placeholder="Enter the post title" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="description" render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea disabled={isPending || loading} {...field} placeholder="Brief description of the post" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="content" render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea disabled={isPending || loading} {...field} placeholder="Write the post content here" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="placeholderImage" render={({ field }) => (
            <FormItem>
              <FormLabel>Placeholder Image URL</FormLabel>
              <FormControl>
                <Input disabled={isPending || loading} {...field} placeholder="https://example.com/image.jpg" />
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
        <Button disabled={isPending || loading} type="submit" className="w-full">
          {isPending || loading ? "Updating..." : "Update Post"}
        </Button>
      </form>
    </Form>
  );
};

export default PostUpdateForm;
