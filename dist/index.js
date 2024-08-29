"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const client = new pg_1.Client({
    connectionString: "postgresql://payment-db_owner:Zdvh5EMfRSu2@ep-crimson-night-a5l9y5i9.us-east-2.aws.neon.tech/payment-db?sslmode=require",
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
function getQuery(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const query = "SELECT * FROM users WHERE email = $1";
            const values = [email];
            const result = yield client.query(query, values);
            if (result.rows.length > 0) {
                console.log("User found", result.rows[0]);
                return result.rows[0];
            }
            else {
                console.log("No user found with the given email id.");
                return null;
            }
        }
        catch (error) {
            console.error("Error while getting the user", error);
            throw error;
        }
        finally {
            yield client.end();
        }
    });
}
// createUsersTable();
// insertData("Ebrahim", "ebu@cool.com", "password123#");
getQuery("ebu@cool1.com");
