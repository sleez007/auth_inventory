import { Component, OnInit } from '@angular/core';

const bag : {country: string, flag: string, population: number}[] = [
  {country: 'Germany', flag: "https://flagcdn.com/w320/de.png", population: 3000000 },
  {country: 'Belgium', flag: "https://flagcdn.com/w320/be.png", population: 9000000},
  {country: 'Cook Islands', flag: "https://flagcdn.com/w320/ck.png", population: 12000000}
]


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  countries = bag;
  constructor() { }

  ngOnInit(): void {
  }

}
