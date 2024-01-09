import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ApiserviceService } from '../apiservice.service';
import { ViewDidEnter, ToastController, NavController, AlertController } from '@ionic/angular';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements ViewDidEnter {
  public info!: string;
  isMenuOpen = false;
  public infoData: any;
  public searchNIK: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private storage: Storage,
    private navCtrl: NavController,
    private _apiService: ApiserviceService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {
    this.getInfo();
  }

  ionViewDidEnter() {
    this.getInfo();
  }
  searchByNIK(): void {
    if (this.searchNIK.trim() !== '') {
      this.infoData = this.infoData.filter((info: any) =>
        info.judul_info.includes(this.searchNIK)
      );

      if (this.infoData.length > 0) {
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
        this.getInfo();
      }
    } else {
      // Jika searchNIK kosong, kembalikan ke semua data
      this.getInfo();
    }
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

  async getInfo() {
    try {
      await this.storage.create();
      const res = await this._apiService.getInfo();

      if (res.msg === 'ok') {
        this.infoData = res.data;
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
      this.getInfo();
      event.target.complete();
    }, 2000);
  }

  edit(kd_info: string) {
    console.log('kd_info:', kd_info);

    if (kd_info !== undefined && kd_info !== null && kd_info.trim() !== '') {
      this.navCtrl.navigateRoot('/updateinfo?kd_info=' + kd_info);
    } else {
      this.presentToast('Invalid kd value', 'danger', 'alert-circle-outline');
    }
  }

  async confirmDelete(kd_info: string) {
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
            this.delete_Info(kd_info);
          },
        },
      ],
    });

    await alert.present();
  }

  async delete_Info(kd: string) {
    try {
      const res = await this._apiService.delete_Info(kd);

      if (res.msg === 'ok') {
        this.presentToast('Data berhasil dihapus!', 'success', 'checkmark-circle-outline');
        this.getInfo(); // Refresh data setelah penghapusan
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
  exportToExcel() {
    if (this.infoData && this.infoData.length > 0) {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.infoData);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'infoData');
      XLSX.writeFile(wb, 'info_data.xlsx');
    } else {
      this.presentToast('No data to export', 'warning', 'alert-circle-outline');
    }
  }
  
  
}
