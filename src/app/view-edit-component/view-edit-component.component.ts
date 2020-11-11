import { Component, Inject, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import { GrantService } from '../services/grant-service.service';

interface DialogData {
  inputFields: Array<any>,
  buttons: Array<string>,
  title: string
}

@Component({
  selector: 'app-view-edit-component',
  templateUrl: './view-edit-component.component.html',
  styleUrls: ['./view-edit-component.component.css']
})
export class ViewEditComponent implements OnInit {
  editData: boolean =  false;

  @ViewChild("linkRef") nameField: ElementRef;

  constructor(public dialogRef: MatDialogRef<ViewEditComponent>,

    @Inject(MAT_DIALOG_DATA) public data: DialogData, 
    private toastr: ToastrService, private el: ElementRef, private grantService: GrantService) { }

  ngOnInit(): void {
  }


  submit(data){
    // submit data

    let name = this.data.inputFields.filter(obj => obj["className"] == "name");

    let id = this.data.inputFields.filter(obj => obj["className"] == "id");

    if(name[0].value === ""){
      
      this.toastr.error("You have to provide the grant name", 'Error', {
        progressBar: true,
        progressAnimation: 'decreasing'
      })

    } else {

      this.toggleReadOnly();

      let payload ={
        name: name[0].value
      };

      this.grantService.editGrant(payload, id[0].value).subscribe((response)=>{

        if(response){
          this.toastr.success("Grant successfully updated", 'Success', {
            progressBar: true,
            progressAnimation: 'decreasing'
          });

          // we should set the buttons back to not being seen
          this.editData = false;

        } else {

          this.toastr.error("Something went wrong please try again", 'Error', {
            progressBar: true,
            progressAnimation: 'decreasing'
          });

        }

      }, error=>{
        this.toastr.error("Something went wrong please try again", 'Error', {
          progressBar: true,
          progressAnimation: 'decreasing'
        });

      })
    }
  }

  // enable editing
  showEditButtons(){
    console.log("I am here..");

    // show the submit and cancel buttons
    this.editData = true;

    this.toggleReadOnly();

    this.nameField.nativeElement.focus();

  }

  toggleReadOnly(){
    this.data.inputFields.forEach((obj)=>{
      if(obj["className"] == "name"){
        obj["readOnly"]  ? obj["readOnly"] =false : obj["readOnly"] =true;
      }
    });
  }


}
