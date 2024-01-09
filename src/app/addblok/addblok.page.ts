import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-addblok',
  templateUrl: './addblok.page.html',
  styleUrls: ['./addblok.page.scss'],
})
export class AddblokPage implements OnInit {
  newInfoData: any = {};
  public kd_blok: string = '';
  public nama_blok: string = '';
  public no_blok: string = '';
  public status: string = '';

  constructor(
    private _apiService: ApiserviceService,
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) { }
  async presentToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'top'
    });
    toast.present();
  }
  async addNewBlok() {
    try {
      const formData = new FormData();
      // formData.append('kd_blok', this.kd_blok);
      formData.append('nama_blok', this.nama_blok);
      formData.append('no_blok', this.no_blok);
      // formData.append('status', this.status);
      const response = await this._apiService.createBlok(formData);

      if (response.msg === 'ok') {
        // Data added successfully, you can navigate to another page or show a success message
        this.presentToast('Info added successfully', 'success');
        // For example, navigate back to the previous page
        this.navCtrl.navigateForward('/blok');
      } else if (response.msg === 'notOk') {
        // Handle the case when data addition fails
        this.presentToast('Failed to add info', 'danger');
      } else {
        // Handle other error cases
        this.presentToast('Something went wrong', 'danger');
      }
    } catch (err: any) {
      console.log(err);
      // Handle unexpected errors
      this.presentToast('An error occurred', 'danger');
    }
  }
  goToBlokPage() {
    // Ganti 'info' dengan path yang sesuai untuk halaman info Anda
    this.navCtrl.navigateForward('/blok');
  }
  ngOnInit() {
  }
  

}
