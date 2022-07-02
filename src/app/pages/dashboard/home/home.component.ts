import { Component, OnInit } from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  products: Product[] = []
  constructor( private networkService : NetworkService) { }

  ngOnInit(): void {
    this.networkService.getRequest<Product[]>('products').subscribe(
      {
        next:(data: Product[]) =>  this.products = data,
        error:(e) => console.log(e)
      }
    )
  }

  deleteProduct(id: number){
    this.networkService.deleteRequest('products/', id).subscribe(
      {
        next : (d) => {
          const index = this.products.findIndex(e=> e.id == id);
          this.products.splice(index, 1);
        }
      }
    )
  }

}

interface Product{
  id: number 
  productName: string 
  price: number
  shortDescription : string 
}
