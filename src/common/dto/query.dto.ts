// src/common/dto/query.dto.ts
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class QueryDto {
    @IsOptional()
    title?: string;

    @IsOptional()
    @Transform(({ value }) => {
        if (value === 'true') return true;
        return false;
    })
    @IsBoolean()
    download?: boolean = false;
}