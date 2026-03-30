import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PetModule } from './pet/pet.module.js';
import { AuthModule } from './auth/auth.module.js';

@Module({
  imports: [PetModule, AuthModule, ConfigModule.forRoot({
      // Example: .env file is one level up from the project root
      envFilePath: '../.env', 
      isGlobal: true,
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
