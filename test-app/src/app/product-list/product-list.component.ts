import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  id$ = -1;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // this.id$ = this.route.params
    this.route.paramMap.forEach(pm => {
      console.log('param map: ', pm);
      console.log('param map: ', pm.get('id'));

      this.id$ = +pm.get('id');
    });

    // console.log(this.route);
    // console.log(this.route.params.value);
  }
}
