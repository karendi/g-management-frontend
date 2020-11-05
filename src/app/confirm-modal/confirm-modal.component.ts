import { Component, Inject, OnInit, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import {GrantService} from '../services/grant-service.service';

interface DialogData {
  message: String,
  buttons: Array<string>,
  rowData: any,
}

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, 
    private el: ElementRef, private toastr: ToastrService, private grantService: GrantService) { }

  ngOnInit(): void {
  }

  deleteGrant(){

    let grantId = this.data.rowData.id;

    this.grantService.deleteGrant(grantId).subscribe((response)=>{

      if(!response){
        this.toastr.error("Something went wrong please try again", 'Error', {
          progressBar: true,
          progressAnimation: 'decreasing'
        })

      } else {
        this.toastr.success("Grant successfully deleted", 'Success', {
          progressBar: true,
          progressAnimation: 'decreasing'
        })

      }
    }, 
    error => {
      this.toastr.error("Something went wrong please try again", 'Error', {
        progressBar: true,
        progressAnimation: 'decreasing'
      })

    })
  }

}
