import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { Register } from './register.entity';
import { RegisterModule } from './register.module';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';

describe('RegisterModule', () => {
  let registerService: RegisterService;
  let registerController: RegisterController;
  let registerRepository: Repository<Register>;

  const REGISTER_REPOSITORY_TOKEN = getRepositoryToken(Register);

  beforeAll(async () => {
    const appModule: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: 'test/database.sqlite',
          entities: [Register],
          synchronize: true,
        }),
        RegisterModule,
      ],
    }).compile();

    registerService = appModule.get<RegisterService>(RegisterService);
    registerController = appModule.get<RegisterController>(RegisterController);
    registerRepository = appModule.get<Repository<Register>>(
      REGISTER_REPOSITORY_TOKEN,
    );
  });

  beforeEach(async () => {
    await registerRepository.query(`DROP TABLE register;`);
    await registerRepository.query(
      `CREATE TABLE register (id INTEGER PRIMARY KEY, nickname CHAR(3));`,
    );
    await registerRepository.query(
      `INSERT INTO register (nickname) VALUES ('ASD'), ('QWE'), ('ZXC');`,
    );
  });

  describe('RegisterController', () => {
    it('Should return list of all registrations', async () => {
      expect(await registerController.getRecords()).toEqual([
        { id: 1, nickname: 'ASD' },
        { id: 2, nickname: 'QWE' },
        { id: 3, nickname: 'ZXC' },
      ]);
    });

    it('Should register a new nickname', async () => {
      expect(
        await registerController.createRegister({ nickname: 'RTY' }),
      ).toEqual({
        type: 'success',
        text: '"RTY" was successfully registered.',
      });
    });
  });

  describe('RegisterService', () => {
    it('Should return list of all records', async () => {
      expect(await registerService.findAll()).toEqual([
        { id: 1, nickname: 'ASD' },
        { id: 2, nickname: 'QWE' },
        { id: 3, nickname: 'ZXC' },
      ]);
    });

    it('Should return one matched record', async () => {
      expect(await registerService.findOne({ nickname: 'QWE' })).toEqual({
        id: 2,
        nickname: 'QWE',
      });
    });

    it('Should return message for invalid input', async () => {
      expect(await registerService.createRegister({ nickname: 'fgh' })).toEqual(
        {
          type: 'error',
          text: 'Input does not match the requirements!',
        },
      );
    });

    it('Should return message for successful registration', async () => {
      expect(await registerService.createRegister({ nickname: 'RTY' })).toEqual(
        {
          type: 'success',
          text: '"RTY" was successfully registered.',
        },
      );
    });

    it('Should return message for already used registration', async () => {
      const generated = registerService['generateNickname']({
        nickname: 'QWE',
      });
      expect(
        await registerService.createRegister(
          { nickname: generated.nickname },
          true,
        ),
      ).toEqual({
        type: 'warning',
        text: `Input already used! We registered "${generated.nickname}" for you.`,
      });
    });
  });
});
