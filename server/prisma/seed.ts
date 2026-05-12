import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client.js";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const user = {
    email: "user@example.com",
    password: "password",
    name: "Dummy user",
    isActive: true
}

const petType = [
    { id: 'dog' },
    { id: 'cat' },
    { id: 'rabbit' },
    { id: 'bird' },
];

const petAge = [
    { id: 'baby' },
    { id: 'young' },
    { id: 'adult' },
];

const petSize = [
    { id: 'small' },
    { id: 'medium' },
    { id: 'large' },
];

const petPersonality = [
    { id: 'friendly' },
    { id: 'shy' },
    { id: 'aggressive' },
];

const pets = [
    {
        name: "Milo",
        age: 2,
        type_id: "dog",
        age_type_id: "young",
        size_type_id: "medium",
        description: "Playful dog that loves long walks and fetch.",
        imageUrl: ["https://images.unsplash.com/photo-1517849845537-4d257902454a"],
        personalityIds: ["friendly"],
        address: "12 Nguyen Hue Street",
        ward: "Ben Nghe Ward",
        province: "Ho Chi Minh City"
    },
    {
        name: "Luna",
        age: 1,
        type_id: "cat",
        age_type_id: "young",
        size_type_id: "small",
        description: "Calm cat that enjoys sunlight and quiet corners.",
        imageUrl: ["https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba"],
        personalityIds: ["shy"],
        address: "25 Le Loi Boulevard",
        ward: "Ben Thanh Ward",
        province: "Ho Chi Minh City"
    },
    {
        name: "Coco",
        age: 3,
        type_id: "rabbit",
        age_type_id: "adult",
        size_type_id: "small",
        description: "Curious rabbit that likes fresh vegetables.",
        imageUrl: ["https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308"],
        personalityIds: ["friendly", "shy"],
        address: "8 Vo Van Tan Street",
        ward: "Vo Thi Sau Ward",
        province: "Ho Chi Minh City"
    },
    {
        name: "Rocky",
        age: 4,
        type_id: "dog",
        age_type_id: "adult",
        size_type_id: "large",
        description: "Loyal guard dog with excellent obedience.",
        imageUrl: ["https://images.unsplash.com/photo-1543466835-00a7907e9de1"],
        personalityIds: ["aggressive"],
        address: "41 Dien Bien Phu Street",
        ward: "Da Kao Ward",
        province: "Ho Chi Minh City"
    },
    {
        name: "Bella",
        age: 5,
        type_id: "cat",
        age_type_id: "adult",
        size_type_id: "medium",
        description: "Independent cat that warms up quickly to people.",
        imageUrl: ["https://images.unsplash.com/photo-1495360010541-f48722b34f7d"],
        personalityIds: ["friendly"],
        address: "77 Tran Hung Dao Street",
        ward: "Co Giang Ward",
        province: "Ho Chi Minh City"
    },
    {
        name: "Max",
        age: 1,
        type_id: "bird",
        age_type_id: "baby",
        size_type_id: "small",
        description: "Cheerful bird that sings every morning.",
        imageUrl: ["https://images.unsplash.com/photo-1444464666168-49d633b86797"],
        personalityIds: ["friendly"],
        address: "15 Pasteur Street",
        ward: "Ben Nghe Ward",
        province: "Ho Chi Minh City"
    },
    {
        name: "Daisy",
        age: 2,
        type_id: "rabbit",
        age_type_id: "young",
        size_type_id: "small",
        description: "Gentle rabbit that enjoys being held and brushed.",
        imageUrl: ["https://images.unsplash.com/photo-1535241749838-299277b6305f"],
        personalityIds: ["shy"],
        address: "62 Nguyen Thi Minh Khai Street",
        ward: "Ben Thanh Ward",
        province: "Ho Chi Minh City"
    },
    {
        name: "Leo",
        age: 6,
        type_id: "dog",
        age_type_id: "adult",
        size_type_id: "large",
        description: "Confident dog that responds well to training.",
        imageUrl: ["https://images.unsplash.com/photo-1507146426996-ef05306b995a"],
        personalityIds: ["friendly", "aggressive"],
        address: "103 Nam Ky Khoi Nghia Street",
        ward: "Vo Thi Sau Ward",
        province: "Ho Chi Minh City"
    },
    {
        name: "Nala",
        age: 3,
        type_id: "cat",
        age_type_id: "adult",
        size_type_id: "medium",
        description: "Affectionate cat that follows people around.",
        imageUrl: ["https://images.unsplash.com/photo-1518791841217-8f162f1e1131"],
        personalityIds: ["friendly", "shy"],
        address: "29 Hai Ba Trung Street",
        ward: "Da Kao Ward",
        province: "Ho Chi Minh City"
    },
    {
        name: "Sunny",
        age: 2,
        type_id: "bird",
        age_type_id: "young",
        size_type_id: "small",
        description: "Active bird with bright feathers and playful energy.",
        imageUrl: ["https://images.unsplash.com/photo-1452570053594-1b985d6ea890"],
        personalityIds: ["friendly"],
        address: "54 Calmette Street",
        ward: "Nguyen Thai Binh Ward",
        province: "Ho Chi Minh City"
    },
];

async function main() {
    // Delete in FK-safe order
    await prisma.pet.deleteMany();
    await prisma.petLocation.deleteMany();
    await prisma.token.deleteMany();
    await prisma.user.deleteMany();
    await prisma.petPersonality.deleteMany();
    await prisma.petType.deleteMany();
    await prisma.petAge.deleteMany();
    await prisma.petSize.deleteMany();


    await Promise.all([
        prisma.petType.createMany({ data: petType }),
        prisma.petAge.createMany({ data: petAge }),
        prisma.petSize.createMany({ data: petSize }),
        prisma.petPersonality.createMany({ data: petPersonality }),
    ]);

    const seededUser = await prisma.user.create({ data: user });

    await Promise.all(
        pets.map((pet) =>
            prisma.pet.create({
                data: {
                    name: pet.name,
                    age: pet.age,
                    type_id: pet.type_id,
                    age_type_id: pet.age_type_id,
                    size_type_id: pet.size_type_id,
                    description: pet.description,
                    imageUrl: pet.imageUrl,
                    isAdopted: false,
                    createdBy: seededUser.id,
                    updatedBy: seededUser.id,
                    location: {
                        create: {
                            address: pet.address,
                            ward: pet.ward,
                            province: pet.province,
                        },
                    },
                    personalities: {
                        connect: pet.personalityIds.map((id) => ({ id })),
                    },
                },
            }),
        ),
    );

    console.log(`Seeded: Success`);
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
