import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client.js";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const petTypeData = [
    { id: 'dog' },
    { id: 'cat' },
    { id: 'rabbit' },
    { id: 'bird' },
];

const petAgeData = [
    { id: 'baby' },
    { id: 'young' },
    { id: 'adult' },
];

const petSizeData = [
    { id: 'small' },
    { id: 'medium' },
    { id: 'large' },
];

async function main() {
    await prisma.petType.deleteMany();
    await prisma.petAge.deleteMany();
    await prisma.petSize.deleteMany();

    const types = await prisma.petType.createMany({ data: petTypeData });
    const ages  = await prisma.petAge.createMany({ data: petAgeData });
    const sizes = await prisma.petSize.createMany({ data: petSizeData });

    console.log(`Seeded: ${types.count} pet types, ${ages.count} pet ages, ${sizes.count} pet sizes`);
}

main()
    .then(async () => {
        await prisma.$disconnect();
        await pool.end();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        await pool.end();
        process.exit(1);
    });