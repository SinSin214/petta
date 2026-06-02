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

const district = [
    { id: 'ben_nghe', provinceId: 'ho_chi_minh' },
    { id: 'ben_thanh', provinceId: 'ho_chi_minh' },
    { id: 'vo_thi_sau', provinceId: 'ho_chi_minh' },
    { id: 'da_kao', provinceId: 'ho_chi_minh' },
    { id: 'co_giang', provinceId: 'ho_chi_minh' },
    { id: 'nguyen_thai_binh', provinceId: 'ho_chi_minh' },
];

const province = [
    { id: 'ho_chi_minh' },
    { id: 'hanoi' },
    { id: 'da_nang' }
];

const pets = [
    {
        name: "Milo",
        age: 2,
        typeId: "dog",
        ageTypeId: "young",
        sizeTypeId: "medium",
        description: "Playful dog that loves long walks and fetch.",
        imageUrl: ["https://images.unsplash.com/photo-1517849845537-4d257902454a"],
        personalityIds: ["friendly"],
        address: "12 Nguyen Hue",
        districtId: "ben_nghe",
        provinceId: "ho_chi_minh"
    },
    {
        name: "Luna",
        age: 1,
        typeId: "cat",
        ageTypeId: "young",
        sizeTypeId: "small",
        description: "Calm cat that enjoys sunlight and quiet corners.",
        imageUrl: ["https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba"],
        personalityIds: ["shy"],
        address: "25 Le Loi Boulevard",
        districtId: "ben_thanh",
        provinceId: "ho_chi_minh"
    },
    {
        name: "Coco",
        age: 3,
        typeId: "rabbit",
        ageTypeId: "adult",
        sizeTypeId: "small",
        description: "Curious rabbit that likes fresh vegetables.",
        imageUrl: ["https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308"],
        personalityIds: ["friendly", "shy"],
        address: "8 Vo Van Tan",
        districtId: "vo_thi_sau",
        provinceId: "ho_chi_minh"
    },
    {
        name: "Rocky",
        age: 4,
        typeId: "dog",
        ageTypeId: "adult",
        sizeTypeId: "large",
        description: "Loyal guard dog with excellent obedience.",
        imageUrl: ["https://images.unsplash.com/photo-1543466835-00a7907e9de1"],
        personalityIds: ["aggressive"],
        address: "41 Dien Bien Phu",
        districtId: "da_kao",
        provinceId: "ho_chi_minh"
    },
    {
        name: "Bella",
        age: 5,
        typeId: "cat",
        ageTypeId: "adult",
        sizeTypeId: "medium",
        description: "Independent cat that warms up quickly to people.",
        imageUrl: ["https://images.unsplash.com/photo-1495360010541-f48722b34f7d"],
        personalityIds: ["friendly"],
        address: "77 Tran Hung Dao",
        districtId: "co_giang",
        provinceId: "ho_chi_minh"
    },
    {
        name: "Max",
        age: 1,
        typeId: "bird",
        ageTypeId: "baby",
        sizeTypeId: "small",
        description: "Cheerful bird that sings every morning.",
        imageUrl: ["https://images.unsplash.com/photo-1444464666168-49d633b86797"],
        personalityIds: ["friendly"],
        address: "15 Pasteur",
        districtId: "ben_nghe",
        provinceId: "ho_chi_minh"
    },
    {
        name: "Daisy",
        age: 2,
        typeId: "rabbit",
        ageTypeId: "young",
        sizeTypeId: "small",
        description: "Gentle rabbit that enjoys being held and brushed.",
        imageUrl: ["https://images.unsplash.com/photo-1535241749838-299277b6305f"],
        personalityIds: ["shy"],
        address: "62 Nguyen Thi Minh Khai",
        districtId: "ben_thanh",
        provinceId: "ho_chi_minh"
    },
    {
        name: "Leo",
        age: 6,
        typeId: "dog",
        ageTypeId: "adult",
        sizeTypeId: "large",
        description: "Confident dog that responds well to training.",
        imageUrl: ["https://images.unsplash.com/photo-1507146426996-ef05306b995a"],
        personalityIds: ["friendly", "aggressive"],
        address: "103 Nam Ky Khoi Nghia",
        districtId: "vo_thi_sau",
        provinceId: "ho_chi_minh"
    },
    {
        name: "Nala",
        age: 3,
        typeId: "cat",
        ageTypeId: "adult",
        sizeTypeId: "medium",
        description: "Affectionate cat that follows people around.",
        imageUrl: ["https://images.unsplash.com/photo-1518791841217-8f162f1e1131"],
        personalityIds: ["friendly", "shy"],
        address: "29 Hai Ba Trung",
        districtId: "da_kao",
        provinceId: "ho_chi_minh"
    },
    {
        name: "Sunny",
        age: 2,
        typeId: "bird",
        ageTypeId: "young",
        sizeTypeId: "small",
        description: "Active bird with bright feathers and playful energy.",
        imageUrl: ["https://images.unsplash.com/photo-1452570053594-1b985d6ea890"],
        personalityIds: ["friendly"],
        address: "54 Calmette",
        districtId: "nguyen_thai_binh",
        provinceId: "ho_chi_minh"
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
    await prisma.district.deleteMany();
    await prisma.province.deleteMany();


    await Promise.all([
        prisma.petType.createMany({ data: petType }),
        prisma.petAge.createMany({ data: petAge }),
        prisma.petSize.createMany({ data: petSize }),
        prisma.petPersonality.createMany({ data: petPersonality }),
        prisma.province.createMany({ data: province }),
    ]);

    await prisma.district.createMany({ data: district });

    const seededUser = await prisma.user.create({ data: user });

    await Promise.all(
        pets.map((pet) =>
            prisma.pet.create({
                data: {
                    name: pet.name,
                    age: pet.age,
                    typeId: pet.typeId,
                    ageTypeId: pet.ageTypeId,
                    sizeTypeId: pet.sizeTypeId,
                    description: pet.description,
                    imageUrl: pet.imageUrl,
                    isAdopted: false,
                    createdByUser: { connect: { id: seededUser.id } },
                    updatedByUser: { connect: { id: seededUser.id } },
                    location: {
                        create: {
                            address: pet.address,
                            districtId: pet.districtId,
                            provinceId: pet.provinceId
                        }
                    },
                    personalities: pet.personalityIds
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
