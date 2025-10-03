import { Migration } from '@mikro-orm/migrations';

export class Migration20251003114734 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "product" ("id" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz null, "name" varchar(255) not null, "description" text null, "price_cents" int not null, "stock" int not null default 0, "image_url" varchar(255) null, "is_active" boolean not null default true, constraint "product_pkey" primary key ("id"));`);

    this.addSql(`create table "user" ("id" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz null, "email" varchar(255) not null, "password_hash" varchar(255) not null, "role" varchar(255) not null default 'CUSTOMER', constraint "user_pkey" primary key ("id"));`);
    this.addSql(`alter table "user" add constraint "user_email_unique" unique ("email");`);

    this.addSql(`create table "order" ("id" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz null, "user_id" varchar(255) not null, "status" varchar(255) not null default 'PENDING', "total_cents" int not null default 0, constraint "order_pkey" primary key ("id"));`);

    this.addSql(`create table "order_item" ("id" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz null, "order_id" varchar(255) not null, "product_id" varchar(255) not null, "quantity" int not null, "unit_price_cents" int not null, constraint "order_item_pkey" primary key ("id"));`);

    this.addSql(`alter table "order" add constraint "order_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;`);

    this.addSql(`alter table "order_item" add constraint "order_item_order_id_foreign" foreign key ("order_id") references "order" ("id") on update cascade;`);
    this.addSql(`alter table "order_item" add constraint "order_item_product_id_foreign" foreign key ("product_id") references "product" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "order_item" drop constraint "order_item_product_id_foreign";`);

    this.addSql(`alter table "order" drop constraint "order_user_id_foreign";`);

    this.addSql(`alter table "order_item" drop constraint "order_item_order_id_foreign";`);

    this.addSql(`drop table if exists "product" cascade;`);

    this.addSql(`drop table if exists "user" cascade;`);

    this.addSql(`drop table if exists "order" cascade;`);

    this.addSql(`drop table if exists "order_item" cascade;`);
  }

}
