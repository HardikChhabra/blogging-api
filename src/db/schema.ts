import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

// Users Table and zod schema
export const users = pgTable("users", {
  email: text("email").primaryKey(),
  name: text("name").notNull(),
  password: text("pwd").notNull(),
});
export const createUserSchema = createInsertSchema(users);
export const loginSchema = createInsertSchema(users).pick({
  email: true,
  password: true,
});

// Blogs Table and zod schema
export const blogs = pgTable("blogs", {
  blogId: uuid("blog_id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.email, {
      onDelete: "cascade",
    }),
});
export const createBlogSchema = createInsertSchema(blogs).omit({
  blogId: true,
  userId: true,
  createdAt: true,
});
export const updateBlogSchema = createInsertSchema(blogs)
  .omit({
    blogId: true,
    userId: true,
    createdAt: true,
  })
  .partial();
export const readBlogByUserSchema = createSelectSchema(blogs).pick({
  userId: true,
});
export const readBlogByTitleSchema = createSelectSchema(blogs).pick({
  title: true,
});

// Comments Table and zod schema
export const comments = pgTable("comments", {
  commentId: uuid("comment_id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  content: text("content").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.email, {
      onDelete: "cascade",
    }),
  blogId: uuid("blog_id")
    .notNull()
    .references(() => blogs.blogId, {
      onDelete: "cascade",
    }),
});
export const createCommentSchema = createInsertSchema(comments).omit({
  commentId: true,
  userId: true,
  createdAt: true,
});
export const updateCommentSchema = createInsertSchema(comments).pick({
  content: true,
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  blogs: many(blogs),
  comments: many(comments),
}));

export const blogsRelations = relations(blogs, ({ one, many }) => ({
  user: one(users, { fields: [blogs.userId], references: [users.email] }),
  comments: many(comments),
}));

export const commentsRelations = relations(comments, ({ one }) => ({
  user: one(users, { fields: [comments.userId], references: [users.email] }),
  blog: one(blogs, { fields: [comments.blogId], references: [blogs.blogId] }),
}));
