import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";
import { AsalReviewAPIService } from "src/app/services/asal-review-api.service";
import { $BroadcastManagerService } from "src/app/services/broadcast-manager.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  accountForm: any;

  constructor(
    private asalReviewAPI: AsalReviewAPIService,
    private snackBar: MatSnackBar,
    private router: Router,
    private eventBroadcastService: $BroadcastManagerService
  ) {}

  ngOnInit() {
    const fb = new FormBuilder();
    this.accountForm = fb.group({
      email: [, [Validators.required]],
      password: [, [Validators.required]],
    });
  }

  onSubmit() {
    if (this.accountForm.invalid) {
      return;
    }

    this.asalReviewAPI.login(this.accountForm.value).subscribe(
      (r) => {
        console.log("r", r);
        if (r.status === 200) {
          sessionStorage.setItem("userId", r.user.id);
          sessionStorage.setItem("email", r.user.email);
          this.getUserDetail(r.user.id);
          this.eventBroadcastService.emit({ name: "LOGIN_CHECK" });
          this.snackBar.open("Login Success", "", { duration: 5000 });
          this.router.navigateByUrl("/");
        } else {
          this.snackBar.open(r.message, "", { duration: 5000 });
        }
      },
      (err) => {
        console.log("err", err);
        this.snackBar.open(err.error.message, "", { duration: 5000 });
      }
    );
  }

  getUserDetail(id) {
    this.asalReviewAPI.getUserDetails(id).subscribe(
      (r) => {
        console.log("r", r);
      },
      (err) => {
        console.log("err", err);
      }
    );
  }

  createAccount() {
    this.router.navigateByUrl("/signUp");
  }

  forgotPassword() {}
}
