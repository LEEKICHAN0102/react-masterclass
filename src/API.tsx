//LocalStorage API
interface SStorage<T> {
  [key:string]:T
}

abstract class LocalStorage<T> {
  protected storage : SStorage<T> = {}

  setItem(key:string,value:T) {
      this.storage[key]=value;
  }
  getItem(key:string):T|undefined { //If not exist key value return undefined
      return this.storage[key];
  }
  clearItem(key:string) {
      delete this.storage[key];
  }
  clear() {
      this.storage = {};
  }
}

//why using abstract class?  I don't know well... need more practice!😥
class BasicStorage<T> extends LocalStorage<T>{
  setItem(key:string,value:T) {
      this.storage[key]=value;
  }
  getItem(key:string):T|undefined { //If not exist key value return undefined
      return this.storage[key];
  }
  clearItem(key:string) {
      delete this.storage[key];
  }
  clear() {
      this.storage = {};
  }
}

const extendLocalstorage=new BasicStorage<string>();
extendLocalstorage.setItem("Hello","Nice to meet You!");
const getValue = extendLocalstorage.getItem("Hello");
console.log(getValue);
const clearValue=extendLocalstorage.clearItem("Hello");
console.log(clearValue);
extendLocalstorage.clear();


//Geolocation API
type successCallback = (position: GeolocationPosition) => void;
type errorCallback = (positionError: GeolocationPositionError) => void;

interface OptionsObj {
maximumAge: number;
timeout: number;
enableHighAccuracy: boolean;
}

class GeolocationAPI {
//https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
  getCurrentPosition(success: successCallback): void;
  getCurrentPosition(success: successCallback, error: errorCallback): void;
  getCurrentPosition(success: successCallback, error: errorCallback, options: OptionsObj): void;
  getCurrentPosition(success: successCallback, error?: errorCallback, options?: OptionsObj) {
  if (error && options) {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        success(position);
      },
      (positionError: GeolocationPositionError) => {
        error(positionError);
      },
      options
    );
  } else if (error) {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        success(position);
      },
      (positionError: GeolocationPositionError) => {
        error(positionError);
      }
    );
  } else {
    navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
      success(position);
    });
  }
}
//https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/watchPosition
watchPosition(success: successCallback): number;
watchPosition(success: successCallback, error: errorCallback): number;
watchPosition(success: successCallback, error: errorCallback, options: OptionsObj): number;
watchPosition(success: successCallback, error?: errorCallback, options?: OptionsObj) {
  if (error && options) {
    return navigator.geolocation.watchPosition(
      (position: GeolocationPosition) => {
        success(position);
      },
      (positionError: GeolocationPositionError) => {
        error(positionError);
      },
      options
    );
  } else if (error) {
    return navigator.geolocation.watchPosition(
      (position: GeolocationPosition) => {
        success(position);
      },
      (positionError: GeolocationPositionError) => {
        error(positionError);
      }
    );
  } else {
    return navigator.geolocation.watchPosition((position: GeolocationPosition) => {
      success(position);
    });
  }
}
//https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/clearWatch
clearWatch(id: number) {
  navigator.geolocation.clearWatch(id);
}
}
