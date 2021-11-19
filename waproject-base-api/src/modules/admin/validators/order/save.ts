import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IOrder } from 'modules/database/interfaces/order';

export class SaveValidator implements IOrder {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, type: 'string' })
  public title: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ required: true, type: 'number' })
  public amount: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ required: true, type: 'number' })
  public quantity: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, type: 'string' })
  public description: string;
}
