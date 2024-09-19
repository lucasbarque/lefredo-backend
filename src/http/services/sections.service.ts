import { CreateSectionDTO } from '@inputs/create-section-dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class SectionsService {
  constructor(private prisma: PrismaService) {}

  async getById(id: string) {
    const section = await this.prisma.section.findUnique({
      where: {
        id,
      },
    });

    if (!section) {
      throw new HttpException('Section does not exists.', HttpStatus.NOT_FOUND);
    }

    return section;
  }

  async getSectionsByMenuId(menuId: string) {
    const menuExists = this.prisma.menu.findUnique({
      where: {
        id: menuId,
      },
    });

    if (!menuExists) {
      throw new HttpException('Menu does not exists.', HttpStatus.NOT_FOUND);
    }

    return await this.prisma.section.findMany({
      where: {
        menuId,
      },
    });
  }

  async create({ title, menuId }: CreateSectionDTO) {
    const menuExists = await this.prisma.menu.findUnique({
      where: {
        id: menuId,
      },
    });

    if (!menuExists) {
      throw new HttpException('Menu does not exists.', HttpStatus.NOT_FOUND);
    }

    const sectionTitleExists = await this.prisma.section.findFirst({
      where: {
        title,
        menuId,
      },
    });

    if (sectionTitleExists) {
      throw new HttpException(
        'Section title already exists.',
        HttpStatus.CONFLICT,
      );
    }

    await this.prisma.section.create({
      data: {
        title,
        menuId,
      },
    });
  }
}
