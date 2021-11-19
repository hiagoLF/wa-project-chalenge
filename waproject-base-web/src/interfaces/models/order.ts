export default interface IOrder {
  id?: number;
  title: string;
  description: string;
  quantity: number;
  amount: number;
  createdDate?: Date;
  updatedDate?: Date;
}
