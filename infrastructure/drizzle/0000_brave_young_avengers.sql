CREATE TYPE "public"."contract_status" AS ENUM('draft', 'active', 'expired', 'terminated');--> statement-breakpoint
CREATE TABLE "contract_template" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"created_at" timestamp (3) with time zone DEFAULT CURRENT_TIMESTAMP(3) NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP(3) NOT NULL,
	"name" varchar(255) NOT NULL,
	"content" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "contract" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"created_at" timestamp (3) with time zone DEFAULT CURRENT_TIMESTAMP(3) NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP(3) NOT NULL,
	"title" varchar(255) NOT NULL,
	"template_id" varchar(128) NOT NULL,
	"status" "contract_status" DEFAULT 'draft',
	"start_date" timestamp,
	"end_date" timestamp,
	"is_signed" boolean DEFAULT false
);
--> statement-breakpoint
ALTER TABLE "contract" ADD CONSTRAINT "contract_template_id_contract_template_id_fk" FOREIGN KEY ("template_id") REFERENCES "public"."contract_template"("id") ON DELETE no action ON UPDATE no action;