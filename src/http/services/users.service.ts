import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/database/prisma/prisma.service';

interface CreateUserParams {
  name: string;
  email: string;
  password: string;
}

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    return this.prisma.user.findMany();
  }

  async createUser({ name, email, password }: CreateUserParams) {
    const userWithSameEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userWithSameEmail) {
      throw new Error('Another user with same email already exists.');
    }

    const passwordSalt = await bcrypt.genSalt(8);

    const passwordHash = await bcrypt.hash(password, passwordSalt);

    return await this.prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash,
      },
    });
  }
}
