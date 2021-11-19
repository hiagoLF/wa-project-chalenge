// import cache from 'helpers/rxjs-operators/cache';
// import IUserRole from 'interfaces/models/userRole';
import IOrder from 'interfaces/models/order';
import { IPaginationParams, IPaginationResponse } from 'interfaces/pagination';
import { Observable } from 'rxjs';

import apiService, { ApiService } from './api';

export class OrderService {
  constructor(private apiService: ApiService) {}

  public list(params: IPaginationParams): Observable<IPaginationResponse<IOrder>> {
    return this.apiService.get('/order', params);
  }

  // public current(): Observable<IUser> {
  //   return this.apiService.get('/user/current');
  // }

  // public roles(refresh: boolean = false): Observable<IUserRole[]> {
  //   return this.apiService.get('/user/roles').pipe(cache('user-service-roles', { refresh }));
  // }

  public save(model: Partial<IOrder>): Observable<IOrder> {
    const formatedModel = { ...model, quantity: Number(model.quantity), amount: Number(model.amount) };
    return this.apiService.post('/order', formatedModel);
  }

  public delete(id: number): Observable<void> {
    return this.apiService.delete(`/order/${id}`);
  }
}

const orderService = new OrderService(apiService);
export default orderService;
