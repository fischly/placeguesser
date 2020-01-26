import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class LogGuardService implements CanActivate{

  constructor(private router:Router, private userService:UserService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){

   if(!this.userService.getStatus())
    return true;

    console.log("logguard blocked");
    this.router.navigate(['/profile']);
    return false;
  }

}
