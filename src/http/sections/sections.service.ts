import { RequestCreateSectionDTO } from './dto/request-create-section.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { slugify } from 'src/lib/utils';
import { RequestUpdateSectionDTO } from './dto/request-update-section.dto';

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
        isActive: true,
      },
    });

    if (!sections) {
      throw new HttpException('Section does not exists.', HttpStatus.NOT_FOUND);
    }

    return sections;
  }

  async getWithItems(menuId: string) {
    if (!menuId) {
      throw new HttpException('Menu does not exists.', HttpStatus.NOT_FOUND);
    }

    const sections = await this.prisma.section.findMany({
      where: {
        menuId,
      },
      include: {
        Dish: {
          include: {
            dishMedias: true,
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
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

  async create({ title, menuId }: RequestCreateSectionDTO) {
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

  async update(id: string, { title, description }: RequestUpdateSectionDTO) {
    const section = await this.prisma.section.findUnique({
      where: {
        id,
      },
    });

    if (!section) {
      throw new HttpException('Section does not exists.', HttpStatus.NOT_FOUND);
    }
    await this.prisma.section.update({
      data: {
        title,
        description,
        slug: slugify(title),
      },
      where: {
        id,
      },
    });
  }

  async delete(id: string) {
    const section = await this.prisma.section.findUnique({
      where: {
        id,
      },
      include: {
        Dish: true,
      },
    });

    if (!section) {
      throw new HttpException('Section does not exists.', HttpStatus.NOT_FOUND);
    }

    if (section.Dish.length > 0)
      throw new HttpException(
        'Failed to delete section with dishes created.',
        HttpStatus.EXPECTATION_FAILED,
      );

    await this.prisma.section.delete({
      where: {
        id,
      },
    });
  }

  async toggle(id: string) {
    const section = await this.prisma.section.findUnique({
      where: {
        id,
      },
      include: {
        Dish: {
          where: {
            isActive: true,
          },
        },
      },
    });

    if (!section) {
      throw new HttpException('Section does not exists.', HttpStatus.NOT_FOUND);
    }

    if (section.isActive === false && section.Dish.length === 0)
      throw new HttpException(
        'Failed to activate section without activated dishes.',
        HttpStatus.PRECONDITION_REQUIRED,
      );

    await this.prisma.section.update({
      data: {
        isActive: !section.isActive,
      },
      where: {
        id,
      },
    });
  }
}
