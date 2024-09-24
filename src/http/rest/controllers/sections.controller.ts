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
export class SectionsController {
  constructor(private sectionsService: SectionsService) {}

  @UseGuards(RestAuthGuard)
  @Get(':menuId')
  getById(@Param('menuId') menuId: string) {
    return this.sectionsService.getById(menuId);
  }

  @UseGuards(RestAuthGuard)
  @Post()
  create(@Body() data: CreateSectionDTO) {
    return this.sectionsService.create(data);
  }
}
