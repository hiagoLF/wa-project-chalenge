import * as Knex from 'knex';
import * as faker from 'faker/locale/pt_BR';
import { IS_DEV } from 'settings';
import { IOrder } from 'modules/database/interfaces/order';

export async function seed(knex: Knex): Promise<void> {
  if (!IS_DEV) return;

  // Creio que isso aqui é pra ver ser as seeds já foram inseridas
  const orders = await knex
    .count()
    .from('Order')
    .first();
  if (Number(orders.count) !== 0) return;

  console.warn('Inserting Orders into order table');

  for (let x = 0; x < 100; x++) {
    const title = faker.random.word();
    const description = faker.lorem.words();
    const quantity = faker.random.number(30);
    const amount = faker.random.number(2000);

    const order: IOrder = {
      title,
      description,
      quantity,
      amount,
      createdDate: new Date(),
      updatedDate: new Date()
    };

    await knex.insert(order).into('Order');
  }
}
