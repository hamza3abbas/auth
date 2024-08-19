import { NextResponse } from 'next/server';
import db from '@/src/lib/db';
import { getCurrentUser } from '@/src/lib/auth';
import { PostCreateSchema } from '@/src/schemas';

export async function GET() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if(currentUser.role === 'ADMIN'){
      const posts = await db.post.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
          author: {
            select: {
              name: true,
            },
          },
        },
      });
      return NextResponse.json(posts);
    }
    const posts = await db.post.findMany({
      orderBy: { createdAt: 'desc' },
      where : {authorId : currentUser.id},
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });

  
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Error fetching posts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    const parsedData = PostCreateSchema.safeParse(body);
    if (!parsedData.success) {
      return NextResponse.json({ error: parsedData.error.errors }, { status: 400 });
    }

    // Ensure that authorId is always defined
    if (!currentUser.id) {
      return NextResponse.json({ error: 'Author ID is missing' }, { status: 400 });
    }

    const { title, description, content, placeholderImage, status, published } = parsedData.data;

    const post = await db.post.create({
      data: {
        title,
        description,
        content,
        placeholderImage,
        status,
        published,
        authorId: currentUser.id, // authorId is guaranteed to be defined here
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Error creating post' }, { status: 500 });
  }
}
