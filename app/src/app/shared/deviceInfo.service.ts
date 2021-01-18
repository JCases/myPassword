import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Plugins } from '@capacitor/core';
const { Device } = Plugins;

@Injectable({
  providedIn: 'root',
})
export class DeviceInfoService {
  logged = false;
  logged$: EventEmitter<boolean> = new EventEmitter<boolean>();
  SERVER_URL = '/user';

  constructor(private httpClient: HttpClient) {}

  public async setClientDeviceInfo() {
    try {
      const {
        model,
        platform,
        osVersion,
        appVersion,
        appBuild,
      } = await Device.getInfo();
      await this.httpClient
        .put(`${this.SERVER_URL}/device/info`, {
          model,
          platform,
          osVersion,
          appVersion,
          appBuild,
          location,
        })
        .toPromise();
    } catch (e) {
      console.log(e);
    }
  }
}
