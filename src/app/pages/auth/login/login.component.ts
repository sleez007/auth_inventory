import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NetworkService } from 'src/app/services/network.service';
import { forbiddenNameValidator } from '../create-account/create-account.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email], ),
    password: new FormControl('', [Validators.required, forbiddenNameValidator()])
  });

  isLoading: Boolean = false;

  showPassword : boolean = true;

  constructor(private networkService : NetworkService, private router: Router) { }

  ngOnInit(): void {
    setTimeout(()=> this.showPassword = false, 8000)
  }

  onSubmit(){
    this.isLoading = true;
    this.networkService.postRequest<{message: String, jwt_token: string, api_auth_user :{email: string, id: number, fullName: string}}>('auth/login',this.loginForm.value ).subscribe({
      next: (data) =>{
       localStorage.setItem("token", "Bearer "+data.jwt_token )
       this.router.navigate(['/dashboard'])
      } ,
      error: e => {
        console.log(e)
        this.isLoading = false
        
      },
      complete: () => this.isLoading = false
    });
  }

}
