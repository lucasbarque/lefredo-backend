import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

interface CreateSectionParams {
  title: string;
  menuId: string;
}

@Injectable()
export class SectionsService {
  constructor(private prisma: PrismaService) {}

  async getSectionById(id: string) {
    const section = this.prisma.section.findUnique({
      where: {
        id,
      },
    });

    if (!section) {
      throw new Error('Section does not exists.');
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
      throw new Error('Menu does not exists.');
    }

    return await this.prisma.section.findMany({
      where: {
        menuId,
      },
    });
  }

  async createSection({ title, menuId }: CreateSectionParams) {
    const menuExists = await this.prisma.menu.findUnique({
      where: {
        id: menuId,
      },
    });

    if (!menuExists) {
      throw new Error('Menu does not exists.');
    }

    const sectionTitleExists = await this.prisma.section.findFirst({
      where: {
        title,
        menuId,
      },
    });

    if (sectionTitleExists) {
      throw new Error('Section title already exists.');
    }

    return await this.prisma.section.create({
      data: {
        title,
        menuId,
      },
    });
  }
}
