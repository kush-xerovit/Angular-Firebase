import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: User[];
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(data => {
      this.users = data.map(e => {
        return {
          id: e.payload.doc.id,
          name: e.payload.doc.get('name')
        } as User;
      })
      console.log(this.users)
    });

  }

  goTo() {
    this.router.navigateByUrl('user/form')
  }

  update(id) {
    console.log(id)
    this.router.navigate([`/user/form`], {
      queryParams: { id },
    });
  }

  delete(id: string) {
    this.userService.deleteUser(id);
  }

}
