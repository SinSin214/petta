import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"

@Injectable()
export class PetRepository {

  constructor(private prisma: PrismaService) {}

  async findManyBySelection(type_ids: string[], age_type_ids: string[], size_type_ids: string[]) {
    return this.prisma.pet.findMany({
        where: {
            type_id: { in: type_ids },
            age_type_id: { in: age_type_ids },
            size_type_id: { in: size_type_ids }
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