import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/authService';

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
    private router: Router,
    private authenticator: AuthService,
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
    this.invalid = false;

    this.authenticator.login(this.f['username'].value, this.f['password'].value).subscribe(
      respose => {
        // Get the response token.
        const token = respose.token;

        // Set the Authentication-Token.
        this.authenticator.setAuthToken(token);

        // Succesfull -> Navigate to dashbaord.
        this.router.navigate(['/dashboard']);
      },
      error => {
        this.invalid = true;
        console.log(error)
      }
    )
  }
}
