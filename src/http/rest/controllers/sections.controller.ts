import { CreateSectionDTO } from '@inputs/create-section-dto';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SectionsService } from '@services/sections.service';
import { RestAuthGuard } from 'src/http/auth/guards/rest-jwt-auth.guard';

@Controller('sections')
@UseGuards(RestAuthGuard)
export class SectionsController {
  constructor(private sectionsService: SectionsService) {}

  @Get(':menuId')
  getById(@Param('menuId') menuId: string) {
    return this.sectionsService.getById(menuId);
  }

  @Get()
  getByMenuId(@Query('menuId') menuId: string) {
    return this.sectionsService.getSectionsByMenuId(menuId);
  }

  @Post()
  create(@Body() data: CreateSectionDTO) {
    return this.sectionsService.create(data);
  }
}
