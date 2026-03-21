import { Injectable } from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service.js"

@Injectable()
export class PetRepository {

  constructor(private prisma: PrismaService) {}

  async findManyBySelection(type_id: string, age_type_id: string, size_type_id: string) {
    return this.prisma.pet.findMany({
        where: {
            type_id: type_id,
            age_type_id: age_type_id,
            size_type_id: size_type_id
        }
    })
  }

//   async findById(id: string) {
//     return this.prisma.pet.findUnique({
//       where: { id }
//     })
//   }

//   async create(data: Prisma.PetCreateInput) {
//     return this.prisma.pet.create({
//       data
//     })
//   }

//   async update(id: string, data: Prisma.PetUpdateInput) {
//     return this.prisma.pet.update({
//       where: { id },
//       data
//     })
//   }

//   async delete(id: string) {
//     return this.prisma.pet.delete({
//       where: { id }
//     })
//   }
}