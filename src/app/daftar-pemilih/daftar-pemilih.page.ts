import { Component, OnInit, NgZone } from '@angular/core';

import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from "@angular/forms";
import { RemoteServiceService } from './../remote-service.service';
import { NavController,ToastController,LoadingController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-daftar-pemilih',
  templateUrl: './daftar-pemilih.page.html',
  styleUrls: ['./daftar-pemilih.page.scss'],
})
export class DaftarPemilihPage implements OnInit {

  public datepipe: DatePipe
  daftarPemilihForm: FormGroup;
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
  ) {
    this.daftarPemilihForm = this.formBuilder.group({
      nik: [''],
      nama: [''],
      password: [''],
      konfirmasi_password: [''],
    });
  }

  async onSubmit() {
    if (!this.daftarPemilihForm.valid) {
      console.log(this.daftarPemilihForm.value);
      this.presentToast("Isi Form","danger");
      return false;
    } else {
      if(this.daftarPemilihForm.value.password != this.daftarPemilihForm.value.konfirmasi_password){
        this.presentToast("Konfirmasi Password Tidak Sama","danger");
        return false;
      }else{
        const loading = await this.loadingController.create({
          message: 'Loading'
        });
        await loading.present();
        
        this.remoteServiceService.cekNIK(
          this.daftarPemilihForm.value.nik
          ).subscribe((response) => {
          this.zone.run(() => {
            let json = JSON.parse(JSON.stringify(response));
            console.log(json.status);
            if(json.status == true){
              this.remoteServiceService.daftarPemilih(
                this.daftarPemilihForm.value.nik,
                this.daftarPemilihForm.value.nama,
                this.daftarPemilihForm.value.password
                ).subscribe((response) => {
                this.zone.run(() => {
                  let json = JSON.parse(JSON.stringify(response));
                  console.log(json.status);
                  if(json.status == true){
                    this.router.navigate(['/login-pemilih']);
                    this.presentToast("Daftar Berhasil","success");
                  }else{
                    this.presentToast("Error","danger");
                  }
                  loading.dismiss();
                })
              });
            }else{
              this.presentToast("NIK Telah Digunakan","danger");
              loading.dismiss();
              return false;
            }
            loading.dismiss();
          })
        });
        
      }
      
    }
  }

  ngOnInit() {
  }

  kembali(){
    this.router.navigate(['/login-pemilih']);
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
