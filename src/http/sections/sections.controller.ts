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
import { RestAuthGuard } from 'src/http/auth/guards/rest-jwt-auth.guard';

@Controller('sections')
export class SectionsController {
  constructor(private sectionsService: SectionsService) {}

  @Get()
  list(@Query('menuId') menuId: string) {
    return this.sectionsService.getByMenuId(menuId);
  }

  @UseGuards(RestAuthGuard)
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.sectionsService.getById(id);
  }

  @UseGuards(RestAuthGuard)
  @Post()
  create(@Body() data: CreateSectionDTO) {
    return this.sectionsService.create(data);
  }
}
