import { Module } from '@nestjs/common';
import { PetController } from './pet.controller.js';
import { PetRepository } from './pet.repository.js';
import { PetService } from './pet.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  providers: [PetService, PetRepository],
  controllers: [PetController],
})
export class PetModule {}
