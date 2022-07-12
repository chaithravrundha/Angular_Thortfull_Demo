import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductServiceService } from './service/product-service.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title = 'Angular_Thortful_Demo';

  displayedColumns: string[] = ['productName', 'category', 'date', 'productType', 'amount', 'comments', 'action'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private service: ProductServiceService) {}

  ngOnInit(): void {
   this.getAllProducts();


  }


  addData() {
    this.dialog.open(AddProductComponent, {
      width: '30%'
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getAllProducts();
      }
    })
  }

  getAllProducts(){
    return this.service.getProduct().subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err)=>{
        alert("Not able to fetch the data");
      }
    })
  }

  editProduct(row: any){
    this.dialog.open(AddProductComponent,{
      width: '30%',
      data: row
    }).afterClosed().subscribe(val =>{
      if(val === "update"){
        this.getAllProducts();
      }
    })
  }

  deleteProduct(id: number){
    this.service.deleteProduct(id).subscribe({
      next: (res)=>{
        alert("Product deleted successfully")
        this.getAllProducts();
      },
      error: ()=>{
        alert("Not able to delete the product")
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

