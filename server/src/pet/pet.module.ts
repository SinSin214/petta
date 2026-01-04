import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
// import { PrismaModule } from 'src/prisma/prisma.module';
import { PetController } from './pet.controller';
import { PetService } from './pet.service';

@Module({
  providers: [PetService],
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
