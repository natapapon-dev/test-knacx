import { Test, TestingModule } from '@nestjs/testing';
import { PatienRecordService } from './services/patien_record.service';

describe('PatienRecordService', () => {
  let service: PatienRecordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatienRecordService],
    }).compile();

    service = module.get<PatienRecordService>(PatienRecordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
