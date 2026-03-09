import request from "supertest";
import app from "../../app.js";
import prisma from "../../prisma/client.js";

console.log("AUTH.JS LOADED"); // ← Add this line

export const setupAuthTest = async () => {
    await prisma.user.deleteMany();
    await prisma.wellness.deleteMany();

    await request(app).post("/api/auth/register").send({
        firstName: "Ngatai",
        lastName: "Cherrington",
        email: "ngataijc02@gmail.com",
        password: "janedoe123",
        role: "ADMIN",
    });

    const res = await request(app).post("/api/auth/login").send({
        email: "ngataijc02@gmail.com",
        password: "janedoe123",
    });

    return res.body.token
};

export const cleanupDatabase = async () => {
    await prisma.department.deleteMany();
    await prisma.institution.deleteMany();
    await prisma.user.deleteMany();
  };
  
  export const disconnectPrisma = async () => {
    await prisma.$disconnect();
  };