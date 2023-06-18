import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';


import { environment } from '../../../../environments/environment';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-root'
  , templateUrl: 'loginPage.html'
  , styleUrls: ['./loginPage.css']
})
export class LoginPage implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;
  invalid = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router : Router
    ) { }

  ngOnInit() {
    if (this.authService.isLoggedIn()){
      this.router.navigate(['/dashboard']);
      return;
    }

    this.form = this.formBuilder.group({
      username: ['username', Validators.required],
      password: ['password', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.authService.login(this.f['username'].value, this.f['password'].value)
      .subscribe(
        response => {
          this.authService.saveToken(response.token);          
          this.router.navigate(['/dashboard']);
        },
        error => {
          console.log(error);
        }
      );
  }
}
