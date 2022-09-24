import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("practitioner", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("email").notNullable();
    table.string("phone").notNullable();
    table.string("address").notNullable();
    table.string("photograph").notNullable();
    table.string("cloud_public_id").notNullable();
    table.string("working_days").notNullable();
    table.time("start_time").notNullable();
    table.time("end_time").notNullable();
    table.date("dob").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("practitioner");
}
