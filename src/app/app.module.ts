import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RemoteServiceService } from './remote-service.service';
import { HttpClientModule } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Base64 } from '@ionic-native/base64/ngx';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,IonicStorageModule.forRoot()],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    RemoteServiceService,Storage,Base64],
  bootstrap: [AppComponent],
})
export class AppModule {}
