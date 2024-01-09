import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ApiserviceService } from '../apiservice.service';


@Component({
  selector: 'app-updateblok',
  templateUrl: './updateblok.page.html',
  styleUrls: ['./updateblok.page.scss'],
})
export class UpdateblokPage implements OnInit {
  public Data: any;
  public BlokData : any ;
  public kd_blok: any;
  public no_blok: string = ''; 
  public nama_blok: string = '';
  public status: any;


  constructor(
    private route: ActivatedRoute,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private storage: Storage,
    private _apiService: ApiserviceService

  ) {
    this.route.queryParams.subscribe((params) => {
      const kd_blok = params['kd_blok'];
      if (kd_blok == null) {
        this.presentToast(
          'No Parameter found!',
          'warning',
          'alert-circle-outline'
        );
      } else {
        this.kd_blok = kd_blok;
        this.getBlok();
      }
    });
   }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const kd_blok = params.get('kd_blok');
      if (kd_blok == null) {
        this.presentToast('No Parameter found!', 'warning', 'alert-circle-outline');
      } else {
        this.kd_blok = kd_blok;
        this.getBlok();
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

  async getBlok() {
    try {
      await this.storage.create();
      this._apiService.getBlok().then((res: any) => {
        console.log(res.data);
        if (res.msg == 'ok') {
          this.Data = res.data.filter((item: any) => item.kd_blok === this.kd_blok);
          if (this.Data.length > 0) {
            const dataItem = this.Data[0];
            this.kd_blok = dataItem.kd_blok;
            this.no_blok = dataItem.no_blok;
            this.nama_blok = dataItem.nama_blok;
            this.status = dataItem.status;
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
      console.error('Error in getBlok', error);
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
        this.kd_blok == '' ||
        this.nama_blok == '' ||
        this.no_blok == '' ||
        this.status == '' 
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
          nama_blok: this.nama_blok,
          no_blok: this.no_blok,
          status: this.status,
          kd_blok: this.kd_blok
        };
  
        this._apiService.updateBlok(updateData, this.kd_blok).then((res) => {
          if (res.msg == 'ok') {
            this.loadingCtrl.dismiss();
            this.presentToast(
              'Data berhasil diubah !',
              'success',
              'checkmark-circle-outline'
            );
            this.navCtrl.navigateRoot('/blok');
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
    this.navCtrl.navigateForward('/blok');
  }


}
