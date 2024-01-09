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
  selector: 'app-updatependuduk',
  templateUrl: './updatependuduk.page.html',
  styleUrls: ['./updatependuduk.page.scss'],
})
export class UpdatependudukPage implements OnInit {
  public Data: any;
  public image: any;
  public penduduk: any;
  public kd: string = '';
  public kd_blok: string = '';
  public nik: string = '';
  public kk: string = '';
  public nama: string = '';
  public tmpt_lhr: string = '';
  public jk: string = '';
  public tgl_lhr: string = '';
  public agama: string = '';
  public stts_prkwn: string = '';
  public stts_klrg: string = '';
  public stts_kwngn: string = '';
  public stts_pkrjan: string = '';
  public stts_kvlng: string = '';
  public stts_huni: string = '';
  public tgl_msk: string = '';
  public stts_nik: string = '';
  public Blok: any;


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
      if (params['nik'] == null) {
        this.presentToast(
          'No Parameter found!',
          'warning',
          'alert-circle-outline'
        );
      } else {
        this.getPenduduk(params['nik']);
      }
    });
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
  // async getFile(event: any) {
  //   const file = event.target.files[0];
  //   this.image = file;
  // }
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
  async getPenduduk(nik:string) {
    await this.storage.create();
    // Adjust as needed, e.g., provide a default value or remove the parameter if not needed
    this._apiService.getPenduduk(nik).then((res: any) => {
      console.log(res.data)
      if (res.msg == 'ok') {
        this.Data = res.data;
        this.agama = res.data.agama;
        this.nik = res.data.nik;
        this.nama = res.data.nama;
        this.tmpt_lhr = res.data.tempat_lahir;
        this.tgl_lhr = res.data.tgl_lahir;
        this.jk = res.data.jenis_kelamin;
        this.stts_prkwn = res.data.status_perkawinan;
        this.stts_pkrjan = res.data.status_pekerjaan;
        this.stts_huni = res.data.status_huni;
        this.stts_klrg = res.data.status_keluarga;
        this.stts_kwngn = res.data.status_kewarganegaraan;
        this.stts_nik = res.data.stts_nik;
        this.kd_blok = res.data.kd_blok;
        this.kd = res.data.kd_penduduk;
        this.stts_kvlng = res.data.status_kavling;
        this.tgl_msk = res.data.tgl_masuk;
        this.kk = res.data.kk;


      } else if (res.msg == 'err') {
        this.presentToast(
          'Something went wrong: ' + String(res.err),
          'danger',
          'alert-circle-outline'
        );
      }
    });
  }
  async Update() {
    if (
      this.kd == '' &&
      this.kd_blok == '' &&
      this.nik == '' &&
      this.kk == '' &&
      this.nama == '' &&
      this.tgl_lhr == '' &&
      this.agama == '' &&
      this.tmpt_lhr == '' &&
      this.jk == '' &&
      this.stts_prkwn == '' &&
      this.stts_pkrjan == '' &&
      this.stts_kwngn == '' &&
      this.stts_kvlng == '' &&
      this.stts_klrg == '' &&
      this.stts_huni == '' &&
      this.stts_nik == ''
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
      formData.append('kd', this.kd);
      formData.append('kd_blok', this.kd_blok);
      formData.append('nik', this.nik);
      formData.append('kk', this.kk);
      formData.append('nama', this.nama);
      formData.append('jenis_kelamin', this.jk);
      formData.append('tempat_lahir', this.tmpt_lhr);
      formData.append('tgl_lahir', this.tgl_lhr);
      formData.append('agama', this.agama);
      formData.append('status_perkawinan', this.stts_prkwn);
      formData.append('status_keluarga', this.stts_klrg);
      formData.append('status_pekerjaan', this.stts_pkrjan);
      formData.append('status_kewarganegaraan', this.stts_kwngn);
      formData.append('stts_nik', this.stts_nik);
      formData.append('status_kavling', this.stts_kvlng);
      formData.append('status_huni', this.stts_huni);
      formData.append('tgl_masuk', this.tgl_msk);
      this._apiService.update_Penduduk(formData).then((res) => {
        if (res.msg == 'ok') {
          this.loadingCtrl.dismiss();
          this.presentToast(
            'Data berhasil diubah !',
            'success',
            'checkmark-circle-outline'
          );
          this.navCtrl.navigateRoot('/penduduk');
        } else if (res.msg == 'notOk') {
          console.log(res);
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
  Back() {
    // Ganti 'info' dengan path yang sesuai untuk halaman info Anda
    this.navCtrl.navigateForward('/penduduk');
  }

}
