CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(20) NOT NULL,
	"password" varchar(255) NOT NULL,
	"created_at" timestamp (0) DEFAULT now(),
	"email" varchar(255) NOT NULL,
	"age" integer,
	"phone_number" varchar(20) NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
