import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../../prisma/generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(private configService: ConfigService) {
    let connectionString = configService.get<string>('DATABASE_URL');
    const adapter = new PrismaPg({ connectionString: connectionString });
    super({ adapter });
  }
}