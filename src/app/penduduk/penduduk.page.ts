import { Component } from '@angular/core';
import { ViewDidEnter, ToastController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ApiserviceService } from '../apiservice.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-penduduk',
  templateUrl: 'penduduk.page.html',
  styleUrls: ['penduduk.page.scss'],
})
export class PendudukPage implements ViewDidEnter {
  public Data: any;
  isReadOnly = false; // Menentukan properti isReadOnly

  public penduduk: string = '';
  public searchNIK: string = '';

  constructor(
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private storage: Storage,
    private _apiService: ApiserviceService,
    private router: Router,
    private alertController: AlertController
  ) {
    this.getPenduduk();
  }
  ionViewDidEnter() {
    this.getPenduduk();
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
      this.Data = this.Data.filter((penduduk: any) =>
        penduduk.nik.includes(this.searchNIK)
      );

      if (this.Data.length > 0) {
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
        this.getPenduduk();
      }
    } else {
      // Jika searchNIK kosong, kembalikan ke semua data
      this.getPenduduk();
    }
  }

  async getPenduduk() {
    await this.storage.create();
    // Berikan nilai val sesuai kebutuhan
    
    this._apiService.getPenduduk('').then((res: any) => {
      if (res.msg == 'ok') {
        this.Data = res.data;
        this.penduduk = String(res.data[0].penduduk);
      } else if (res.msg == 'err') {
        this.presentToast(
          'Terjadi kesalahan: ' + String(res.err),
          'danger',
          'alert-circle-outline'
        );
      }
    });
  }
  handleRefresh(event: any) {
    setTimeout(() => {
      this.getPenduduk();
      event.target.complete();
    }, 2000);
  }

  async logout() {
    this.storage.remove('isLoggedIn');
    localStorage.removeItem('isLoggedIn');
    this.navCtrl.navigateRoot(['/login']);
  }

  update(nik: string) {
    console.log('nik:', nik);

    if (nik && nik.trim() !== '') {
      this.navCtrl.navigateRoot('/updatependuduk?nik=' + nik);
    } else {
      this.presentToast('Nilai nik tidak valid', 'danger', 'alert-circle-outline');
    }
  }
  async confirmDelete(kd_penduduk: string) {
    const alert = await this.alertController.create({
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
            this.delete_Penduduk(kd_penduduk);
          },
        },
      ],
    });

    await alert.present();
  }

  async delete_Penduduk(kd_penduduk: string) {
    try {
      const res = await this._apiService.delete_Penduduk(kd_penduduk);

      if (res.msg === 'ok') {
        this.presentToast('Data berhasil dihapus!', 'success', 'checkmark-circle-outline');
        this.getPenduduk(); // Refresh data setelah penghapusan
      } else if (res.msg === 'notOk') {
        this.presentToast('Data gagal dihapus!', 'danger', 'alert-circle-outline');
      } else {
        this.presentToast('Something went wrong!', 'danger', 'alert-circle-outline');
      }
    } catch (err: any) {
      console.error('Error in deletePenduduk:', err);
      this.presentToast('Error: ' + err.err, 'danger', 'alert-circle-outline');
    }
  }

  // async confirmDelete(kd_penduduk: string) {
  //   const alert = await this.alertController.create({
  //     header: 'Confirm Delete',
  //     message: 'Are you sure you want to delete this information?',
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         handler: (cancel) => {
  //           console.log('Delete canceled');
  //         },
  //       },
  //       {
  //         text: 'Delete',
  //         handler: () => {
  //           this.delete_Penduduk(kd_penduduk);
  //         },
  //       },
  //     ],
  //   });
  // }
  // async delete_Penduduk(kd_penduduk: string) {
  //   const result = await this._apiService.delete_Penduduk(kd_penduduk);

  //   if (result.msg === 'ok') {
  //     this.presentToast('Penduduk berhasil dihapus', 'success', 'checkmark-outline');
  //     this.getPenduduk(); // Refresh data setelah penghapusan
  //   } else if (result.msg === 'notOk') {
  //     this.presentToast('Gagal menghapus penduduk', 'danger', 'alert-circle-outline');
  //   } else {
  //     this.presentToast('Terjadi kesalahan: ' + String(result.err), 'danger', 'alert-circle-outline');
  //   }
  // }
  tambah() {
    this.navCtrl.navigateRoot('/create?penduduk=' + this.penduduk);
  }
  exportToExcel() {
    if (this.Data && this.Data.length > 0) {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.Data);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'PendudukData');
      XLSX.writeFile(wb, 'penduduk_data.xlsx');
    } else {
      this.presentToast('No data to export', 'warning', 'alert-circle-outline');
    }
  }

}
