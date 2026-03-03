import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {ManaLoaderComponent} from '../mana-loader/mana-loader.component';

@Component({
  selector: 'app-page-loader',
  imports: [
    ManaLoaderComponent
  ],
  templateUrl: './page-loader.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageLoader {
  label = input('Loading...');
}
