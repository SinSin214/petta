import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { Prisma, PrismaClient } from "./generated/prisma/client.js";
import * as bcrypt from 'bcrypt';

const connectionString = `${process.env.DATABASE_URL}`;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const user = {
    email: process.env.EMAIL as string,
    password: await bcrypt.hash(process.env.PASSWORD as string, 10),
    name: process.env.NAME as string,
    isActive: true
}

const petTypeTranslations = [
    { petTypeId: 'dog', languageId: 'EN', name: 'Dog' },
    { petTypeId: 'dog', languageId: 'VN', name: 'Chó' },
    { petTypeId: 'cat', languageId: 'EN', name: 'Cat' },
    { petTypeId: 'cat', languageId: 'VN', name: 'Mèo' },
    { petTypeId: 'rabbit', languageId: 'EN', name: 'Rabbit' },
    { petTypeId: 'rabbit', languageId: 'VN', name: 'Thỏ' },
    { petTypeId: 'bird', languageId: 'EN', name: 'Bird' },
    { petTypeId: 'bird', languageId: 'VN', name: 'Chim' },
];

const petAgeTranslations = [
    { petAgeId: 'baby', languageId: 'EN', name: 'Baby' },
    { petAgeId: 'baby', languageId: 'VN', name: 'Nhỏ' },
    { petAgeId: 'young', languageId: 'EN', name: 'Young' },
    { petAgeId: 'young', languageId: 'VN', name: 'Trẻ' },
    { petAgeId: 'adult', languageId: 'EN', name: 'Adult' },
    { petAgeId: 'adult', languageId: 'VN', name: 'Trưởng thành' },
    { petAgeId: 'old', languageId: 'EN', name: 'Old' },
    { petAgeId: 'old', languageId: 'VN', name: 'Già' },
];

const petSizeTranslations = [
    { petSizeId: 'small', languageId: 'EN', name: 'Small' },
    { petSizeId: 'small', languageId: 'VN', name: 'Nhỏ' },
    { petSizeId: 'medium', languageId: 'EN', name: 'Medium' },
    { petSizeId: 'medium', languageId: 'VN', name: 'Trung bình' },
    { petSizeId: 'large', languageId: 'EN', name: 'Large' },
    { petSizeId: 'large', languageId: 'VN', name: 'Lớn' },
];

const petPersonalityTranslations = [
    { petPersonalityId: 'friendly', languageId: 'EN', name: 'Friendly' },
    { petPersonalityId: 'friendly', languageId: 'VN', name: 'Thân thiện' },
    { petPersonalityId: 'shy', languageId: 'EN', name: 'Shy' },
    { petPersonalityId: 'shy', languageId: 'VN', name: 'Nhút nhát' },
    { petPersonalityId: 'aggressive', languageId: 'EN', name: 'Aggressive' },
    { petPersonalityId: 'aggressive', languageId: 'VN', name: 'Hung hăng' },
];

const districts = [
    { id: 'ben_nghe', provinceId: 'ho_chi_minh' },
    { id: 'ben_thanh', provinceId: 'ho_chi_minh' },
    { id: 'vo_thi_sau', provinceId: 'ho_chi_minh' },
    { id: 'da_kao', provinceId: 'ho_chi_minh' },
    { id: 'co_giang', provinceId: 'ho_chi_minh' },
    { id: 'nguyen_thai_binh', provinceId: 'ho_chi_minh' },
];

const districtTranslations = [
    { districtId: 'ben_nghe', languageId: 'EN', name: 'Ben Nghe', },
    { districtId: 'ben_nghe', languageId: 'VN', name: 'Bến Nghé', },
    { districtId: 'ben_thanh', languageId: 'EN', name: 'Ben Thanh', },
    { districtId: 'ben_thanh', languageId: 'VN', name: 'Bến Thành', },
    { districtId: 'vo_thi_sau', languageId: 'EN', name: 'Vo Thi Sau', },
    { districtId: 'vo_thi_sau', languageId: 'VN', name: 'Võ Thị Sáu', },
    { districtId: 'da_kao', languageId: 'EN', name: 'Da Kao', },
    { districtId: 'da_kao', languageId: 'VN', name: 'Đa Kao', },
    { districtId: 'co_giang', languageId: 'EN', name: 'Co Giang', },
    { districtId: 'co_giang', languageId: 'VN', name: 'Cô Giang', },
    { districtId: 'nguyen_thai_binh', languageId: 'EN', name: 'Nguyen Thai Binh', },
    { districtId: 'nguyen_thai_binh', languageId: 'VN', name: 'Nguyễn Thái Bình', },
];

const provinceTranslations = [
    { provinceId: 'ho_chi_minh', languageId: 'EN', name: 'Ho Chi Minh' },
    { provinceId: 'ho_chi_minh', languageId: 'VN', name: 'Hồ Chí Minh' },
    { provinceId: 'hanoi', languageId: 'EN', name: 'Hanoi' },
    { provinceId: 'hanoi', languageId: 'VN', name: 'Hà Nội' },
    { provinceId: 'da_nang', languageId: 'EN', name: 'Da Nang' },
    { provinceId: 'da_nang', languageId: 'VN', name: 'Đà Nẵng' }
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

function getIdFromTypes (typeTranslations: any[], prefix: string) {
    let types = typeTranslations.map((type) => ({ id: type[`${prefix}Id`] }));
    types = [...new Map(types.map((item) => [item.id, item])).values()];
    return types;
}

async function main() {
    await prisma.$transaction(async (trx) => {
        await Promise.all([
            trx.petType.createMany({ data: getIdFromTypes(petTypeTranslations, "petType") }),
            trx.petAge.createMany({ data: getIdFromTypes(petAgeTranslations, "petAge") }),
            trx.petSize.createMany({ data: getIdFromTypes(petSizeTranslations, "petSize") }),
            trx.petPersonality.createMany({ data: getIdFromTypes(petPersonalityTranslations, "petPersonality") }),
            trx.province.createMany({ data: getIdFromTypes(provinceTranslations, "province") }),
        ]),

        await trx.district.createMany({ data: districts });
        
        await Promise.all([
            trx.petTypeTranslation.createMany({ data: petTypeTranslations }),
            trx.petAgeTranslation.createMany({ data: petAgeTranslations }),
            trx.petSizeTranslation.createMany({ data: petSizeTranslations }),
            trx.petPersonalityTranslation.createMany({ data: petPersonalityTranslations }),
            trx.provinceTranslation.createMany({ data: provinceTranslations }),
        ]);

        await trx.districtTranslation.createMany({ data: districtTranslations });

        const seededUser = await trx.user.create({ data: user });

        await Promise.all(
            pets.map((pet) =>
                trx.pet.create({
                    data: {
                        name: pet.name,
                        age: pet.age,
                        petType: {
                            connect: { id: pet.typeId }
                        },
                        petAge: {
                            connect: { id: pet.ageTypeId }
                        },
                        petSize: {
                            connect: { id: pet.sizeTypeId }
                        },
                        description: pet.description,
                        imageUrl: pet.imageUrl,
                        isAdopted: false,
                        createdByUser: { connect: { id: seededUser.id } },
                        location: {
                            create: {
                                address: pet.address,
                                districtId: pet.districtId,
                                provinceId: pet.provinceId
                            }
                        },
                        petPersonalities: {
                            connect: pet.personalityIds.map((id) => ({ id }))
                        }
                    },
                }),
            ),
        );
    },
    {
        maxWait: 5000, // Max wait to acquire transaction
        timeout: 10000, // Max transaction run time
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
    });
}

main().then(async () => {
    await prisma.$disconnect();
    await pool.end();
}).catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
});
