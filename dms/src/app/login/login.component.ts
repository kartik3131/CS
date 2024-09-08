import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { UserAuthService } from '../_services/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Note: 'styleUrls' should be used instead of 'styleUrl'
})
export class LoginComponent implements OnInit {

  public loginError: string = '';

  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Any initialization logic can go here
  }

  public login(loginForm: NgForm): void {
    this.userService.login(loginForm.value).subscribe(
      (response: any) => {
        const token = response.jwtToken;
        const roles = response.user.role;

        console.log(token," ",roles)

        if (roles && roles.length > 0) {
          this.userAuthService.setRoles(roles);
          this.userAuthService.setToken(token);

          const role = roles[0]; // Assuming the first role is the primary role

          switch (role.roleName) {
            case 'Admin':
              this.router.navigate(['/admin']);
              break;
            case 'User':
              this.router.navigate(['/user']);
              break;
            case 'Distributor':
              this.router.navigate(['/distributor']);
              break;
            default:
              this.router.navigate(['/']);
          }
        } else {
          this.loginError = 'User has no roles assigned.';
        }
      },
      (error) => {
        console.error(error);
        alert("Login failed. Please check your credentials and try again.");
        this.loginError = 'Login failed. Please check your credentials and try again.';
      }
    );
  }

    registerDistributor() {
      this.router.navigate(['/registerDistributor'])
    }
    registerUser() {
      this.router.navigate(['/register'])
    }
    
}
