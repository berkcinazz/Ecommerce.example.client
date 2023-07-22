import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safeUrl',
})
export class SafeUrlPipe implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) {}
  transform(value: string): SafeUrl {
    let splitArr = value.split('/');
    let val = splitArr[splitArr.length - 1];
    value = value + '?enablejsapi';
    console.log(val, value);
    return this.domSanitizer.bypassSecurityTrustResourceUrl(value);
  }
}
