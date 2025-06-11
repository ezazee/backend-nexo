import mongoose from "mongoose";
import dotenv from "dotenv";
import dbConnect from "../src/utils/dbConnect";
import { DesignProject } from "../src/models/designProjectModel";
import { CodeProject } from "../src/models/codeProjectModel";

dotenv.config();


const purgeDatabase = async () => {
  await dbConnect();

  try {
    // Hapus data lama
    await DesignProject.deleteMany({});
    await CodeProject.deleteMany({});

    console.log("Database seeded successfully");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
    mongoose.connection.close();
  }
};

purgeDatabase();
