import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';

@Controller()
export class InvoiceController {
  @Get()
  findAll() {}

  @Get('/:id')
  findOne(@Param('id') id: string) {}

  @Post()
  create(@Body() createInvoiceDto: CreateInvoiceDto) {}

  @Patch('/:id')
  update(@Param('id') id: string, @Body() data: UpdateInvoiceDto) {}

  @Delete('/:id')
  delete(@Param('id') id: string) {}
}
