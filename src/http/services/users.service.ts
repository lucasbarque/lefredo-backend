import { CreateUserDTO } from '@inputs/create-user.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async list() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
        active: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async create({ name, email, password }: CreateUserDTO) {
    const userWithSameEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userWithSameEmail) {
      throw new HttpException(
        'Another user with same email already exists.',
        HttpStatus.CONFLICT,
      );
    }

    const passwordSalt = await bcrypt.genSalt(8);

    const passwordHash = await bcrypt.hash(password, passwordSalt);

    await this.prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash,
      },
    });
  }
}
