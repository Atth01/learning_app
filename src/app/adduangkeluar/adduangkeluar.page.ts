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
  selector: 'app-adduangkeluar',
  templateUrl: './adduangkeluar.page.html',
  styleUrls: ['./adduangkeluar.page.scss'],
})
export class AdduangkeluarPage implements OnInit {
  public keterangan: any;
  public pengeluaran_foto: any;
  public tanggal_keluar: any;
  public kd_pengeluaran: any;
  public bukti: any;
  

  constructor(
    private _apiService: ApiserviceService,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    public router: Router,
    public route: ActivatedRoute,
    private storage: Storage,
  ) {
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
  async getPengeluaran() {
    this._apiService.getPengeluaran().then((res) => {
      if (res.msg == 'ok') {
        this.kd_pengeluaran = Array(res.data);
        if (res.data !== null) {
          this.kd_pengeluaran = res.data;
        } else {
          this.presentToast(
            'Blok not found !',
            'danger',
            'alert-circle-outline'
          );
        }
      } else if (res.msg == 'err') {
        this.presentToast(
          'Something went wrong',
          'danger',
          'alert-circle-outline'
        );
      }
    });
  }
  async Insert() {
    if (
      this.keterangan == '' ||
      this.pengeluaran_foto  == ''||
      this.tanggal_keluar == ''||
      this.kd_pengeluaran == '' 
      // this.agama == ''||
      // this.domisili == ''||
      // this.stts_kvlng == ''||
      // this.tgl_msk == ''||
      // this.tmpt_lhr == ''
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
      formData.append('keterangan', this.keterangan);
      formData.append('tanggal_keluar', this.tanggal_keluar);
      formData.append('kd_pengeluaran', this.kd_pengeluaran);
      formData.append('pengeluaran_foto', this.bukti);
      // formData.append('agama', this.agama);
      // formData.append('stts_nik', this.domisili);
      // formData.append('status_kavling', this.stts_kvlng);
      // formData.append('status_perkawinan', this.stts_prkwn);
      // formData.append('status_keluarga', this.stts_klrg);
      // formData.append('status_pekerjaan', this.stts_pkrjan);
      // formData.append('status_kewarganegaraan', this.stts_kwngn);
      // formData.append('kd_blok', this.kd_blok);
      // formData.append('tgl_masuk', this.tgl_msk);
      // formData.append('tempat_lahir', this.tmpt_lhr);
      // formData.append('tgl_lahir', this.tgl_lhr);
  
      this._apiService.createUang(formData).then((res) => {
        if (res.msg == 'ok') {
          this.loadingCtrl.dismiss();
          this.presentToast(
            'Data berhasil ditambahkan!',
            'success',
            'checkmark-circle-outline'
          );
          this.navCtrl.navigateRoot('/uangkeluar');
        } else if (res.msg == 'notOk') {
          this.loadingCtrl.dismiss();
          this.presentToast(
            'Data gagal ditambahkan!',
            'danger',
            'alert-circle-outline'
          );
        } else if (res.msg == 'err') {
          this.loadingCtrl.dismiss();
          this.presentToast(
            'Something went wrong!',
            'danger',
            'alert-circle-outline'
          );
        }
      });
    }
  }
  async getFile(event: any) {
    const file = event.target.files[0];
    this.bukti = file;
  }

  ngOnInit() {
  }
  goToInfoPage() {
    // Ganti 'info' dengan path yang sesuai untuk halaman info Anda
    this.navCtrl.navigateForward('/uangkeluar');
  }

}
