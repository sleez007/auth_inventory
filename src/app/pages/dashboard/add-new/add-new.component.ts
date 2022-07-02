import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss']
})
export class AddNewComponent implements OnInit {

  isLoading : Boolean = false
  createProductForm = this.fb.group({
    productName: ['', Validators.required],
    price: ['', [Validators.required]],
    shortDescription: ['', [Validators.required]]
  });
  constructor(private fb: FormBuilder, private networkService : NetworkService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    alert(JSON.stringify(this.createProductForm.value))
    this.isLoading = true;
    this.networkService.postRequest<{message: String}>('products',this.createProductForm.value ).subscribe({
      next: d => console.log(d) ,
      error: e => console.log(e),
      complete: () => this.isLoading = false
    });
  }

}
