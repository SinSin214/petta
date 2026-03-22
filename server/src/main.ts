import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  	app.enableCors({
      	credentials: true,
      	origin: true,
  	});

  await app.listen(process.env.PORT_SERVER);
}
bootstrap();
