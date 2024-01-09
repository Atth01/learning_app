import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-addpengeluaran',
  templateUrl: './addpengeluaran.page.html',
  styleUrls: ['./addpengeluaran.page.scss'],
})
export class AddpengeluaranPage implements OnInit {
  newPengeluaranData: any = {};
  public kd_pengeluaran: string = '';
  public nama_pengeluaran: string = '';

  constructor(
    private _apiService: ApiserviceService,
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) { }
  async addNewPengeluaran() {
    try {
      const formData = new FormData();
      formData.append('nama_pengeluaran', this.nama_pengeluaran);
      const response = await this._apiService.createPengeluaran(formData);

      if (response.msg === 'ok') {
        // Data added successfully, you can navigate to another page or show a success message
        this.presentToast('Info added successfully', 'success');
        // For example, navigate back to the previous page
        this.navCtrl.navigateForward('/pengeluaran');
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
  goToPengeluaranPage() {
    // Ganti 'info' dengan path yang sesuai untuk halaman info Anda
    this.navCtrl.navigateForward('/pengeluaran');
  }

  ngOnInit() {
  }

}
