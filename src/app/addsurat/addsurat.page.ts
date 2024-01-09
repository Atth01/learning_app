import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-addsurat',
  templateUrl: './addsurat.page.html',
  styleUrls: ['./addsurat.page.scss'],
})
export class AddsuratPage implements OnInit {
  newInfoData: any = {};
  public kd_penduduk: string = '';
  public nomor_surat: string = '';
  public keterangan: string = '';
  public tanggal_surat: any;


  constructor(
    private _apiService: ApiserviceService,
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) { }

  async addNewSurat() {
    try {
      const formData = new FormData();
      formData.append('kd_penduduk', this.kd_penduduk);
      formData.append('nomor_surat', this.nomor_surat);
      formData.append('keterangan', this.keterangan);
      formData.append('tanggal_surat', this.tanggal_surat);
      const response = await this._apiService.createSurat(formData);

      if (response.msg === 'ok') {
        // Data added successfully, you can navigate to another page or show a success message
        this.presentToast('Info added successfully', 'success');
        // For example, navigate back to the previous page
        this.navCtrl.navigateForward('/suratkeluar');
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
    this.navCtrl.navigateForward('/suratkeluar');
  }

  ngOnInit() {
  }

}
