import { Module } from '@nestjs/common';
import { PetController } from './pet.controller';
import { PetRepository } from './pet.repository';
import { PetService } from './pet.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [PetService, PetRepository],
  controllers: [PetController],
})
export class PetModule {}
