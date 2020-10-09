import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersComponent } from './users.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserSearchComponent } from './user-search/user-search.component';

@NgModule({
  declarations: [
    UsersComponent,
    UserAddComponent,
    UserListComponent,
    UserDetailsComponent,
    UserSearchComponent,
  ],
  exports: [
    UsersComponent,
    UserAddComponent,
    UserListComponent,
    UserDetailsComponent,
    UserSearchComponent,
  ],
  imports: [CommonModule],
})
export class UsersModule {}
