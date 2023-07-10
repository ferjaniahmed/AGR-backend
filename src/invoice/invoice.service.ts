import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InviceDocument } from './entities/invoice.schema';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { CreateInvoiceDto } from './dto/create-invoice.dto';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectModel('Invoice') private invoiceDocument: Model<InviceDocument>,
  ) {}

  async findAll() {
    try {
      return await this.invoiceDocument.find().populate('listOrder');
    } catch (error) {
      throw new HttpException('Invoices not found', HttpStatus.NOT_FOUND, {
        cause: error,
      });
    }
  }

  async findById(id: string) {
    try {
      return await this.invoiceDocument.findById(id);
    } catch (error) {
      throw new HttpException('this Invoice not found', HttpStatus.NOT_FOUND, {
        cause: error,
      });
    }
  }

  async create(data: CreateInvoiceDto) {
    try {
      const newInvoice = new this.invoiceDocument(data);
      return await newInvoice.save();
    } catch (error) {
      throw new HttpException('this Invoice not found', HttpStatus.NOT_FOUND, {
        cause: error,
      });
    }
  }

  async update(id: string, data: UpdateInvoiceDto) {
    try {
      return await this.invoiceDocument.updateOne({ _id: id }, data, {
        new: true,
      });
    } catch (error) {
      throw new HttpException('this Invoice not found', HttpStatus.NOT_FOUND, {
        cause: error,
      });
    }
  }

  async delete(id: string) {
    try {
      return await this.invoiceDocument.findByIdAndDelete(id);
    } catch (error) {
      throw new HttpException('this Invoice not found', HttpStatus.NOT_FOUND, {
        cause: error,
      });
    }
  }
}
