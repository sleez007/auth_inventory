import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NetworkService } from 'src/app/services/network.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthModel } from 'src/app/model/auth.model';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  isLoading : Boolean = false
  createAccountForm = this.fb.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, forbiddenNameValidator()]]
  });
  constructor(private fb: FormBuilder, private networkService : NetworkService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    //alert(JSON.stringify(this.createAccountForm.value))
    this.isLoading = true;
    this.networkService.postRequest<AuthModel>('auth/create-account',this.createAccountForm.value ).subscribe({
      next: data => {
        localStorage.setItem("token", "Bearer "+data.jwt_token )
        this.router.navigate(['/dashboard'])
        this.toastr.success("Successful", data.message);
       } ,
      error: e =>{
        this.toastr.error("Try again", 'An Error Occurred');
      },
      complete: () => this.isLoading = false
    });
  }

}

export function forbiddenNameValidator(): ValidatorFn {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = regex.test(control.value);
    return forbidden ?  null : {forbiddenName: {value: control.value}};
  };
}
