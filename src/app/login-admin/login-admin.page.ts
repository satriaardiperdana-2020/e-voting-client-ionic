import { Component, OnInit, NgZone } from '@angular/core';

import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from "@angular/forms";
import { RemoteServiceService } from './../remote-service.service';
import { NavController,ToastController,LoadingController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { Storage } from '@ionic/storage';
import { AuthAdminService } from '../services/auth-admin.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.page.html',
  styleUrls: ['./login-admin.page.scss'],
})
export class LoginAdminPage implements OnInit {

  public datepipe: DatePipe
  loginAdminForm: FormGroup;
  today : string = "";

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private zone: NgZone,
    private remoteServiceService: RemoteServiceService,
    public navCtrl: NavController,
    public toastController: ToastController,
    public loadingController: LoadingController,
    private storage: Storage,
    private authAdminService: AuthAdminService
  ) {
    this.loginAdminForm = this.formBuilder.group({
      username: [''],
      password: ['']
    });
  }
  ngOnInit() {
  }
  async onSubmit() {
    if (!this.loginAdminForm.valid) {
      console.log(this.loginAdminForm.value);
      this.presentToast("Isi Form","danger");
      return false;
    } else {
      const loading = await this.loadingController.create({
        message: 'Loading'
      });
      await loading.present(); 
      this.remoteServiceService.loginAdmin(this.loginAdminForm.value.username,this.loginAdminForm.value.password).subscribe((response) => {
        this.zone.run(() => {
          let json = JSON.parse(JSON.stringify(response));
          console.log(json.status);
          if(json.status == true){
            this.storage.set('session_storage', json);
            this.authAdminService.login();
            this.router.navigate(['/home-admin']);
            this.presentToast("Login Berhasil","success");
          }else{
            this.presentToast("Username Atau Password Salah","danger");
          }
          loading.dismiss();
        })
      });
      
    }
  }

  kembali(){
    this.router.navigate(['/home']);
  }

  async presentToast(Message,color) {
    const toast = await this.toastController.create({
      message: Message,
      duration: 2500,
      position: "bottom",
      color: color
    });
    toast.present();
  }
}
