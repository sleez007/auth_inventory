import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NetworkService } from 'src/app/services/network.service';

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
  constructor(private fb: FormBuilder, private networkService : NetworkService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    alert(JSON.stringify(this.createAccountForm.value))
    this.isLoading = true;
    this.networkService.postRequest<{message: String}>('create',this.createAccountForm.value ).subscribe({
      next: d => console.log(d) ,
      error: e => console.log(e),
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
