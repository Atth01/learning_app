// addinfo.page.ts
import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-addinfo',
  templateUrl: './addinfo.page.html',
  styleUrls: ['./addinfo.page.scss'],
})
export class AddinfoPage implements OnInit {
  newInfoData: any = {};
  public judul_info: string = '';
  public informasi: string = '';
  public tgl_info: string = '';

  constructor(
    private _apiService: ApiserviceService,
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
  }

  async addNewInfo() {
    try {
      const formData = new FormData();
      formData.append('judul_info', this.judul_info);
      formData.append('informasi', this.informasi);
      formData.append('tgl_info', this.tgl_info);
      const response = await this._apiService.createInfo(formData);

      if (response.msg === 'ok') {
        // Data added successfully, you can navigate to another page or show a success message
        this.presentToast('Info added successfully', 'success');
        // For example, navigate back to the previous page
        this.navCtrl.navigateForward('/info');
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

  async presentToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'top'
    });
    toast.present();
  }
  goToInfoPage() {
    // Ganti 'info' dengan path yang sesuai untuk halaman info Anda
    this.navCtrl.navigateForward('/info');
  }
}
