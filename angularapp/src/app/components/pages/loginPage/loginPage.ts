import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';


import { environment } from '../../../../environments/environment';
import {
  AccountService,
  //AlertService
} from '../../../services/account';

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
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private http: HttpClient
    //private alertService: AlertService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['username', Validators.required],
      password: ['password', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    //this.alertService.clear();

    // stop here if form is invalid
    //if (this.form.invalid) {
    //  return;
    //}

    //console.log("loginPage");
    this.loading = true;
    this.http.get(`${environment.apiUrl}/LoginData?userName=${this.f['username'].value}&password=${this.f['password'].value}`)
      .subscribe((result) => {
        //console.log("inside");
        if (result == true) {
          const returnUrl = this.route.snapshot.queryParams['dashboard'] || '/dashboard';
          console.log(returnUrl);
          this.router.navigate(returnUrl);
          console.log("route changed");
          this.invalid = false;
          return;
        }

        this.loading = false;
        this.invalid = true;
      },
        () => {
          this.loading = false;
          console.log("error");
        });
  }
}
