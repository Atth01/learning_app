import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ApiserviceService } from '../apiservice.service';
import { ViewDidEnter, ToastController, NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-blok',
  templateUrl: './blok.page.html',
  styleUrls: ['./blok.page.scss'],
})
export class BlokPage implements ViewDidEnter {
  public blokData: any;
  public searchNIK: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private storage: Storage,
    private navCtrl: NavController,
    private _apiService: ApiserviceService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {
    this.getBlokData();
  }

  ionViewDidEnter() {
    // Mendapatkan parameter 'kd' dari URL
    const kd = this.activatedRoute.snapshot.paramMap.get('kd');
    // Jika perlu mendapatkan atau menyimpan data di penyimpanan lokal
    const storedData = this.storage.get('some_key');
    // Panggil fungsi untuk mendapatkan data blok
    this.getBlokData();
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
      this.blokData = this.blokData.filter((blokData: any) =>
        blokData.no_blok.includes(this.searchNIK)
      );

      if (this.blokData.length > 0) {
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
        this.getBlokData();
      }
    } else {
      // Jika searchNIK kosong, kembalikan ke semua data
      this.getBlokData();
    }
  }

  async getBlokData() {
    // Jika perlu menginisialisasi penyimpanan
    await this.storage.create();

    this._apiService.getBlok().then((res: any) => {
      if (res.msg == 'ok') {
        this.blokData = res.data;
      } else if (res.msg == 'notFound') {
        this.presentToast(
          'Belum ada blok!',
          'warning',
          'alert-circle-outline'
        );
      } else if (res.msg == 'err') {
        this.presentToast(
          'Terjadi kesalahan',
          'danger',
          'alert-circle-outline'
        );
      }
    });
  }
  async confirmDelete(kd_blok: string) {
    const alert = await this.alertCtrl.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this information?',
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
            this.delete_Blok(kd_blok);
          },
        },
      ],
    });

    await alert.present();
  }

  async delete_Blok(kd_blok: string) {
    try {
      const res = await this._apiService.delete_Blok(kd_blok);

      if (res.msg === 'ok') {
        this.presentToast('Data berhasil dihapus!', 'success', 'checkmark-circle-outline');
        this.getBlokData(); // Refresh data setelah penghapusan
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
  edit(kd_blok: string) {
    console.log('kd_blok:', kd_blok);

    if (kd_blok !== undefined && kd_blok !== null && kd_blok.trim() !== '') {
      this.navCtrl.navigateRoot('/updateblok?kd_blok=' + kd_blok);
    } else {
      this.presentToast('Invalid kd value', 'danger', 'alert-circle-outline');
    }
  }

  // Contoh fungsi untuk berpindah halaman jika diperlukan
  goToOtherPage() {
    this.navCtrl.navigateForward('/other-page');
  }
}
