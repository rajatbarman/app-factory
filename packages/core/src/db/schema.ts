import {
  pgTable,
  integer,
  text,
  timestamp,
  varchar,
  uniqueIndex,
  serial,
} from 'drizzle-orm/pg-core';
import { TOKEN_TYPES } from '../constants';

export const users = pgTable(
  'users',
  {
    id: serial('id').primaryKey().notNull(),
    fullName: text('full_name'),
    email: varchar('email', { length: 256 }).notNull(),
    createdAt: timestamp('created_at').defaultNow(),
  },
  (users) => ({
    emailIndex: uniqueIndex('email_index').on(users.email),
  }),
);

export const usersOTP = pgTable('otp_users', {
  id: serial('id').primaryKey().notNull(),
  email: varchar('email', { length: 256 }).notNull(),
  otp: varchar('otp', { length: 256 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('update_at').defaultNow(),
});

export const tokens = pgTable('tokens', {
  id: serial('id').notNull().primaryKey(),
  token: varchar('token', { length: 256 }).notNull(),
  type: varchar('type', { enum: [String(TOKEN_TYPES.REFRESH_TOKEN)] }),
  expireAt: timestamp('expiry_at').notNull(),
  userId: integer('user_id')
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});
