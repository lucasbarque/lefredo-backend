import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Module({
  imports: [PassportModule],
  providers: [PrismaService],
  controllers: [],
})
export class AuthModule {}
