import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface DataTablesResponse {
  data: any[];
  draw: number;
  to: number;
  total: number;
}
@Component({
  selector: 'app-test123',
  templateUrl: './test123.component.html',
  styleUrls: ['./test123.component.css']
})
export class Test123Component implements OnInit {

  dtOptions: DataTables.Settings = {};
  stocks: any = [];

  table: string = 'show';

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {this.LoadTable();
  }


LoadTable(): void{

  const that = this;

  this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 5,
    serverSide: true,
    processing: true,
    ajax: (dataTablesParameters: any, callback) => {
      that.http
        .post<DataTablesResponse>(
          'http://127.0.0.1:8000/api/datatable_stock',
          dataTablesParameters, {}
        ).subscribe(resp => {
          that.stocks = resp.data;

          callback({
            recordsTotal: resp.to,
            recordsFiltered: resp.total,
            data: []
          });
        });
    },
    columns: [
      { data: 'id' },
      { data: 'reference' },
      { data: 'description' },
      { data: 'brand' },
      { data: 'qty' },

    ]
  };
}

}
