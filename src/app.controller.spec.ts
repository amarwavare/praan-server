import { Test, TestingModule } from '@nestjs/testing';
import { PraanController } from './praan.controller';
import { PraanService } from './praan.service';

describe('AppController', () => {
  let praanController: PraanController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PraanController],
      providers: [PraanService],
    }).compile();

    praanController = app.get<PraanController>(PraanController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(praanController.getHello()).toBe('Hello World!');
    });
  });
});
