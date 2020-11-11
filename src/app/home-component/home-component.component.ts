import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { FormComponent } from '../form-component/form-component.component';
import { ViewEditComponent } from '../view-edit-component/view-edit-component.component';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

import { GrantService } from '../services/grant-service.service';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponent implements OnInit {

  userName: string = "";

  processing: boolean = true;

  loadingError: string = "";

  dataSource: any = new MatTableDataSource<any>();


  displayedColumns: string[] = ['grantName', 'grantStatus', 'grantor', 'location', 'description', 'amount', 'delete', 'view'];

  fileData: Array<Object> = [
    { name: 'Grant Name', value: '', readOnly: false, form: 'grantName' },
    { name: 'Grantor', value: '', readOnly: false, form: 'grantor' },
    { name: 'Location', value: '', readOnly: false, form: 'location' },
    { name: 'Amount', value: '', readOnly: false, form: 'amount' }
  ]

  constructor(private dialog: MatDialog, private grantService: GrantService) { }

  ngOnInit(): void {

    this.userName = localStorage.getItem('userName');

    this.getGrants();
  }

  getGrants(){
    this.grantService.getAllGrants().subscribe(
      response =>{
        this.processing = false;

        if(!response){
          this.loadingError = "Failed to load the grants available. Try again later";
          return;
        }
 
          this.dataSource.data = response;

      }, 
      error=>{
        this.processing = false;
        this.dataSource.data = [];
        this.loadingError = "Failed to load the grants available. Try again later";

    })

  }

  addGrant(){

    let dialogRef = this.dialog.open(FormComponent, {
      height: '600px',
      width: '400px',
      data: {
        inputFields: this.fileData,
        fileInputField: true,
        buttons: [
          { name: "Update", type: "submit", color:"primary" },
          { name: "Cancel", type: "submit", color:"warn" },
      ],
        title: "Add New Grant"
      }
    });
  
    dialogRef.afterClosed().subscribe(() => {
      // refresh grant data
      this.getGrants();
    })

  }

  displayData(row){

    let viewEditData = [];

    for(let key in row){
      if(key !== 'updated_at'){
        viewEditData.push({ name: key.toUpperCase(), value: row[key], readOnly: true, className: key});
      }
    }

    let dialogRef = this.dialog.open(ViewEditComponent, {
      height: '600px',
      width: '600px',
      data: {
        inputFields: viewEditData,
        fileInputField: true,
        buttons: [
          { name: "Update", type: "submit", color:"primary" },
          { name: "Cancel", type: "submit", color:"warn" },
      ],
        title: `${row["name"].toUpperCase()} Grant Details`
      }
    });
  
    dialogRef.afterClosed().subscribe(() => {
      this.getGrants();
    })

  }

  deleteData(data){

    let dialogRef = this.dialog.open(ConfirmModalComponent, {
      height: '200px',
      width: '600px',
      data: {
        message: "Are you sure you want to delete this grant?",
        rowData: data
      }
    });

      
    dialogRef.afterClosed().subscribe(() => {
      this.getGrants();
    })
  }

}
