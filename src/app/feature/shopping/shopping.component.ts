import { Component, OnInit } from '@angular/core';
import { DataStorageService } from 'src/app/__services/data-storage.service';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.dataStorageService.loadData();
  }

}
