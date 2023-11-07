// import knex, { Knex } from "knex";

// import { Competition } from "../models/Competition"; // Import your Competition model

// class CompetitionController {
//   async createCompetition(args: {
//     category: string;
//     name: string;
//     code: string;
//     place: string;
//     fromDate: string;
//     toDate: string;
//     conductedBy: string;
//   }) {
//     try {
//       const { category, name, code, place, fromDate, toDate, conductedBy } =
//         args;

//       const competitionDB = knex({
//         client: "mysql2",
//         connection: {
//           host: "localhost",
//           user: "root",
//           password: "root",
//           database: "championship",
//         },
//       });

//       await competitionDB.raw("SELECT 1");
//       console.log("competition Database connected successfully");

//       // Define the migration functions directly within the controller
//       const up = async function (knex: Knex) {
//         return knex.schema.createTable("competition", (table) => {
//           table.increments("id").primary();
//           table.string("category").notNullable();
//           table.string("name").notNullable();
//           table.string("code").notNullable();
//           table.string("place").notNullable();
//           table.string("fromDate").notNullable();
//           table.string("toDate").notNullable();
//           table.string("conductedBy").notNullable();
//           table.dateTime("createdAt").defaultTo(knex.fn.now());
//         });
//       };

//       const down = async function (knex: Knex) {
//         return knex.schema.dropTable("competition");
//       };

//       const newCompetition = new Competition(
//         0, // Assuming the first argument in the Competition constructor is the ID
//         category,
//         name,
//         code,
//         place,
//         fromDate,
//         toDate,
//         conductedBy,
//         new Date() // createdAt
//       );
//       console.log("data", newCompetition);

//       const tableExists = await competitionDB.schema.hasTable("competition");
//       if (!tableExists) {
//         await up(competitionDB);
//         const competitionId = await competitionDB("competition").insert(
//           newCompetition
//         );
//       }

//       const existingCompetition = await competitionDB("competition")
//         .where({ name })
//         .first();

//       if (existingCompetition) {
//         throw new Error("Competition with the same code already exists.");
//       }

//       // Create a new competition object

//       // Insert the competition data into the "competition" table
//       const competitionId = await competitionDB("competition").insert(
//         newCompetition
//       );

//       // console.log("id", competitionId);

//       if (competitionId.length === 0) {
//         throw new Error(
//           "Failed to insert competition data into the 'competition' table."
//         );
//       }

//       return newCompetition;
//     } catch (error: any) {
//       throw new Error(error.message);
//     }
//   }
// }

// export default new CompetitionController();

import knex, { Knex } from "knex";
import { Competition } from "../models/Competition"; // Import your Competition model

class CompetitionController {
  private competitionDB: Knex;

  constructor() {
    this.competitionDB = knex({
      client: "mysql2",
      connection: {
        host: "localhost",
        user: "root",
        password: "root",
        database: "championship",
      },
    });

    this.createTableIfNotExists();
  }

  async createTableIfNotExists() {
    const tableExists = await this.competitionDB.schema.hasTable("competition");

    if (!tableExists) {
      await this.competitionDB.schema.createTable("competition", (table) => {
        table.increments("id").primary();
        table.string("category").notNullable();
        table.string("name").notNullable();
        table.string("code").notNullable();
        table.string("place").notNullable();
        table.string("fromDate").notNullable();
        table.string("toDate").notNullable();
        table.string("conductedBy").notNullable();
        table.dateTime("createdAt").defaultTo(this.competitionDB.fn.now());
      });
    }
  }

  async createCompetition(args: {
    category: string;
    name: string;
    code: string;
    place: string;
    fromDate: string;
    toDate: string;
    conductedBy: string;
  }) {
    try {
      const { category, name, code, place, fromDate, toDate, conductedBy } =
        args;

      const newCompetition = new Competition(
        0, // Assuming the first argument in the Competition constructor is the ID
        category,
        name,
        code,
        place,
        fromDate,
        toDate,
        conductedBy,
        new Date() // createdAt
      );

      console.log(newCompetition);

      const existingCompetition = await this.competitionDB("competition")
        .where({ name })
        .first();

      if (existingCompetition) {
        throw new Error("Competition with the same code already exists.");
      }

      const competitionId = await this.competitionDB("competition").insert(
        newCompetition
      );

      if (competitionId.length === 0) {
        throw new Error(
          "Failed to insert competition data into the 'competition' table."
        );
      }

      return newCompetition;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getCompetitions() {
    try {
      const competitions = await this.competitionDB("competition").select("*");
      return competitions;
    } catch (error: any) {
      throw Error(error.message);
    }
  }

  async deleteCompetition(id: number) {
    try {
      const existingCompetition = await this.competitionDB("competition")
        .where({ id })
        .first();

      if (!existingCompetition) {
        throw new Error("Competition not found.");
      }

      // Delete the competition data from the 'competition' table
      await this.competitionDB("competition").where({ id }).del();

      return existingCompetition;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async updateCompetition(
    id: number,
    args: {
      category: string;
      name: string;
      code: string;
      place: string;
      fromDate: string;
      toDate: string;
      conductedBy: string;
    }
  ) {
    try {
      const existingCompetition = await this.competitionDB("competition")
        .where({ id })
        .first();

      if (!existingCompetition) {
        throw new Error("Competition not found.");
      }

      // Define the updated data
      const updatedCompetition = {
        category: args.category,
        name: args.name,
        code: args.code,
        place: args.place,
        fromDate: args.fromDate,
        toDate: args.toDate,
        conductedBy: args.conductedBy,
      };

      // Update the competition data in the 'competition' table
      await this.competitionDB("competition")
        .where({ id })
        .update(updatedCompetition);

      return { ...existingCompetition, ...updatedCompetition };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export default new CompetitionController();
