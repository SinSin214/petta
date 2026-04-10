import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client.js";
const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const PetType = [
    {
        id: 'dog',
        name: 'Dog',
        language_id: 'EN',
    },
    {
        id: 'cat',
        name: 'Cat',
        language_id: 'EN',
    },
    {
        id: 'dog',
        name: 'Chó',
        language_id: 'VI',
    },
    {
        id: 'cat',
        name: 'Mèo',
        language_id: 'VI',
    }
];

const PetAge = [
    {
        id: 'puppy',
        name: 'Puppy',
        language_id: 'EN',
    },
    {
        id: 'adult',
        name: 'Adult',
        language_id: 'EN',
    },
    {
        id: 'puppy',
        name: 'Còn bé',
        language_id: 'VI',
    },
    {
        id: 'adult',
        name: 'Đã trưởng thành',
        language_id: 'VI',
    }
];

const PetSize = [
    {
        id: 'small',
        name: 'Small',
        language_id: 'EN',
    },
    {
        id: 'medium',
        name: 'Medium',
        language_id: 'EN'
    },
    {
        id: 'large',
        name: 'Large',
        language_id: 'EN',
    },
    {
        id: 'small',
        name: 'Nhỏ',
        language_id: 'VI',
    },
    {
        id: 'medium',
        name: 'Vừa',
        language_id: 'VI',
    },
    {
        id: 'large',
        name: 'Lớn',
        language_id: 'VI',
    }
];

const PetPersonality = [
    {
        id: 'calm',
        name: 'Calm',
        language_id: 'EN',
    },
    {
        id: 'active',
        name: 'Active',
        language_id: 'EN',
    },
    {
        id: 'calm',
        name: 'Điềm tĩnh',
        language_id: 'VI',
    },
    {
        id: 'active',
        name: 'Năng động',
        language_id: 'VI',
    }
];

const Pet = [
    {
        id: '1',
        name: 'Buddy',
        type_id: 'dog',
        age_id: 'adult',
        size_id: 'medium',
        personality_id: 'active',
        description: 'A friendly dog looking for a new home.',
        image_url: 'https://example.com/images/buddy.jpg',
    },
    {
        id: '2',
        name: 'Mittens',
        type_id: 'cat',
        age_id: 'puppy',
        size_id: 'small',
        personality_id: 'calm',
        description: 'A cute kitten who loves to cuddle.',
        image_url: 'https://example.com/images/mittens.jpg',
    }
]

async function main() {
    const alice = await prisma.petType.createMany({
        data: PetType,
    });

    // const bob = await prisma.pet.createMany({
    //     data: {
            
    //     }
    // });

    console.log({ alice });
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