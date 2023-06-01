export async function createTables() {
    const { knex } = await import("../index.js");
    console.log("Creating tables...");
  try {
    // Create the "tenants" table
    await knex.schema.createTable("tenants", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("email").notNullable().unique();
      table.string("password").notNullable();
      table.timestamps(true, true);
    });

    await knex.schema.createTable("clients", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("email").notNullable().unique();
      table.string("password").notNullable();
      table.timestamps(true, true);
    });
    // Create the "auth" table
    await knex.schema.createTable("auth", (table) => {
      table.increments("id").primary();
      table
        .integer("tenantId")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("tenants")
        .onDelete("CASCADE");
      table.string("token").notNullable();
      table.timestamps(true, true);
    });

    console.log("Auth Table created successfully");
  } catch (error) {
    console.error("Error creating table Auth:", error);
  } finally {
    await knex.destroy();
  }
}
