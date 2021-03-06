import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { PaginationValidator } from 'modules/common/validators/pagination';

export class ListValidator extends PaginationValidator {
  @IsString()
  @IsOptional()
  @IsIn(['title', 'description', 'amount', 'quantity'])
  @ApiProperty({ required: false, enum: ['title', 'description', 'amount', 'quantity'] })
  public orderBy: string;
}
