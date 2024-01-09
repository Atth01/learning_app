import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  LoadingController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-addpesan',
  templateUrl: './addpesan.page.html',
  styleUrls: ['./addpesan.page.scss'],
})
export class AddpesanPage implements OnInit {
  newInfoData: any = {};

  public kd_penduduk: string = '';
  public pesan: string = '';
  public tgl_pesan: string = '';

  constructor(
    private _apiService: ApiserviceService,
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) { }
  async addNewPesan() {
    try {
      const formData = new FormData();
      formData.append('kd_pnddk', this.kd_penduduk);
      formData.append('pesan', this.pesan);
      formData.append('tgl_pesan', this.tgl_pesan);
      const response = await this._apiService.createPesan(formData);

      if (response.msg === 'ok') {
        // Data added successfully, you can navigate to another page or show a success message
        this.presentToast('Pesan added successfully', 'success');
        // For example, navigate back to the previous page
        this.navCtrl.navigateForward('/pesan');
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
  goToPesanPage() {
    // Ganti 'info' dengan path yang sesuai untuk halaman info Anda
    this.navCtrl.navigateForward('/pesan');
  }

  ngOnInit() {
  }

}
