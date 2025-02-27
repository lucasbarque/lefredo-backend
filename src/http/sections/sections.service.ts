import { CreateSectionDTO } from './create-section-dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { slugify } from 'src/lib/utils';

@Injectable()
export class SectionsService {
  constructor(private prisma: PrismaService) {}

  async getByMenuId(menuId: string) {
    if (!menuId) {
      throw new HttpException('Menu does not exists.', HttpStatus.NOT_FOUND);
    }

    const sections = await this.prisma.section.findMany({
      where: {
        menuId,
      },
    });

    if (!sections) {
      throw new HttpException('Section does not exists.', HttpStatus.NOT_FOUND);
    }

    return sections;
  }

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
        slug: slugify(title),
        menuId,
      },
    });
  }
}
