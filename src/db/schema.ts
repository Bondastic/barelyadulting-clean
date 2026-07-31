import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const sponsorInquiries = pgTable("sponsor_inquiries", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  email: varchar("email", { length: 254 }).notNull(),
  company: varchar("company", { length: 200 }),
  type: varchar("type", { length: 40 }).notNull().default("other"),
  message: text("message").notNull(),
  ipHash: varchar("ip_hash", { length: 64 }),
  consentAcceptedAt: timestamp("consent_accepted_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
