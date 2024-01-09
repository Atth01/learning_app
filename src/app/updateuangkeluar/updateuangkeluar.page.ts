import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  AlertController,
  LoadingController,
  NavController,
  ToastController,
  ModalController,
} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-updateuangkeluar',
  templateUrl: './updateuangkeluar.page.html',
  styleUrls: ['./updateuangkeluar.page.scss'],
})
export class UpdateuangkeluarPage implements OnInit {
  public Data: any;
  public image: any;
  public kd_keluar: any;
  public kd_pengeluaran: string = '';
  public keterangan: string = '';
  public tanggal_keluar: string = '';


  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private storage: Storage,
    private _apiService: ApiserviceService
  ) { 
    this.route.queryParams.subscribe((params) => {
      const kd_keluar = params['kd_keluar'];
      if (kd_keluar == null) {
        this.presentToast(
          'No Parameter found!',
          'warning',
          'alert-circle-outline'
        );
      } else {
        this.kd_keluar = kd_keluar;
        this.getUang();
      }
    });
  }
  async presentToast(msg: string, color: string, icon: string) {
    const toast = await this.toastCtrl.create({
      icon: icon,
      message: msg,
      duration: 1500,
      color: color,
      position: 'top',
    });
    toast.present();
  }
  async getFile(event: any) {
    const file = event.target.files[0];
    this.image = file;
  }

  async getUang() {
    try {
      await this.storage.create();
      this._apiService.getUang().then((res: any) => {
        console.log(res.data);
        if (res.msg == 'ok') {
          this.Data = res.data.filter(
            (item: any) => item.kd_keluar === this.kd_keluar
          );
          if (this.Data.length > 0) {
            const dataItem = this.Data[0];
            this.kd_keluar = dataItem.kd_keluar;
            this.image = dataItem.bukti;
            this.kd_pengeluaran = dataItem.kd_pengeluaran;
            this.keterangan = dataItem.keterangan;
            this.tanggal_keluar = dataItem.tanggal_keluar;
          } else {
            this.presentToast(
              'Data not found',
              'warning',
              'alert-circle-outline'
            );
          }
        } else if (res.msg == 'err') {
          this.presentToast(
            'Something went wrong: ' + String(res.err),
            'danger',
            'alert-circle-outline'
          );
        }
      });
    } catch (error) {
      console.error('Error in getUang', error);
      this.presentToast(
        'Error fetching data',
        'danger',
        'alert-circle-outline'
      );
    }
  }
  async Update() {
    if (
      this.image == '' &&
      this.kd_pengeluaran == '' &&
      this.keterangan == '' &&
      this.tanggal_keluar == ''
    ) {
      this.presentToast(
        'Tidak boleh ada form yang kosong, harap isi semua form!',
        'warning',
        'alert-circle-outline'
      );
    } else {
      const loader = await this.loadingCtrl.create({
        message: 'Please wait...',
        spinner: 'lines',
      });
      loader.present();
      const formData = new FormData();
      formData.append('kd_keluar', this.kd_keluar);
      formData.append('kd_pengeluaran', this.kd_pengeluaran);
      formData.append('keterangan', this.keterangan);
      formData.append('tanggal_keluar', this.tanggal_keluar);
      if (this.image !== undefined || this.image !== null) {
        formData.append('bukti', this.image);
      }
      this._apiService.update_Uang(formData, this.kd_keluar).then((res) => {
        if (res.msg == 'ok') {
          this.loadingCtrl.dismiss();
          this.presentToast(
            'Data berhasil diubah !',
            'success',
            'checkmark-circle-outline'
          );

          // Kirim data yang diperbarui ke halaman "uang-keluar"
          this.navCtrl.navigateRoot('/uangkeluar', {
            queryParams: {
              updatedData: {
                kd_keluar: this.kd_keluar,
                kd_pengeluaran: this.kd_pengeluaran,
                keterangan: this.keterangan,
                tanggal_keluar: this.tanggal_keluar,
                image: this.image,
              },
            },
          });
        } else if (res.msg == 'notOk') {
          this.loadingCtrl.dismiss();
          this.presentToast(
            'Data gagal diubah !',
            'danger',
            'alert-circle-outline'
          );
        } else if (res.msg == 'err') {
          this.loadingCtrl.dismiss();
          this.presentToast(
            'Something went wrong !',
            'danger',
            'alert-circle-outline'
          );
        }
      });
    }
  }

  ngOnInit() {
  }
  back(){
    this.navCtrl.navigateRoot('/uangkeluar');
  }

}
