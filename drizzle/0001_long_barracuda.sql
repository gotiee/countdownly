CREATE TABLE "countdown" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"slug" text,
	"target_date" timestamp with time zone NOT NULL,
	"timezone" text NOT NULL,
	"description" text,
	"color" text,
	"is_public" boolean DEFAULT false NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "countdown_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "countdown" ADD CONSTRAINT "countdown_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "countdown_target_date_idx" ON "countdown" USING btree ("target_date");--> statement-breakpoint
CREATE INDEX "countdown_is_public_idx" ON "countdown" USING btree ("is_public");