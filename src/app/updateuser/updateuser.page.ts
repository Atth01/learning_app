import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  ToastController,
  LoadingController,
  NavController,
} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.page.html',
  styleUrls: ['./updateuser.page.scss'],
})
export class UpdateuserPage implements OnInit {
  public Data: any;
  public kd_user: any;
  public kd_penduduk: any;
  public email: string = '';
  public username: string = '';
  public password: string = '';

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
      const kd_penduduk = params['kd_penduduk'];
      if (kd_penduduk == null) {
        this.presentToast(
          'No Parameter found!',
          'warning',
          'alert-circle-outline'
        );
      } else {
        this.kd_penduduk = kd_penduduk;
        this.getUser();
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
  async getUser() {
    try {
      await this.storage.create();
      this._apiService.getUser().then((res: any) => {
        console.log(res.data);
        if (res.msg == 'ok') {
          this.Data = res.data.filter((item: any) => item.kd_penduduk === this.kd_penduduk);
          if (this.Data.length > 0) {
            const dataItem = this.Data[0];
            // this.kd_penduduk = dataItem.kd_penduduk;
            this.email = dataItem.email;
            this.username = dataItem.username;
            this.password = dataItem.password;
            // this.kd_user = dataItem.kd_user;
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
      console.error('Error in getInfo', error);
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
        // this.kd_penduduk == '' ||
        // this.kd_user == '' ||
        this.email == '' ||
        this.username == '' ||
        this.password == ''
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
        formData.append('email', this.email);
        formData.append('username', this.username);
        formData.append('password', this.password);
        formData.append('kd_penduduk', this.kd_penduduk);
        this._apiService.updateUser(formData).then((res)=>{
          if (res.msg == 'ok') {
            this.loadingCtrl.dismiss();
            this.presentToast(
              'Data berhasil diubah !',
              'success',
              'checkmark-circle-outline'
            );
            this.navCtrl.navigateRoot('/user');
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
  Back() {
    // Ganti 'info' dengan path yang sesuai untuk halaman info Anda
    this.navCtrl.navigateForward('/user');
  }

  ngOnInit() {
  }

}
