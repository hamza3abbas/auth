import * as z from "zod";


export const LoginSchema = z.object({
    email: z.string().email({
        message : "Email is required"
    }),
    password:z.string().min(1  ,{
        message:"Password is required"
    }),
    code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
    email: z.string().email({
        message : "Email is required"
    }),
    password:z.string().min(6,{
        message: "Menimum 6 charchters required"
    }),
    name: z.string().min(1,{
        message: "Name is required"
    })
});

export const ResetSchema = z.object({
    email: z.string().email({
        message : "Email is required"
    })
});

export const NewPasswordSchema = z.object({
    password: z.string().min(6,{
        "message" : "Minimum of 6 charachters required"
    })
});

export const settingSchema = z.object({
    name: z.optional(z.string()),
    
})

export const CustomerCreateSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format").optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
  });
  
  export const CustomerUpdateSchema = z.object({
    name: z.string().min(1, "Name is required").optional(),
    email: z.string().email("Invalid email format").optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
  });

  export const PostCreateSchema = z.object({
    title: z.string().min(1, "Title is required."),
    description: z.string().optional(),
    content: z.string().min(1, "Content is required."),
    placeholderImage: z.string().url("Must be a valid URL.").optional(),
    status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).default('DRAFT'),
    published: z.boolean().optional().default(false),
    authorId: z.string().min(1, "Author ID is required."),
  });
  
  

  export const PostUpdateSchema = z.object({
    title: z.string().min(1, "Title is required.").optional(),
    description: z.string().optional(),
    content: z.string().min(1, "Content is required.").optional(),
    placeholderImage: z.string().url("Must be a valid URL.").optional(),
    status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),
    published: z.boolean().optional(),
  });
  
  export const LeadCreateSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format").optional(),
    phone: z.string().optional(),
    status: z.string().cuid("Invalid status ID"), // The status should match a valid cuid
  });
  
  
  export const LeadUpdateSchema = LeadCreateSchema.partial();
  export const LeadStatusSchema = z.object({
    id: z.string().cuid(), // Assuming you're using cuid for IDs
    name: z.string().min(1, "Status name is required").max(50, "Status name too long"),
  });
  
  export type LeadStatus = z.infer<typeof LeadStatusSchema>;