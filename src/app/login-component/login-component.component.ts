import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  processing: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router,
    private authService: AuthService, private toastr: ToastrService) {
    this.loginForm = formBuilder.group({
      userEmail: ['', Validators.compose([Validators.required])],
      userPassword: ['', Validators.compose([Validators.required])]
    })
   }

  ngOnInit(): void {
  }

  get f() { return this.loginForm.controls; }

  loginUser(){
    let email: String = this.f.userEmail.value.toLowerCase();
    let password: String = this.f.userPassword.value;

    if(email !== "" && password != ""){

      this.processing = true;

      let payload = {
        email,
        password
      }

      // login the user
      this.authService.login(payload).subscribe(response=>{

        // set processing to false
        this.processing = false;

        // set the token and user name
        localStorage.setItem('token', response.token);
        localStorage.setItem('userName', response.userName);

        // we should redirect to home
        this.router.navigate(['/home']);

      },
      error =>{
        
         // set processing to false
         this.processing = false;

        if(error.status == 422){

          this.toastr.error(error.error.errors.email, 'Error', {
            progressBar: true,
            progressAnimation: 'decreasing'
          })
          
        } else if (error.status == 401){

          this.toastr.error(error.error.message, 'Error', {
            progressBar: true,
            progressAnimation: 'decreasing'
          })

        } else {

          this.toastr.error("Something went wrong please try again", 'Error', {
            progressBar: true,
            progressAnimation: 'decreasing'
          })

        }
      })

    }
  }

}
