import { Test, TestingModule } from '@nestjs/testing';
import { PatienRecordController } from './patien_record.controller';

describe('PatienRecordController', () => {
  let controller: PatienRecordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatienRecordController],
    }).compile();

    controller = module.get<PatienRecordController>(PatienRecordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
