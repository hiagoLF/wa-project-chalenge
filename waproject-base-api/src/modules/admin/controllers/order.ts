import { Controller, Get, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthRequired } from 'modules/common/guards/token';
import { enRoles } from 'modules/database/interfaces/user';
import { User } from 'modules/database/models/user';

import { OrderRepository } from '../repositories/order';
import { ListValidator } from '../validators/user/list';

@ApiTags('Admin: Order')
@Controller('/order')
@AuthRequired([enRoles.admin])
export class OrderController {
  constructor(private orderRepository: OrderRepository) {}

  @Get()
  @ApiResponse({ status: 200, type: [User] })
  public async list(@Query() model: ListValidator) {
    return this.orderRepository.list(model);
  }
}
