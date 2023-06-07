CREATE TABLE IF NOT EXISTS "tokens" (
	"id" serial PRIMARY KEY NOT NULL,
	"token" varchar(256) NOT NULL,
	"type" varchar,
	"expiry_at" timestamp NOT NULL,
	"user_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" text,
	"email" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "otp_users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(256) NOT NULL,
	"otp" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"update_at" timestamp DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS "email_index" ON "users" ("email");
DO $$ BEGIN
 ALTER TABLE "tokens" ADD CONSTRAINT "tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
