import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  page = 1;
  pageSize = 5;
  users: User[] = [];
  profileForm: FormGroup
  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe((res: any) => {
        this.users = res;
        console.log(res);
      });
    this.profileForm = this.formBuilder.group({
      userId: ['', Validators.required],
      userName: ['', Validators.required],
      Email: ['', Validators.required]
    });

  }
  Xoa(quan) {
    let newArr = this.users.filter(item => {
      return item.id != quan.id;
    })
    this.users = newArr;

  }
  updateProfile() {
    // stop here if form is invalid
    if (this.profileForm.invalid) {
      return;
    }
   
    this.userService.postUser(this.profileForm.value)
      .subscribe(user => this.users.push(user));;
      console.log(this.profileForm.value);
  }
 clearForm(){
this.profileForm.reset();
  
  }

 

}
