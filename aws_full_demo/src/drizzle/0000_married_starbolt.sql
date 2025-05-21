CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(100) NOT NULL,
	"email" varchar(100) NOT NULL,
	"avatar_url" varchar(255),
	"avatar_key" varchar(255),
	"avatar_last_updated" timestamp DEFAULT now()
);
