import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../auth.service';

//TODO: Below line need to be moved to a constant file, regex taken from http://emailregex.com/
// eslint-disable-next-line max-len
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService, private alertController: AlertController) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['buyer-challenge@caronsale.de', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
      password: ['Test123.', [Validators.required]],
    });
  }

  async login() {
    try {
      if(this.loginForm.valid){
        this.auth.signIn({
          email: this.loginForm.value.email,
          password: this.loginForm.value.password,
          meta: 'mobileapp'
        }).subscribe(async response => {
          await this.router.navigate(['home']);
        }, async error => {
          debugger;
          const alert = await this.alertController.create({
            header: 'Login Failed',
            subHeader: error.message,
            buttons: ['OK']
          });
          await alert.present();
        })
        
      }
    } catch (error) {
        console.log('error signing in', error);
    }
  }

}
