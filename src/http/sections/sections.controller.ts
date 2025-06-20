import { RequestCreateSectionDTO } from './dto/request-create-section.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SectionsService } from './sections.service';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ClerkAuthGuard } from '../auth/guards/clerk-auth.guard';
// import { ResponseGetSectionsWithItemsDTO } from './dto/response-get-sections-with-items.dto';
import { ResponseGetSectionByIdDTO } from './dto/response-get-section-by-id.dto';
import { RequestUpdateSectionDTO } from './dto/request-update-section.dto';
import { SectionDTO } from './dto/section-dto';

@Controller('sections')
export class SectionsController {
  constructor(private sectionsService: SectionsService) {}

  @Get()
  @ApiOperation({
    summary: 'Get Sections',
    operationId: 'getSections',
  })
  @ApiOkResponse({
    type: SectionDTO,
    isArray: true,
  })
  list(@Query('menuId') menuId: string) {
    return this.sectionsService.getByMenuId(menuId);
  }

  @Get()
  @ApiOperation({
    summary: 'Get Sections by Slug',
    operationId: 'getSectionsBySlug',
  })
  @ApiOkResponse({
    type: SectionDTO,
    isArray: true,
  })
  getBySlug(@Query('slug') slug: string) {
    return this.sectionsService.getBySlug(slug);
  }

  @Get('/get-all')
  @ApiOperation({
    summary: 'Get All Sections',
    operationId: 'getAllSections',
  })
  @ApiOkResponse({
    type: SectionDTO,
    isArray: true,
  })
  @UseGuards(ClerkAuthGuard)
  getAll(@Query('menuId') menuId: string) {
    return this.sectionsService.getAllSectionsByMenuId(menuId);
  }

  @Get('/get-active')
  @ApiOperation({
    summary: 'Get active Sections',
    operationId: 'getActiveSections',
  })
  @ApiOkResponse({
    type: SectionDTO,
    isArray: true,
  })
  getActive(@Query('menuId') menuId: string) {
    return this.sectionsService.getActiveSectionsByMenuId(menuId);
  }

  @Get(':id')
  @UseGuards(ClerkAuthGuard)
  @ApiOperation({
    summary: 'Get Section By Id',
    operationId: 'getSectionById',
  })
  @ApiOkResponse({
    type: ResponseGetSectionByIdDTO,
  })
  getById(@Param('id') id: string) {
    return this.sectionsService.getById(id);
  }

  @Post()
  @UseGuards(ClerkAuthGuard)
  @ApiOperation({
    summary: 'Create Section',
    operationId: 'createSection',
  })
  @ApiCreatedResponse()
  create(@Body() data: RequestCreateSectionDTO) {
    return this.sectionsService.create(data);
  }

  @Delete(':id')
  @UseGuards(ClerkAuthGuard)
  @ApiOperation({
    summary: 'Delete Section',
    operationId: 'deleteSection',
  })
  @ApiOkResponse()
  delete(@Param('id') id: string) {
    return this.sectionsService.delete(id);
  }

  @Patch('toggle/:id')
  @UseGuards(ClerkAuthGuard)
  @ApiOperation({
    summary: 'Toggle Section',
    operationId: 'toggleSection',
  })
  @ApiOkResponse()
  toggle(@Param('id') id: string) {
    return this.sectionsService.toggle(id);
  }

  @Put(':id')
  @UseGuards(ClerkAuthGuard)
  @ApiOperation({
    summary: 'Update Section',
    operationId: 'updateSection',
  })
  @ApiOkResponse()
  update(@Param('id') id: string, @Body() data: RequestUpdateSectionDTO) {
    return this.sectionsService.update(id, data);
  }
}
