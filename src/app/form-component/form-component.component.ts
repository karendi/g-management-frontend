import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { GrantService } from '../services/grant-service.service';

import {} from '../services/grant-service.service';

interface DialogData {
  inputFields: Array<string>,
  fileInputFields?: Array<string>,
  buttons: Array<string>,
  title: string
}

@Component({
  selector: 'app-form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.css']
})
export class FormComponent implements OnInit {

  processing: boolean = false;
  grantForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, 
    private formBuilder: FormBuilder, private toastr: ToastrService, private grantService: GrantService)
    {
      this.grantForm = formBuilder.group({
        grantName: ['', Validators.compose([Validators.required])],
        grantStatus: ['', Validators.compose([Validators.required])],
        grantor: ['', Validators.compose([Validators.required])],
        location: ['', Validators.compose([Validators.required])],
        description: ['', Validators.compose([Validators.required])],
        amount: ['', Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])],

      })

    }

  ngOnInit(): void {
  }

  get f() { return this.grantForm.controls; }

  submit(){

    // set processing to true
    this.processing = true;

    // check that the grant form is valid

    if(this.grantForm.status == "INVALID"){
      this.processing = false;
      this.toastr.error("The details provided are not correct", 'Error', {
        progressBar: true,
        progressAnimation: 'decreasing'
      })

    } else {

      // get grant details
      
      let name = this.f.grantName.value;
      let grantor = this.f.grantor.value;
      let status = this.f.grantStatus.value;
      let location = this.f.location.value;
      let description = this.f.description.value;
      let amount = this.f.amount.value;
  
  
      let grantObj = {
        name,
        grantor,
        status,
        location,
        description,
        amount
      }
  
      this.grantService.createGrant(grantObj).subscribe(
        (response)=>{

          //set processing to false
          this.processing = false;

          if(!response){
            this.toastr.error("Something went wrong please try again", 'Error', {
              progressBar: true,
              progressAnimation: 'decreasing'
            })
          }

          this.toastr.success("Grant successfully created", 'Success', {
            progressBar: true,
            progressAnimation: 'decreasing'
          })
        
        },
        error => {
          // set processing to false
          this.processing = false;
  
          if(error.status == 503){
            this.toastr.error(error.error.message, 'Error', {
              progressBar: true,
              progressAnimation: 'decreasing'
            })
          } else if (error.status == 422){
            this.toastr.error("Duplicate name provided for the grant", 'Error', {
              progressBar: true,
              progressAnimation: 'decreasing'
            })
          }
        });


    }

  



  }

}
