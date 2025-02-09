CREATE TABLE IF NOT EXISTS "blogs" (
	"blog_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"title" text NOT NULL,
	"content" text NOT NULL,
	"user_id" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "comments" (
	"comment_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"content" text NOT NULL,
	"user_id" text,
	"blog_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"email" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"pwd" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "blogs" ADD CONSTRAINT IF NOT EXISTS "blogs_user_id_users_email_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("email") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT IF NOT EXISTS "comments_user_id_users_email_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("email") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT IF NOT EXISTS "comments_blog_id_blogs_blog_id_fk" FOREIGN KEY ("blog_id") REFERENCES "public"."blogs"("blog_id") ON DELETE cascade ON UPDATE no action;