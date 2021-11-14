import { ApiProperty } from '@nestjs/swagger';
import { Model } from 'objection';
import { IOrder } from '../interfaces/order';

export class Order extends Model implements IOrder {
  @ApiProperty({ type: 'integer' })
  public id: number;

  @ApiProperty({ type: 'string' })
  public title: string;

  @ApiProperty({ type: 'string' })
  public description: string;

  @ApiProperty({ type: 'number' })
  public quantity: number;

  @ApiProperty({ type: 'number' })
  public amount: number;

  @ApiProperty({ type: 'string', format: 'date-time' })
  public createdDate: Date;

  @ApiProperty({ type: 'string', format: 'date-time' })
  public updatedDate: Date;

  // @ApiProperty({ nullable: true })
  // public devices?: Device[];

  // @ApiProperty({ type: 'string' })
  // public get fullName(): string {
  //   return `${this.firstName} ${this.lastName}`.trim();
  // }

  public static get tableName(): string {
    return 'Order';
  }

  // public static get relationMappings(): any {
  //   return {
  //     devices: {
  //       relation: Model.HasManyRelation,
  //       modelClass: Device,
  //       join: {
  //         from: 'User.id',
  //         to: 'Device.userId'
  //       }
  //     }
  //   };
  // }

  // public static get virtualAttributes(): string[] {
  //   return ['fullName'];
  // }

  // public isSysAdmin(): boolean {
  //   return this.roles.includes(enRoles.sysAdmin);
  // }

  public $beforeInsert(): void {
    this.createdDate = this.updatedDate = new Date();
  }

  public $beforeUpdate(): void {
    this.updatedDate = new Date();
  }

  // public $formatDatabaseJson(json: any): any {
  //   json = Model.prototype.$formatDatabaseJson.call(this, json);
  //   json.roles = json.roles && json.roles.length ? json.roles.join(',') : null;
  //   return json;
  // }

  // public $parseDatabaseJson(json: any): any {
  //   json.roles = json.roles ? json.roles.split(',') : [];
  //   return Model.prototype.$formatDatabaseJson.call(this, json);
  // }

  // public $formatJson(data: IUser): IUser {
  //   delete data.password;
  //   return data;
  // }
}
