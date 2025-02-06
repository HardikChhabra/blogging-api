import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Users Table
export const users = pgTable("users", {
  email: text("email").primaryKey(),
  name: text("name").notNull(),
});

// Blogs Table
export const blogs = pgTable("blogs", {
  blogId: uuid("blog_id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  userId: text("user_id").references(() => users.email, { onDelete: "cascade" }),
});

// Comments Table
export const comments = pgTable("comments", {
  commentId: uuid("comment_id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  content: text("content").notNull(),
  userId: text("user_id").references(() => users.email, { onDelete: "cascade" }),
  blogId: uuid("blog_id").references(() => blogs.blogId, { onDelete: "cascade" }),
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
