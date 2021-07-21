import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit, NgZone } from '@angular/core';

import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from "@angular/forms";
import { RemoteServiceService } from './../remote-service.service';
import { NavController,ToastController,LoadingController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login-pemilih',
  templateUrl: './login-pemilih.page.html',
  styleUrls: ['./login-pemilih.page.scss'],
})
export class LoginPemilihPage implements OnInit {

  public datepipe: DatePipe
  loginPemilihForm: FormGroup;
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
    private authService: AuthenticationService
  ) {
    this.loginPemilihForm = this.formBuilder.group({
      nik: [''],
      password: ['']
    });
  }
  ngOnInit() {
  }

  async onSubmit() {
    if (!this.loginPemilihForm.valid) {
      console.log(this.loginPemilihForm.value);
      this.presentToast("Isi Form","danger");
      return false;
    } else {
      const loading = await this.loadingController.create({
        message: 'Loading'
      });
      await loading.present(); 
      this.remoteServiceService.loginPemilih(this.loginPemilihForm.value.nik,this.loginPemilihForm.value.password).subscribe((response) => {
        this.zone.run(() => {
          let json = JSON.parse(JSON.stringify(response));
          console.log(json);
          if(json.status == true){
            this.storage.set('session_storage', json);
            this.authService.login();
            this.router.navigate(['/home-pemilih']);
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

  daftar(){
    this.router.navigate(['/daftar-pemilih']);
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
