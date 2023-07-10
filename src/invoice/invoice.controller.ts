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
import { InvoiceService } from './invoice.service';

@Controller("invoice")
export class InvoiceController {
  constructor(private invoiceService: InvoiceService) {}
  @Get()
  findAll() {
    return this.invoiceService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.invoiceService.findById(id);
  }

  @Post()
  create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoiceService.create(createInvoiceDto);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() data: UpdateInvoiceDto) {
    return this.invoiceService.update(id, data);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.invoiceService.delete(id);
  }
}
