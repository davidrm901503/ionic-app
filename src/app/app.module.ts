import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
//paginas
import { HomePage } from '../pages/home/home';
import { PopoverPage } from '../pages/pop-over/pop-over';
import { CategoriesPage } from '../pages/categories/categories';
import { SubcategoriesPage } from '../pages/subcategories/subcategories';
import { ServicesPage } from '../pages/services/services';
import { LoginPage  } from '../pages/login/login';
import { SignupPage  } from '../pages/signup/signup';
import { FavoritesPage  } from '../pages/favorites/favorites';
import { BusquedaPage  } from '../pages/busqueda/busqueda';
import { MyservicesPage  } from '../pages/myservices/myservices';
import { ServicePage  } from '../pages/service/service';

// Componentes
import {AppHeaderComponent} from '../components/app-header/app-header'

//Servicios
import { SubCategoryProvider } from '../providers/sub-category/sub-category';
import { CategoryProvider } from '../providers/category/category.service';
import { ServiceProvider } from '../providers/service/service.service';
import { AuthProvider } from '../providers/auth/auth';
import { Create1Page } from "../pages/create1/create1";

// native
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { CallNumber } from "@ionic-native/call-number";
// import { FilePath } from '@ionic-native/file-path';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PopoverPage,
    CategoriesPage,
    SubcategoriesPage,
    AppHeaderComponent,
    ServicesPage,
    LoginPage,
    SignupPage,
    FavoritesPage,
    BusquedaPage,
    MyservicesPage,
    ServicePage,
    Create1Page
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PopoverPage,
    CategoriesPage,
    SubcategoriesPage,
    AppHeaderComponent,
    ServicesPage,
    LoginPage,
    SignupPage,
    FavoritesPage,
    BusquedaPage,
    MyservicesPage,
    ServicePage,
    Create1Page
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FileTransfer,
    FileTransferObject,
    File,
    Camera,
    CallNumber,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SubCategoryProvider,
    CategoryProvider,
    ServiceProvider,
    AuthProvider
    ]
})
export class AppModule {}
