import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("products").del();

    await knex("products").insert([
      { name: "Four Cheese Gnocchi", price: 45 },
      { name: "Chicken Strips", price: 60 },
      { name: "Tilapia with Capers", price: 100 },
      { name: "Cassava Fritter", price: 75 },
      { name: "Sun-Dried Beef Casserole", price: 65 },
      { name: "French Fries Portion", price: 40 },
      { name: "Executive Grilled Chicken", price: 36 },
      { name: "Executive Grilled Tilapia", price: 39 },
      { name: "Hearts of Palm Soup", price: 30 },
      { name: "Soft Drink 350ml", price: 7.5 },
      { name: "Orange Juice 440ml", price: 10 }
    ])
}
