import { Client } from "pg";

const client = new Client({

  connectionString:
    "postgresql://payment-db_owner:Zdvh5EMfRSu2@ep-crimson-night-a5l9y5i9.us-east-2.aws.neon.tech/payment-db?sslmode=require",
});

// async function createUsersTable() {
//   try {
//     await client.connect();
//     const result = await client.query(`
//       CREATE TABLE users (
//         id SERIAL PRIMARY KEY,
//         username VARCHAR(50) UNIQUE NOT NULL,
//         email VARCHAR(255) UNIQUE NOT NULL,
//         password VARCHAR(255) NOT NULL,
//         created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
//       );
//   `);
//     console.log("Result", result);
//   } catch (error) {
//     console.error("Error occured while creating user db", error);
//   }
// }

// async function insertData(username: string, email: string, password: string) {
//   try {
//     await client.connect();
//     const insertQuery = `INSERT INTO users (username, email, password) VALUES ($1, $2, $3)`;
//     const values = [username, email, password];
//     const res = await client.query(insertQuery, values);
//     console.log("Insertion seccess", res);
//   } catch (error) {
//     console.error("Erron occured while insertion", error);
//   } finally {
//     await client.end();
//   }
// }

async function getQuery(email: string) {
  try {
    await client.connect();
    const query = "SELECT * FROM users WHERE email = $1";
    const values = [email];
    const result = await client.query(query, values);

    if (result.rows.length > 0) {
      console.log("User found", result.rows[0]);
      return result.rows[0];
    } else {
      console.log("No user found with the given email id.");
      return null;
    }
  } catch (error) {
    console.error("Error while getting the user", error);
    throw error;
  } finally {
    await client.end();
  }
}

// createUsersTable();
// insertData("Ebrahim", "ebu@cool.com", "password123#");
getQuery("ebu@cool.com");
