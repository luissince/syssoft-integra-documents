import { Test, TestingModule } from '@nestjs/testing';
import { DispatchGuideService } from './dispatch-guide.service';

describe('DispatchGuideService', () => {
  let service: DispatchGuideService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DispatchGuideService],
    }).compile();

    service = module.get<DispatchGuideService>(DispatchGuideService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
