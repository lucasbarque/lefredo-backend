import { CreateSectionDTO } from './create-section-dto';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SectionsService } from './sections.service';

@Controller('sections')
export class SectionsController {
  constructor(private sectionsService: SectionsService) {}

  @Get()
  list(@Query('menuId') menuId: string) {
    return this.sectionsService.getByMenuId(menuId);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.sectionsService.getById(id);
  }

  @Post()
  create(@Body() data: CreateSectionDTO) {
    return this.sectionsService.create(data);
  }
}
