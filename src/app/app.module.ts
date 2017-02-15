import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SocketService} from './socket.service';
import { DatamodelService} from './datamodel.service';
import { DataService} from './data.service';
import { MapObjectService} from './map-object.service';
import { AppComponent } from './app.component';
import { OperationComponent } from './operation/operation.component';
import { LeftbarComponent } from './leftbar/leftbar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { BodyComponent } from './body/body.component';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [
    AppComponent,
    OperationComponent,
    LeftbarComponent,
    TopbarComponent,
    BodyComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [MapObjectService, SocketService, DatamodelService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
