import { Body, Controller, Get, Post } from '@nestjs/common';
import { Message } from '../message/message.entity';
import { Register } from './register.entity';
import { RegisterDto } from './register.dto';
import { RegisterService } from './register.service';

@Controller('register')
export class RegisterController {
  constructor(private registerService: RegisterService) {}

  @Get('list')
  async getRecords(): Promise<Register[]> {
    return await this.registerService.findAll();
  }

  @Post('create')
  async createRegister(@Body() register: RegisterDto): Promise<Message> {
    return await this.registerService.createRegister(register);
  }
}
