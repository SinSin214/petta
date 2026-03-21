import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
// import { PrismaModule } from 'src/prisma/prisma.module';
import { PetController } from './pet.controller';
import { PetRepository } from './pet.repository';
import { PetService } from './pet.service';

@Module({
  providers: [PetService, PetRepository],
  controllers: [PetController],
//   imports: [PrismaModule]
})
export class PetModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply()
      .forRoutes(
        { path: 'pet/selection', method: RequestMethod.POST },
      )
  }
}
