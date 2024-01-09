import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ApiserviceService } from '../apiservice.service';
import { ViewDidEnter, ToastController, NavController, AlertController } from '@ionic/angular';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-pengeluaran',
  templateUrl: './pengeluaran.page.html',
  styleUrls: ['./pengeluaran.page.scss'],
})
export class PengeluaranPage implements ViewDidEnter {
  public info!: string;
  isMenuOpen = false;
  public pengeluaranData: any;
  public kd_pengeluaran: any;
  public nama_pengeluaran: any;
  public searchNIK: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private storage: Storage,
    private navCtrl: NavController,
    private _apiService: ApiserviceService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) { 
    this.getPengeluaran();
  }

  ionViewDidEnter() {
    this.getPengeluaran();
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
      this.pengeluaranData = this.pengeluaranData.filter((info: any) =>
        info.kd_pengeluaran.includes(this.searchNIK)
      );

      if (this.pengeluaranData.length > 0) {
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
        this.getPengeluaran();
      }
    } else {
      // Jika searchNIK kosong, kembalikan ke semua data
      this.getPengeluaran();
    }
  }
  async getPengeluaran() {
    try {
      await this.storage.create();
      const res = await this._apiService.getPengeluaran();

      if (res.msg === 'ok') {
        this.pengeluaranData = res.data;
      } else if (res.msg === 'notFound') {
        this.presentToast('Belum ada pengeluaran !', 'warning', 'alert-circle-outline');
      } else {
        this.presentToast('Something went wrong', 'danger', 'alert-circle-outline');
      }
    } catch (err: any) {
      console.error('Error in getpengeluaran:', err);
      this.presentToast('Error fetching data', 'danger', 'alert-circle-outline');
    }
  }
  handleRefresh(event: any) {
    setTimeout(() => {
      this.getPengeluaran();
      event.target.complete();
    }, 2000);
  }
  edit(kd_pengeluaran: string) {
    console.log('kd_pengeluaran:', kd_pengeluaran);

    if (kd_pengeluaran !== undefined && kd_pengeluaran !== null && kd_pengeluaran.trim() !== '') {
      this.navCtrl.navigateRoot('/updatepengeluaran?kd_pengeluaran=' + kd_pengeluaran);
    } else {
      this.presentToast('Invalid kd_pengeluaran value', 'danger', 'alert-circle-outline');
    }
  }
  async confirmDelete(kd_pengeluaran: string) {
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
            this.delete_Pengeluaran(kd_pengeluaran);
          },
        },
      ],
    });

    await alert.present();
  }
  async delete_Pengeluaran(kd_pengeluaran: string) {
    try {
      const res = await this._apiService.delete_Pengeluaran(kd_pengeluaran);

      if (res.msg === 'ok') {
        this.presentToast('Data berhasil dihapus!', 'success', 'checkmark-circle-outline');
        this.getPengeluaran(); // Refresh data setelah penghapusan
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
    if (this.pengeluaranData && this.pengeluaranData.length > 0) {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.pengeluaranData);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'pengeluaranData');
      XLSX.writeFile(wb, 'pengeluaran_data.xlsx');
    } else {
      this.presentToast('No data to export', 'warning', 'alert-circle-outline');
    }
  }

}
