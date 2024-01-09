import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ApiserviceService } from '../apiservice.service';
import { ViewDidEnter, ToastController, NavController, AlertController } from '@ionic/angular';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-suratkeluar',
  templateUrl: './suratkeluar.page.html',
  styleUrls: ['./suratkeluar.page.scss'],
})
export class SuratkeluarPage implements ViewDidEnter {
  public info!: string;
  isMenuOpen = false;
  suratData: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private storage: Storage,
    private navCtrl: NavController,
    private _apiService: ApiserviceService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {
    this.getSurat();
   }

  ionViewDidEnter() {
    this.getSurat();
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
  async getSurat() {
    try {
      await this.storage.create();
      const res = await this._apiService.getSurat();

      if (res.msg === 'ok') {
        this.suratData = res.data;
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

  handleRefresh(event: any) {
    setTimeout(() => {
      this.getSurat();
      event.target.complete();
    }, 2000);
  }
  
  edit(kd_surat_keluar: string) {
    console.log('kd_surat_keluar:', kd_surat_keluar);

    if (kd_surat_keluar !== undefined && kd_surat_keluar !== null && kd_surat_keluar.trim() !== '') {
      this.navCtrl.navigateRoot('/updatesurat?kd_surat_keluar=' + kd_surat_keluar);
    } else {
      this.presentToast('Invalid kd value', 'danger', 'alert-circle-outline');
    }
  }

  async confirmDelete(kd_surat_keluar: string) {
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
            this.Delete_surat(kd_surat_keluar);
          },
        },
      ],
    });

    await alert.present();
  }

  async Delete_surat(kd_surat_keluar: string) {
    try {
      const res = await this._apiService.Delete_surat(kd_surat_keluar);

      if (res.msg === 'ok') {
        this.presentToast('Data berhasil dihapus!', 'success', 'checkmark-circle-outline');
        this.getSurat(); // Refresh data setelah penghapusan
      } else if (res.msg === 'notOk') {
        this.presentToast('Data gagal dihapus!', 'danger', 'alert-circle-outline');
      } else {
        this.presentToast('Something went wrong!', 'danger', 'alert-circle-outline');
      }
    } catch (err: any) {
      console.error('Error in deleteSurat:', err);
      this.presentToast('Error: ' + err.err, 'danger', 'alert-circle-outline');
    }
  }
  exportToExcel() {
    if (this.suratData && this.suratData.length > 0) {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.suratData);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'suratData');
      XLSX.writeFile(wb, 'surat_data.xlsx');
    } else {
      this.presentToast('No data to export', 'warning', 'alert-circle-outline');
    }
  }
}
