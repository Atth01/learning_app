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
  selector: 'app-updateiuran',
  templateUrl: './updateiuran.page.html',
  styleUrls: ['./updateiuran.page.scss'],
})
export class UpdateiuranPage implements OnInit {
  public Data: any;
  public kd_iuran: any;
  public kd_blok: any;
  public jenis_pembayaran: any;
  public tgl_pembayaran: any;
  public kas_bulan: any;
  public kas_tahun: any;
  public status: any;
  public keterangan: any;
  public kd_penduduk: any;
  // public iuran_foto: any;

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
      const kd_iuran = params['kd_iuran'];
      if (kd_iuran == null) {
        this.presentToast(
          'No Parameter found!',
          'warning',
          'alert-circle-outline'
        );
      } else {
        this.kd_iuran = kd_iuran;
        this.getIuran();
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
  async getIuran() {
    try {
      await this.storage.create();
      this._apiService.getIuran().then((res: any) => {
        console.log(res.data);
        if (res.msg == 'ok') {
          this.Data = res.data.filter((item: any) => item.kd_iuran === this.kd_iuran);
          if (this.Data.length > 0) {
            const dataItem = this.Data[0];
            this.kd_iuran = dataItem.kd_iuran;
            this.kd_blok = dataItem.kd_blok;
            this.kd_penduduk = dataItem.kd_penduduk;
            this.jenis_pembayaran = dataItem.jenis_pembayaran;
            this.keterangan = dataItem.keterangan;
            this.tgl_pembayaran = dataItem.tgl_pembayaran;
            this.kas_bulan = dataItem.kas_bulan;
            this.kas_tahun = dataItem.kas_tahun;
            this.status = dataItem.status;
            // this.iuran_foto = dataItem.iuran_foto
          } else {
            this.presentToast('Data not found', 'warning', 'alert-circle-outline');
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
      console.error('Error in getIuran', error);
      this.presentToast(
        'Error fetching data',
        'danger',
        'alert-circle-outline'
      );
    }
  }
  async Update() {
    try {
      if (
        this.kd_iuran == '' ||
        this.kd_blok == '' ||
        this.kd_penduduk == '' ||
        this.jenis_pembayaran == '' ||
        this.keterangan == '' ||
        this.tgl_pembayaran == '' ||
        this.kas_bulan == '' ||
        this.kas_tahun == '' ||
        this.status == '' 
        // this.iuran_foto
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
  
        const updateData = {
          kd_iuran: this.kd_iuran,
          kd_blok: this.kd_blok,
          kd_penduduk: this.kd_penduduk,
          jenis_pembayaran: this.jenis_pembayaran,
          keterangan: this.keterangan,
          tgl_pembayaran: this.tgl_pembayaran,
          kas_bulan: this.kas_bulan,
          kas_tahun: this.kas_tahun,
          status: this.status
          // iuran_foto: this.iuran_foto
        };
  
        this._apiService.updateIuran(updateData, this.kd_iuran).then((res) => {
          if (res.msg == 'ok') {
            this.loadingCtrl.dismiss();
            this.presentToast(
              'Data berhasil diubah !',
              'success',
              'checkmark-circle-outline'
            );
            this.navCtrl.navigateRoot('/iuran');
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
    } catch (error) {
      console.error('Error in Update', error);
      this.presentToast('Error updating data', 'danger', 'alert-circle-outline');
    }
  }

  ngOnInit() {
  }
  back(){
    this.navCtrl.navigateRoot('/iuran');
  }

}
