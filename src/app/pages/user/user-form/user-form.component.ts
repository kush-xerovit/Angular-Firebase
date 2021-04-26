import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  formData: FormGroup
  id: any
  user: any
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute,) { }


  ngOnInit(): void {
    this.formData = new FormGroup({
      name: new FormControl("", Validators.compose([
        Validators.required,
      ])),
    });
    this.route.queryParams.subscribe(params => {
      if (params["id"]) {
        this.id = params["id"]
        this.userService.getUserById(this.id).subscribe(data => {
          this.user = {
            id: this.id,
            name: data.payload.get('name')
          }
          this.formData.patchValue(this.user)
        });
      }
    });

  }

  onClickSubmit(user: User) {
    if (this.id) this.userService.updateUser(user, this.id); else this.userService.createUser(user);
    this.router.navigateByUrl('user/list')
  }

  cancel() {
    this.router.navigateByUrl('user/list')
  }

}
