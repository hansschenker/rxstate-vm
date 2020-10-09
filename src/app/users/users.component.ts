import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { merge, Observable, Subject } from 'rxjs';
import { map, scan, tap } from 'rxjs/operators';
import { Item, Viewmodel } from '../state/viewmodel';
import { User } from './user.type';

type UserVm = Viewmodel<User>;
const initialVm: UserVm = {
  items: [],
  selectedItem: undefined,
};
@Component({
  selector: 'hs-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  public vm$: Observable<Viewmodel<User>>;
  // create action streams
  public addUserState = new Subject<User>();
  public deleteUserState = new Subject<User>();
  public showUserState = new Subject<User>();
  public closeUserState = new Subject();

  constructor(private http: HttpClient) {
    // merge action streams into one
    // and track state with the help of scan operator
    this.vm$ = merge(
      this.getUsersChange,
      this.addUserChange,
      this.deleteUserChange,
      this.showUserChange,
      this.closeUserChange
    ).pipe(scan(vmReducer(), { items: [], selectedItem: undefined } as UserVm));
  }

  private getUsersChange = this.http
    .get<User[]>(`https://jsonplaceholder.typicode.com/users`)
    .pipe(map((items) => (vm: UserVm) => ({ ...vm, items })));

  private addUserChange = this.addUserState.pipe(
    map((user) => (vm: UserVm) => ({
      ...vm,
      items: [...vm.items, { ...user }],
    }))
  );
  private deleteUserChange = this.deleteUserState.pipe(
    map((user) => (vm: UserVm) => ({
      ...vm,
      items: vm.items.filter((u) => u !== user),
    }))
  );

  private showUserChange = this.showUserState.pipe(
    map((selectedItem) => (vm: UserVm) => ({ ...vm, selectedItem }))
  );
  private closeUserChange = this.closeUserState.pipe(
    map((_) => (vm: UserVm) => ({ ...vm, selectedItem: null }))
  );
} // class

function vmReducer(): (
  acc: UserVm,
  value: (vm: UserVm) => UserVm,
  index: number
) => UserVm {
  return (oldVm: UserVm, mutateFn: (vm: UserVm) => UserVm) => mutateFn(oldVm);
}

function vmFn(): (
  acc: UserVm,
  value: (vm: UserVm) => UserVm,
  index: number
) => UserVm {
  return (oldVm: UserVm, fn: (vm: UserVm) => UserVm) => fn(oldVm);
}
