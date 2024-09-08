import { Component } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private userService:UserService,
    private router:Router
  ){  }

  register(registerFom1: any)
  {
    console.log(registerFom1.value);
    this.userService.register1(registerFom1.value).subscribe(
      (response)=>
      {
        registerFom1.reset();
        this.router.navigate(['/login'])
      },
      (error)=>
      {
        console.log(error);
      }
    )
  }
}
