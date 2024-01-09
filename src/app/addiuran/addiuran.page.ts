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
  selector: 'app-addiuran',
  templateUrl: './addiuran.page.html',
  styleUrls: ['./addiuran.page.scss'],
})
export class AddiuranPage implements OnInit {
  public tahunList: any[]= [];
  public Blok: any;
  public kd_blok: any;
  public kd_penduduk: any;
  public jenis_pembayaran: any;
  public keterangan: any;
  public tgl_pembayaran: any;
  public kas_bulan: any;
  public kas_tahun: any;
  public iuran_foto: any;
  
  years: number[] = Array.from({length: 12}, (_, i) => 2019 + i);

  constructor(
    private _apiService: ApiserviceService,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    public router: Router,
    public route: ActivatedRoute,
    private storage: Storage,
  ) { 
    let currentYear = new Date().getFullYear();
    for (let i = 2019; i < currentYear + 1; i++){
      var tahunObj = {
        tahun: i
      }
      this.tahunList.push(tahunObj)
    } 
    for (let i = currentYear + 1; i < currentYear + 6; i++){
      var tahunObj = {
        tahun: i
      }
      this.tahunList.push(tahunObj)
    } 
    this.getBlok();
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
  async getBlok() {
    this._apiService.getBlok().then((res) => {
      if (res.msg == 'ok') {
        this.Blok = Array(res.data);
        if (res.data !== null) {
          this.Blok = res.data;
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
      this.iuran_foto == '' ||
      this.kd_blok  == ''||
      this.kd_penduduk == ''||
      this.jenis_pembayaran == '' ||
      this.keterangan == ''||
      this.tgl_pembayaran == ''||
      this.kas_bulan == ''||
      this.kas_tahun == ''
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
      formData.append('kd_blok', this.kd_blok);
      formData.append('kd_penduduk', this.kd_penduduk);
      formData.append('jenis_pembayaran', this.jenis_pembayaran);
      formData.append('keterangan', this.keterangan);
      formData.append('tgl_pembayaran', this.tgl_pembayaran);
      formData.append('kas_tahun', this.kas_tahun);
      formData.append('kas_bulan', this.kas_bulan);
      formData.append('iuran_foto', this.iuran_foto);
      // formData.append('status_keluarga', this.stts_klrg);
      // formData.append('status_pekerjaan', this.stts_pkrjan);
      // formData.append('status_kewarganegaraan', this.stts_kwngn);
      // formData.append('kd_blok', this.kd_blok);
      // formData.append('tgl_masuk', this.tgl_msk);
      // formData.append('tempat_lahir', this.tmpt_lhr);
      // formData.append('tgl_lahir', this.tgl_lhr);
  
      this._apiService.createIuran(formData).then((res) => {
        if (res.msg == 'ok') {
          this.loadingCtrl.dismiss();
          this.presentToast(
            'Data berhasil ditambahkan!',
            'success',
            'checkmark-circle-outline'
          );
          this.navCtrl.navigateRoot('/iuran');
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
    this.iuran_foto = file;
  }
  ngOnInit() {
  }
  goToInfoPage() {
    // Ganti 'info' dengan path yang sesuai untuk halaman info Anda
    this.navCtrl.navigateForward('/iuran');
  }

}
