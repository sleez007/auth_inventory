import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel } from 'src/app/model/product.model';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss']
})
export class AddNewComponent implements OnInit {

  isLoading : Boolean = false
  isEdit : Boolean = false
  productId: number = -1;
  createProductForm = this.fb.group({
    productName: ['', Validators.required],
    price: ['', [Validators.required]],
    shortDescription: ['', [Validators.required]]
  });
  constructor(private fb: FormBuilder, private networkService : NetworkService, private route: ActivatedRoute,private router: Router,) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.isEdit = true;
      this.productId = Number(id);
      this.retrieveProductInfo()
    }


  }

  onSubmit(){
    if(this.isEdit){
      this.updateProduct()
    }else{
      this.createProduct()
    }
  }

  retrieveProductInfo(){
    this.isLoading = true;
    this.networkService.getRequest<any>('all/product/'+ this.productId,true).subscribe({
      next: d =>{
        console.log(d)
        const prod = d.product;
        this.createProductForm.patchValue({
          productName: prod.product_name,
          price: prod.price,
          shortDescription: prod.description,
        })
      },
      error: e => console.log(e),
      complete: ()=> this.isLoading = false
    })
  }

  updateProduct(){
    this.isLoading = true;
    this.networkService.updateRequest<{message: String,product: ProductModel }>('all/edit/' + this.productId,this.createProductForm.value, true).subscribe({
      next: d =>{
        console.log("Updated")
      } ,
      error: e => console.log(e),
      complete: () => this.isLoading = false
    });
  }

  createProduct(){
    this.isLoading = true;
    this.networkService.postRequest<{message: String}>('all/add',this.createProductForm.value, true).subscribe({
      next: d => console.log(d) ,
      error: e => console.log(e),
      complete: () => this.isLoading = false
    });
  }

}
