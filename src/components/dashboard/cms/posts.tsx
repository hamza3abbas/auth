"use client";
import { useEffect, useState, useTransition } from "react";
import { Button } from "../../ui/button";
import DynamicBreadcrumbs from "../dynamic-bread-crumbs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/src/components/ui/dropdown-menu";
import { File, ListFilter, MoreHorizontal, PlusCircle } from "lucide-react";
import Image from "next/image";
import { Customer, Post, User } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { truncateString } from "@/src/lib/utils";
type PostWithUser = Post & {
  author: User;
};
const Posts = () => {
  const [posts, setPosts] = useState<PostWithUser[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = (id: string) => {
    startTransition(async () => {
      setError(null);

      try {
        const response = await fetch(`/api/cms/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) throw new Error('Failed to delete post');

        // Remove the deleted customer from the list immediately
        setPosts((prevPosts) =>
        prevPosts ? prevPosts.filter((post) => post.id !== id) : null
        );

        // Optionally, refresh the page after a delay to reflect the changes
        setTimeout(() => {
          router.refresh();
        }, 500);
      } catch (error) {
        setError((error as Error).message);
      }
    });
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/cms');
        const data = await response.json();
        if (response.ok) {
          setPosts(data);
        } else {
          setError(data.error || 'Failed to fetch posts');
        }
      } catch (err) {
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) {
    return (
      <>
        <div className="flex items-center">
          <DynamicBreadcrumbs />
        </div>
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
            {error}
            </h3>
            
            <p className="text-sm text-muted-foreground"></p>
          </div>
        </div>
      </>
    );
  }

  if (posts?.length === 0) {
    return (
      <>
        <div className="flex items-center">
          <DynamicBreadcrumbs />
        </div>
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              You have no posts available
            </h3>
            <p className="text-sm text-muted-foreground">
              You can start adding posts.
            </p>
            <Link href={'/dashboard/cms/add-post'}>
            <Button className="mt-4">Add Post</Button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex items-center px-6">
        <DynamicBreadcrumbs />
        <div className="ml-auto flex items-center gap-2 ">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-7 gap-1">
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Filter
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Active</DropdownMenuItem>
              <DropdownMenuItem>Inactive</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" variant="outline" className="h-7 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
          <Link href={'/dashboard/cms/add-post'}>
            <Button size="sm" className="h-7 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Posts
              </span>
            </Button>
          </Link>
        </div>
      </div>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Posts</CardTitle>
            <CardDescription>
              Manage your posts.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Published</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>
                   Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts?.map((post) => (
                  <TableRow key={post?.id}>
                    {/* <TableCell className="hidden sm:table-cell">
                      <Image
                        alt={`${post?.placeholderImage}'s image`}
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={"/profile.jpg"}
                        width="64"
                      />
                    </TableCell> */}
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell>{post.description || 'No description'}</TableCell>
                    <TableCell>
                      <Badge variant={ post.status === 'DRAFT'? 'destructive' : post.status === 'ARCHIVED' ? "default" : "success"}>
                     {post.status}
                     </Badge>
                    </TableCell>
                    <TableCell>{post.published ? 'Yes' : 'No'}</TableCell>
                    <TableCell>{truncateString(post.author.name || 'Unknown',20)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <Link href={`/dashboard/cms/${post?.id}`}>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                          </Link>
                          <DropdownMenuItem className="bg-destructive text-white" onClick={() => {
                            handleDelete(post?.id);
                          }}>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground">
              Showing <strong>1-{posts?.length}</strong> of{" "}
              <strong>{posts?.length}</strong> customers
            </div>
          </CardFooter>
        </Card>
      </main>
    </>
  );
};

export default Posts;
