-- CreateTable
create table "users" (
   "id"    text not null,
   "name"  text not null,
   "email" text not null,
   constraint "users_pkey" primary key ( "id" )
);

-- CreateIndex
create unique index "users_email_key" on
   "users" (
      "email"
   );