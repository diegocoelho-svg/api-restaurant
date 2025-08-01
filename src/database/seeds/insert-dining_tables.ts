import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("dining_tables").del();

    await knex("dining_tables").insert([
        { table_number: 1 },
        { table_number: 2 },
        { table_number: 3 },
        { table_number: 4 },
        { table_number: 5 },
    ]);
};
