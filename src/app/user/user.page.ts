import { Component, OnInit } from '@angular/core';
import { ToastController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ApiserviceService } from '../apiservice.service';
import { Router } from '@angular/router';
import { ViewDidEnter, AlertController } from '@ionic/angular';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements ViewDidEnter {
  public Data: any;
  isReadOnly = false; // Menentukan properti isReadOnly
  public user: string = '';
  infoUser: any;
  public searchNIK: string = '';

  constructor(
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private storage: Storage,
    private _apiService: ApiserviceService,
    private router: Router,
    private alertCtrl: AlertController
  ) { 
    this.getUser();
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
      this.infoUser = this.infoUser.filter((infoUser: any) =>
        infoUser.kd_penduduk.includes(this.searchNIK)
      );

      if (this.infoUser.length > 0) {
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
        this.getUser();
      }
    } else {
      // Jika searchNIK kosong, kembalikan ke semua data
      this.getUser();
    }
  }
  async getUser() {
    try {
      await this.storage.create();
      const res = await this._apiService.getUser();

      if (res.msg === 'ok') {
        this.infoUser = res.data;
      } else if (res.msg === 'notFound') {
        this.presentToast('Belum ada user !', 'warning', 'alert-circle-outline');
      } else {
        this.presentToast('Something went wrong', 'danger', 'alert-circle-outline');
      }
    } catch (err: any) {
      console.error('Error in getUser:', err);
      this.presentToast('Error fetching data', 'danger', 'alert-circle-outline');
    }
  }
  handleRefresh(event: any) {
    setTimeout(() => {
      this.getUser();
      event.target.complete();
    }, 2000);
  }

  ionViewDidEnter() {
    this.getUser();
  }
  edit(kd_penduduk: string) {
    console.log('kd_penduduk:', kd_penduduk);

    if (kd_penduduk !== undefined && kd_penduduk !== null && kd_penduduk.trim() !== '') {
      this.navCtrl.navigateRoot('/updateuser?kd_penduduk=' + kd_penduduk);
    } else {
      this.presentToast('Invalid kd value', 'danger', 'alert-circle-outline');
    }
  }
  async confirmDelete(kd_user: string) {
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
            this.delete_User(kd_user);
          },
        },
      ],
    });

    await alert.present();
  }

  async delete_User(kd_user: string) {
    try {
      const res = await this._apiService.delete_User(kd_user);

      if (res.msg === 'ok') {
        this.presentToast('Data berhasil dihapus!', 'success', 'checkmark-circle-outline');
        this.getUser(); // Refresh data setelah penghapusan
      } else if (res.msg === 'notOk') {
        this.presentToast('Data gagal dihapus!', 'danger', 'alert-circle-outline');
      } else {
        this.presentToast('Something went wrong!', 'danger', 'alert-circle-outline');
      }
    } catch (err: any) {
      console.error('Error in deleteUser:', err);
      this.presentToast('Error: ' + err.err, 'danger', 'alert-circle-outline');
    }
  }
  exportToExcel() {
    if (this.infoUser && this.infoUser.length > 0) {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.infoUser);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'infoUser');
      XLSX.writeFile(wb, 'user.xlsx');
    } else {
      this.presentToast('No data to export', 'warning', 'alert-circle-outline');
    }
  }
}
