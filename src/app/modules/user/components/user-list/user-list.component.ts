import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  isUpdate = false;
  page = 1;
  pageSize = 5;
  users: User[] = [];
  profileForm: FormGroup
  email = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
  submitted: boolean;

  constructor(private userService: UserService, private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.userService.getUsers()
      .subscribe((res: any) => {
        this.users = res;
        console.log(res);
        this.profileForm = this.formBuilder.group({
          id: ['', Validators.required],
          username: ['', Validators.required],
          password: ['', Validators.required],
          email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]
        });

      });
    this.profileForm = this.formBuilder.group({
      id: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstName: '123',
      lastName: '123',
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      token: '123'
    });
  }
// Xu li loi
  get f() { return this.profileForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.profileForm.invalid) {
      return;
    }
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.profileForm.value))
  }
// Hien thi user
  Capnhat(user) {
    this.isUpdate = true;
    this.profileForm = this.formBuilder.group({
      id: [user.id, Validators.required],
      username: [user.username, Validators.required],
      password: [user.password, Validators.required],
      email: [user.email, Validators.required]
    });
  }
  //Update user
  updateProfile() {
    if (this.isUpdate == true) {
      console.log("I'm here");
      if (this.profileForm.invalid) {
        return;
      }
      this.userService.updateUserById(this.profileForm.value.id, this.profileForm.value)
        .subscribe(user => {
          this.users.forEach((element) => {
            if (element.id == user.id) {
              element = user;
              this.isUpdate = false;
              this.ngOnInit();
              return;
            }
          });
        });
    }
    if (this.profileForm.invalid) {
      return;
    }


    this.userService.postUser(this.profileForm.value)
      .subscribe(user => this.users.push(user));
  
  }
  //Xoa theo Id User
  detelebyId(id) {
    this.userService.deleteUserById(id)
      .subscribe(user => {
        this.users.forEach((element, index) => {
          if (element.id == user.id) {
            this.users.splice(index, 1);
            return;
          }
        });
      });
   
  }
  //Xoa du lieu Form
  clearForm() {
    this.profileForm.reset();

  }
  get fval() {
    return this.profileForm.controls;
  }
  signup() {
    this.submitted = true;
    if (this.profileForm.invalid) {
      return;
    }
    alert('form fields are validated successfully!');
  }
// Xem thong tin User
  Xem(user) {
    this.isUpdate = true;
    this.profileForm = this.formBuilder.group({
      id: [user.id, Validators.required],
      username: [user.username, Validators.required],
      password: [user.password, Validators.required],
      email: [user.email, Validators.required]
    });

  }
}
