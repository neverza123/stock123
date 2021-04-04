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
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  stocks: any = [];


  addForm = this.fb.group({
    id: [''],
    stock_part_no: [''],
    stock_part_name: [''],
    stock_count: [''],
    stock_date: ['']



  });

  editForm = this.fb.group({
    id: [''],
    reference: [''],
    dbrandption: [''],
    brand: [''],
    qty: ['']


  });


  deleteForm = this.fb.group({
    id: [''],


  });

  table: string = 'show';

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {this.LoadTable();
  }


LoadTable(): void{

  const that = this;

  this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 20,
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
      { data: 'stock_part_no' },
      { data: 'stock_part_name' },
      { data: 'stock_count' },
      { data: 'stock_date' },

    ]
  };
}

  addSubmit(): void {
    console.log(this.addForm.value)
    this.http.post('http://127.0.0.1:8000/api/insert_stock', this.addForm.value)
    .subscribe(
      (res) => {
        window.location.reload();

      }
    );
  }

  editSubmit(): void {
    console.log(this.editForm.value)
    this.http.put('http://127.0.0.1:8000/api/edit_stock/' + this.editForm.value.id, this.editForm.value)

      .subscribe(
        (res) => {
          window.location.reload();

        }
      );

  }


  deleteSubmit(): void {
    console.log(this.deleteForm.value)
    this.http.delete('http://127.0.0.1:8000/api/delete_stock/' + this.deleteForm.value.id,)
      .subscribe(
        (res) => {
          console.log(res);

        }
      );

  }
  showstock(stock: any): void {
    console.log(stock);

  }
  deletestock(stock: any): void {
    this.http.delete('http://127.0.0.1:8000/api/del_stock/' + stock.id)
      .subscribe(
        (res) => {
          window.location.reload();
          console.log(res);
          this.LoadTable();

        }
      );
  }
  changeProduct(stock: any): void {
  this.table = 'edit';
  this.editForm = this.fb.group({
    id: [stock.id],
    reference: [stock.reference],
    description: [stock.description],
    brand: [stock.brand],
    qty: [stock.qty],
  })

}

addProduct(stock: any): void {
  this.table = 'add';
  this.addForm = this.fb.group({
    reference: [stock.reference],
    description: [stock.description],
    brand: [stock.brand],
    qty: [stock.qty],
  })



  }

}

