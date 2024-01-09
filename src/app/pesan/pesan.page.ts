import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ApiserviceService } from '../apiservice.service';
import { ViewDidEnter, ToastController, NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-pesan',
  templateUrl: './pesan.page.html',
  styleUrls: ['./pesan.page.scss'],
})
export class PesanPage implements ViewDidEnter {
  public pesan!: string;
  isMenuOpen = false;
  infoPesan: any;
  public searchNIK: string = '';
  public Data: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private storage: Storage,
    private navCtrl: NavController,
    private _apiService: ApiserviceService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) { 
    this.getPesan();
  }

  ionViewDidEnter() {
    this.getPesan();
  }
  async presentToast(msg: any, color: any, icon: any) {
    const toast = await this.toastCtrl.create({
      icon: icon,
      message: msg,
      duration: 1500,
      color: color,
      position: 'top',
    });
    toast.present();
  }
  searchByNIK(): void {
    if (this.searchNIK.trim() !== '') {
      this.infoPesan = this.infoPesan.filter((infoPesan: any) =>
        infoPesan.kd_pesan.includes(this.searchNIK)
      );

      if (this.infoPesan.length > 0) {
        this.presentToast(
          'Data berhasil ditemukan!',
          'success',
          'checkmark-circle-outline'
        );
      } else {
        this.presentToast(
          'Data tidak ditemukan.',
          'warning',
          'alert-circle-outline'
        );
        // Jika data tidak ditemukan, tampilkan kembali semua data
        this.getPesan();
      }
    } else {
      // Jika searchNIK kosong, kembalikan ke semua data
      this.getPesan();
    }
  }
  handleRefresh(event: any) {
    setTimeout(() => {
      this.getPesan();
      event.target.complete();
    }, 2000);
  }
  async getPesan() {
    try {
      await this.storage.create();
      const res = await this._apiService.getPesan();

      if (res.msg === 'ok') {
        this.infoPesan = res.data;
      } else if (res.msg === 'notFound') {
        this.presentToast('Belum ada info !', 'warning', 'alert-circle-outline');
      } else {
        this.presentToast('Something went wrong', 'danger', 'alert-circle-outline');
      }
    } catch (err: any) {
      console.error('Error in getInfo:', err);
      this.presentToast('Error fetching data', 'danger', 'alert-circle-outline');
    }
  }
  edit(kd_pesan: string) {
    console.log('kd_pesan:', kd_pesan);

    if (kd_pesan !== undefined && kd_pesan !== null && kd_pesan.trim() !== '') {
      this.navCtrl.navigateRoot('/updatepesan?kd_pesan=' + kd_pesan);
    } else {
      this.presentToast('Invalid kd value', 'danger', 'alert-circle-outline');
    }
  }
  async confirmDelete(kd_pesan: string) {
    const alert = await this.alertCtrl.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this message?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (cancel) => {
            console.log('Delete canceled');
          },
        },
        {
          text: 'Delete',
          handler: () => {
            this.delete_Pesan(kd_pesan);
          },
        },
      ],
    });

    await alert.present();
  }

  async delete_Pesan(kd_pesan: string) {
    try {
      const res = await this._apiService.delete_Pesan(kd_pesan);

      if (res.msg === 'ok') {
        this.presentToast('Data berhasil dihapus!', 'success', 'checkmark-circle-outline');
        this.getPesan(); // Refresh data setelah penghapusan
      } else if (res.msg === 'notOk') {
        this.presentToast('Data gagal dihapus!', 'danger', 'alert-circle-outline');
      } else {
        this.presentToast('Something went wrong!', 'danger', 'alert-circle-outline');
      }
    } catch (err: any) {
      console.error('Error in deleteInfo:', err);
      this.presentToast('Error: ' + err.err, 'danger', 'alert-circle-outline');
    }
  }
  
  
  
}
