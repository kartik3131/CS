import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  PATH="http://localhost:9090";

  requestHeader = new HttpHeaders(
    {"No-Auth":"True"}
  )

  constructor(private httpclient:HttpClient, private userAuthService:UserAuthService) { }

  public login(loginData: any)
  {
    return this.httpclient.post(this.PATH+"/authenticate",loginData,{headers:this.requestHeader})
  }

  public forAdmin()
  {
    return this.httpclient.get(this.PATH +'/forAdmin', {
      responseType:'text',
    });
  }

  public forUser()
  {
    return this.httpclient.get(this.PATH +'/forUser', {
      responseType:'text',
    });
  }

  public forDistributor()
  {
    return this.httpclient.get(this.PATH+'/forDistributor', {
      responseType:'text',
    });
  }
  

  public roleMatch(allowedRoles: string[]): boolean {
    let isMatch = false;
    const userRoles: any[] = this.userAuthService.getRoles();
  
    if (userRoles && userRoles.length > 0) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName === allowedRoles[j]) {
            isMatch = true;
            break; // Exit inner loop once a match is found
          }
        }
        if (isMatch) {
          break; // Exit outer loop once a match is found
        }
      }
    }
  
    return isMatch;
  }


  public register1(registerData: string)
  {
    return this.httpclient.post(this.PATH+'/registerNewUser',registerData);
  }


  public register2(registerData: string)
  {
    return this.httpclient.post(this.PATH+'/registerNewDistributor',registerData);
  }
  
}
