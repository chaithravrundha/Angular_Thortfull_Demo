import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductServiceService } from '../service/product-service.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productTypes= ["New","Second Hand","Rough Used"];
  productForm !: FormGroup
  actionBtn : string ="Save"
  constructor(
    @Inject(MAT_DIALOG_DATA) public editData :any,
    private formBuilder: FormBuilder,
    private service : ProductServiceService,
    private dialogRef: MatDialogRef<AddProductComponent>
  ) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['',Validators.required],
      category: ['', Validators.required],
      date: [''],
      productType: [''],
      amount: [''],
      comments: ['']
    })

    if(this.editData){
      this.actionBtn = "Update";
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['date'].setValue(this.editData.date);
      this.productForm.controls['productType'].setValue(this.editData.productType);
      this.productForm.controls['amount'].setValue(this.editData.amount);
      this.productForm.controls['comments'].setValue(this.editData.comments);
    }
  }

  addProduct(){
 if(!this.editData){
  if(this.productForm.valid){
    this.service.createProduct(this.productForm.value).subscribe({
      next:(res)=>{
        alert("Product added successfully");
        this.productForm.reset();
        this.dialogRef.close("save");
      },
      error:()=>{
        alert("Adding product failed")
      }
    })
    }
 }else{
  this.updateProduct();
 }
    }

    updateProduct(){
    this.service.updateProduct(this.productForm.value, this.editData.id).subscribe({
    next:(res)=>{
      alert("Product Updated successfully");
      this.productForm.reset();
      this.dialogRef.close("update");
    },
    error:() =>{
      alert("Failed to update the record")
    }
   })
    }
  }

