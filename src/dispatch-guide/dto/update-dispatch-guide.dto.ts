import { PartialType } from '@nestjs/swagger';
import { CreateDispatchGuideDto } from './create-dispatch-guide.dto';

export class UpdateDispatchGuideDto extends PartialType(CreateDispatchGuideDto) {}
