import { Module } from '@nestjs/common';
import { DispatchGuideService } from './dispatch-guide.service';
import { DispatchGuideController } from './dispatch-guide.controller';

@Module({
  controllers: [DispatchGuideController],
  providers: [DispatchGuideService],
})
export class DispatchGuideModule {}
