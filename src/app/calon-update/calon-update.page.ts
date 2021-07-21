import { Component, OnInit, NgZone } from '@angular/core';

import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";
import { RemoteServiceService, Calon } from './../remote-service.service';
import { NavController,ToastController,LoadingController,ActionSheetController } from '@ionic/angular';
import { CameraOptions, CameraPopoverOptions, Camera } from '@ionic-native/camera';

@Component({
  selector: 'app-calon-update',
  templateUrl: './calon-update.page.html',
  styleUrls: ['./calon-update.page.scss'],
})
export class CalonUpdatePage implements OnInit {

  updateCalonForm: FormGroup;
  id: any;
  foto: any;
  endpoint: string;
  jenis_kelamin: any;
  public image: any;

  width : any;
  quality : any;
  constructor(
    private remoteServiceService: RemoteServiceService,
    private activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    private router: Router,
    public navCtrl: NavController,
    public loadingController: LoadingController,
    public actionSheetCtrl: ActionSheetController,
    public toastController: ToastController,
    private zone: NgZone,
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.fetchCalon(this.id);
    this.updateCalonForm = this.formBuilder.group({
      nik: [''],
      nama: [''],
      motto: [''],
      alamat: [''],
      jenis_kelamin: [''],
      tempat_lahir: [''],
      tanggal_lahir: [''],
    })
  }

  async fetchCalon(id) {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present(); 
    this.remoteServiceService.getCalonID(id).subscribe((data) => {
      this.updateCalonForm.setValue({
        nik: data['nik'],
        nama: data['nama'],
        motto: data['motto'],
        alamat: data['alamat'],
        jenis_kelamin: data['jenis_kelamin'],
        tempat_lahir: data['tempat_lahir'],
        tanggal_lahir: data['tanggal_lahir'],
      });
      this.foto = data['foto'];
      this.jenis_kelamin = data["jenis_kelamin"];
      loading.dismiss();
    });
  }

  async ionViewWillEnter() {
    this.endpoint = this.remoteServiceService.endpoint;
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

      // console.log("FileSize: " + decoded.length);
    }, (err) => {
      // Handle error
      console.log(err);
    });
  }

  async onSubmit() {
    if (!this.updateCalonForm.valid) {
      console.log(this.updateCalonForm.value);
      this.presentToast("Isi Form","danger");
      return false;
    } else {
      console.log(this.updateCalonForm.value);
      const loading = await this.loadingController.create({
        message: 'Loading'
      });
      await loading.present();
      
      let base = '';
      if(this.image != null){
        base = this.image.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
      }

      this.remoteServiceService.updateCalon(
        this.id,
        base,
        this.updateCalonForm.value.nik,
        this.updateCalonForm.value.nama,
        this.updateCalonForm.value.motto,
        this.updateCalonForm.value.jenis_kelamin,
        this.updateCalonForm.value.tanggal_lahir,
        this.updateCalonForm.value.tempat_lahir,
        this.updateCalonForm.value.alamat,
        )
        .subscribe((response) => {
          this.zone.run(() => {
            // this.addCalonForm.reset();
            console.log(response.toString())
            let json = JSON.parse(JSON.stringify(response));
            console.log(json.status);
            if(json.status == true){
              this.navCtrl.navigateForward('/calon/'+Math.random());
              this.presentToast("Calon Update Berhasil","success");
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
}
