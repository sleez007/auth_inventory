import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductModel } from 'src/app/model/product.model';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input('pp') productModel!: ProductModel;

  @Output() deleteItem = new EventEmitter<number>()

  constructor() { }

  ngOnInit(): void {
  }

  deleteNow(){
    this.deleteItem.emit(this.productModel.id)
  }

}
