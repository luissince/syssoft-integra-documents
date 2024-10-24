import { Test, TestingModule } from '@nestjs/testing';
import { DispatchGuideController } from './dispatch-guide.controller';
import { DispatchGuideService } from './dispatch-guide.service';

describe('DispatchGuideController', () => {
  let controller: DispatchGuideController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DispatchGuideController],
      providers: [DispatchGuideService],
    }).compile();

    controller = module.get<DispatchGuideController>(DispatchGuideController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
