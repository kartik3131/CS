import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-distributor',
  templateUrl: './register-distributor.component.html',
  styleUrl: './register-distributor.component.css'
})
export class RegisterDistributorComponent {

  registerD(registerForm2: NgForm) {
    console.log(registerForm2.value);
    this.userService.register2(registerForm2.value).subscribe(
      (response) => {
        this.router.navigate(['/login'])
        registerForm2.reset();
      },
      (error) => {
        console.log(error);
      }
    )
  }
  
  constructor(private userService: UserService, private router:Router) { }

}
