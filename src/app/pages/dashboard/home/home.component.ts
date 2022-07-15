import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/model/product.model';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  products: ProductModel[] = []
  constructor( private networkService : NetworkService) { }

  ngOnInit(): void {
    this.networkService.getRequest<ProductModel[]>('all/products', true).subscribe(
      {
        next:(data: ProductModel[]) =>  this.products = data,
        error:(e) => console.log(e)
      }
    )
  }

  deleteProduct(id: number){
    alert("I have been called"+ id)
    // this.networkService.deleteRequest('all/remove/', id).subscribe(
    //   {
    //     next : (d) => {
    //       const index = this.products.findIndex(e=> e.id == id);
    //       this.products.splice(index, 1);
    //     },
    //     error: e => console.log(e)
    //   }
    // )
  }

}



