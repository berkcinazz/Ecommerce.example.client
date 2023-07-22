import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'pathComplete',
})
export class PathCompletePipe implements PipeTransform {
  transform(value: string): string {
    return environment.cdnUrl + value;
  }
}
