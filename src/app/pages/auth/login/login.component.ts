import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(private networkService : NetworkService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    alert(JSON.stringify(this.loginForm.value))
    this.isLoading = true;
    this.networkService.postRequest<{message: String}>('login',this.loginForm.value ).subscribe({
      next: d => console.log(d) ,
      error: e => console.log(e),
      complete: () => this.isLoading = false
    });
  }

}
