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
  selector: 'app-addpenduduk',
  templateUrl: './addpenduduk.page.html',
  styleUrls: ['./addpenduduk.page.scss'],
})
export class AddpendudukPage implements OnInit {
  public Blok: any;
  public nik: string = '';
  public kk: string = '';
  public nama: string = '';
  public jk: string = '';
  public agama: string = '';
  public stts_prkwn: string = '';
  public stts_klrg: string = '';
  public status_kewarganegaraan: string = '';
  public domisili: string = '';
  public stts_pkrjan: string = '';
  public status_kavling: string = '';
  public kd_blok: string = '';
  public tgl_masuk: any;
  public tmpt_lhr: string = '';
  public tgl_lhr: string = '';

  constructor(
    private _apiService: ApiserviceService,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    public router: Router,
    public route: ActivatedRoute,
    private storage: Storage,
  ) {
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
      this.nik == '' ||
      this.kk  == ''||
      this.nama == ''||
      this.jk== '' ||
      this.agama == ''||
      this.domisili == ''||
      this.status_kavling == ''||
      this.tgl_masuk == ''||
      this.tmpt_lhr == '' ||
      this.status_kewarganegaraan == ''
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
      formData.append('nik', this.nik);
      formData.append('kk', this.kk);
      formData.append('nama', this.nama);
      formData.append('jenis_kelamin', this.jk);
      formData.append('agama', this.agama);
      formData.append('stts_nik', this.domisili);
      formData.append('status_kavling', this.status_kavling);
      formData.append('status_perkawinan', this.stts_prkwn);
      formData.append('status_keluarga', this.stts_klrg);
      formData.append('status_pekerjaan', this.stts_pkrjan);
      formData.append('status_kewarganegaraan', this.status_kewarganegaraan);
      formData.append('kd_blok', this.kd_blok);
      formData.append('tgl_masuk', this.tgl_masuk);
      formData.append('tempat_lahir', this.tmpt_lhr);
      formData.append('tgl_lahir', this.tgl_lhr);
  
      this._apiService.create_Penduduk(formData).then((res) => {
        if (res.msg == 'ok') {
          this.loadingCtrl.dismiss();
          this.presentToast(
            'Data berhasil ditambahkan!',
            'success',
            'checkmark-circle-outline'
          );
          this.navCtrl.navigateRoot('/penduduk');
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
  Back() {
    // Ganti 'info' dengan path yang sesuai untuk halaman info Anda
    this.navCtrl.navigateForward('/penduduk');
  }




  ngOnInit() {
  }
  
}
