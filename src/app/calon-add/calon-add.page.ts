import { Component, OnInit, NgZone } from '@angular/core';

import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from "@angular/forms";
import { RemoteServiceService } from './../remote-service.service';
import { NavController,ToastController,LoadingController,ActionSheetController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { Storage } from '@ionic/storage';
import { Base64 } from '@ionic-native/base64/ngx';
import { CameraOptions, CameraPopoverOptions, Camera } from '@ionic-native/camera';

@Component({
  selector: 'app-calon-add',
  templateUrl: './calon-add.page.html',
  styleUrls: ['./calon-add.page.scss'],
})
export class CalonAddPage implements OnInit {

  endpoint : string;
  public datepipe: DatePipe
  addCalonForm: FormGroup;
  today : string = "";
  public image: any;

  width : any;
  quality : any;

  HideAddButton : boolean;

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private zone: NgZone,
    private remoteServiceService: RemoteServiceService,
    public navCtrl: NavController,
    public toastController: ToastController,
    public loadingController: LoadingController,
    private storage: Storage,
    private base64: Base64,
    public actionSheetCtrl: ActionSheetController
  ) {
    this.endpoint = remoteServiceService.endpoint;
    this.addCalonForm = this.formBuilder.group({
      nik: [''],
      nama: [''],
      motto: [''],
      alamat: [''],
      jenis_kelamin: [''],
      tempat_lahir: [''],
      tanggal_lahir: [''],
      foto: [''],
    });
  }
  ngOnInit() {
  }

  //Ambil Gambar Dari Kamera
  takePhoto(){
    const popoverOptions: CameraPopoverOptions = {
      x: 0,
      y: 0,
      width: 1080,
      height: 1080,
      arrowDir: Camera.PopoverArrowDirection.ARROW_ANY
    };

    const options: CameraOptions = {
      quality: this.quality,
      destinationType: Camera.DestinationType.DATA_URL,
      encodingType: Camera.EncodingType.JPEG,
      mediaType: Camera.MediaType.PICTURE,
      targetWidth: this.width,
      saveToPhotoAlbum:true,
      allowEdit:false,
      correctOrientation: true,
      popoverOptions: popoverOptions
    }

    Camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let myphoto = 'data:image/jpeg;base64,' + imageData;
      this.image = myphoto;
      ;
      console.log(myphoto)
        this.HideAddButton = true;
    }, (err) => {
      // Handle error
      console.log(err);
    });
  }

  //Hitung Ukuran Gambar
  CountSize(imageData){
    var src = atob(imageData);
    let base64Length = src.length - (src.indexOf(',') + 1);
    let padding = (src.charAt(src.length - 2) === '=') ? 2 : ((src.charAt(src.length - 1) === '=') ? 1 : 0);
    let fileSize = base64Length * 0.75 - padding;

    if(0==fileSize)
      return "0 Bytes";

    var c=1024;
    var d=5||2
    var e=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"];
    var f=Math.floor(Math.log(fileSize)/Math.log(c));

    return parseFloat((fileSize/Math.pow(c,f)).toFixed(d))+" "+e[f];
  }

  //Pilih Ambil Gambar
  async TakeImage(){
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Pilih Gambar',
      buttons: [
        {
          text: 'Kamera',
          handler: () => {
            this.takePhoto();
          }
        },{
          text: 'File Explorer',
          handler: () => {
            this.getImage();
          }
        }
      ]
    });
    await actionSheet.present();
  }

  getImage() {
    const options: CameraOptions = {
      quality: this.quality,
      targetWidth: this.width,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
      mediaType: Camera.MediaType.PICTURE,
      encodingType: Camera.EncodingType.JPEG,
      saveToPhotoAlbum:true,
      allowEdit:true,
      correctOrientation: true
    }
    Camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      imageData
      let myphoto = 'data:image/jpeg;base64,' + imageData;
      this.image = myphoto;
      console.log(myphoto)
      this.HideAddButton = true;

      // console.log("FileSize: " + decoded.length);
    }, (err) => {
      // Handle error
      console.log(err);
    });
  }
  
  fileChanged(event) {
    const files = event.target.files;
    console.log(files);
    const reader = new FileReader();
    reader.onload = () => {
      console.log(reader)
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  async onSubmit() {
    if (!this.addCalonForm.valid) {
      console.log(this.addCalonForm.value);
      this.presentToast("Isi Form","danger");
      return false;
    } else {
      console.log(this.addCalonForm.value);
      const loading = await this.loadingController.create({
        message: 'Loading'
      });
      await loading.present();
      this.remoteServiceService.cekNIKCalon(
        this.addCalonForm.value.nik
        ).subscribe((response) => {
        this.zone.run(() => {
          let json = JSON.parse(JSON.stringify(response));
          console.log(json.status);
          if(json.status == true){
            let filePath: string = "file://"+this.endpoint +"/" +this.addCalonForm.value.foto;
            this.base64.encodeFile(filePath).then((base64File: string) => {
              console.log(base64File);
            }, (err) => {
              console.log(err);
            });
            loading.dismiss();
          }else{
            this.presentToast("NIK Telah Digunakan","danger");
            loading.dismiss();
            return false;
          }
          loading.dismiss();
        })
      });
      let base = this.image.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');

      this.remoteServiceService.addCalon(
        base,
        this.addCalonForm.value.nik,
        this.addCalonForm.value.nama,
        this.addCalonForm.value.motto,
        this.addCalonForm.value.jenis_kelamin,
        this.addCalonForm.value.tanggal_lahir,
        this.addCalonForm.value.tempat_lahir,
        this.addCalonForm.value.alamat,
        )
        .subscribe((response) => {
          this.zone.run(() => {
            // this.addCalonForm.reset();
            console.log(response.toString())
            let json = JSON.parse(JSON.stringify(response));
            console.log(json.status);
            if(json.status == true){
              this.navCtrl.navigateForward('/calon/'+Math.random());
              this.presentToast("Calon Add Berhasil","success");
            }else{
              this.presentToast("Error","danger");
            }
            loading.dismiss();
          })
        });
    }
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

  ionViewWillEnter() {
    var date : any = new Date().toISOString(); // 2016-08-04T07:43:09.222Z

    var year : any= date.split("-")[0];
    var month : any = date.split("-")[1];
    var day : any= ( date.split("-")[2] ).split("T")[0];

    this.today = year+"-"+month+"-"+day;
    (<HTMLInputElement>document.getElementById('tanggal_lahir')).value= this.today;
    console.log(this.today);
    console.log((<HTMLInputElement>document.getElementById('tanggal_lahir')).value)
  }
}
