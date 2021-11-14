// import cache from 'helpers/rxjs-operators/cache';
// import IUserRole from 'interfaces/models/userRole';
import { IOrder } from 'interfaces/models/order';
import { IPaginationParams, IPaginationResponse } from 'interfaces/pagination';
import { Observable } from 'rxjs';

import apiService, { ApiService } from './api';

export class OrderService {
  constructor(private apiService: ApiService) {}

  public list(params: IPaginationParams): Observable<IPaginationResponse<IOrder>> {
    const response = this.apiService.get('/order', params);
    console.log('responta de orders >>> ', response);
    return response;
  }

  // public current(): Observable<IUser> {
  //   return this.apiService.get('/user/current');
  // }

  // public roles(refresh: boolean = false): Observable<IUserRole[]> {
  //   return this.apiService.get('/user/roles').pipe(cache('user-service-roles', { refresh }));
  // }

  // public save(model: Partial<IUser>): Observable<IUser> {
  //   return this.apiService.post('/user', model);
  // }

  // public delete(id: number): Observable<void> {
  //   return this.apiService.delete(`/user/${id}`);
  // }
}

const orderService = new OrderService(apiService);
export default orderService;
