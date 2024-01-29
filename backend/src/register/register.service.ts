import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from '../message/message.entity';
import { MessageType } from '../message/message.interface';
import { Register } from './register.entity';
import { RegisterInterface } from './register.interface';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(Register)
    private repository: Repository<Register>,
  ) {}

  findAll(): Promise<Register[]> {
    return this.repository.find();
  }

  findOne(register: RegisterInterface): Promise<Register | null> {
    return this.repository.findOneBy({
      nickname: register.nickname,
    });
  }

  async createRegister(
    register: RegisterInterface,
    retried: boolean = false,
  ): Promise<Message> {
    // Validate the input has 3 CAPITAL LETTERS ONLY
    const isInputValid = this.validateNickname(register);

    if (!isInputValid) {
      return new Message(
        MessageType.Error,
        'Input does not match the requirements!',
      );
    }

    // Check for an already existing registration
    const record: Register = await this.findOne(register);

    if (record) {
      // Handle the case when the nickname has been already used
      const newRegister: RegisterInterface = this.generateNickname(register);
      // Use a recursive call in order to avoid code duplication!
      return await this.createRegister(newRegister, true);
    }

    const result: Register = await this.repository.save(register);

    if (retried) {
      // Handle the case when the input was already registered
      return new Message(
        MessageType.Warning,
        `Input already used! We registered "${result.nickname}" for you.`,
      );
    }

    // Show message for the standard case
    return new Message(
      MessageType.Success,
      `"${result.nickname}" was successfully registered.`,
    );
  }

  private validateNickname(register: RegisterInterface): boolean {
    const regex = new RegExp('^[A-Z]{3}$');

    return regex.test(register.nickname);
  }

  protected generateNickname(register: RegisterInterface): RegisterInterface {
    const newRegister: RegisterInterface = { ...register };

    let newNickname: string = '';
    for (let i = 0; i < 3; i++) {
      // Use ASCII character codes for capital letters
      const randAsciiCodeNumber: number =
        Math.floor(Math.random() * (90 - 65)) + 65;

      // Get string character from the code number
      const randCharCapitalLetter: string =
        String.fromCharCode(randAsciiCodeNumber);

      // Build the newly generated string
      newNickname += randCharCapitalLetter;
    }
    newRegister.nickname = newNickname;

    return newRegister;
  }
}
