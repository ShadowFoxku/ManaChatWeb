import {Component, inject} from '@angular/core';
import {ManaToastService} from '../../../core/services/mana-toast/mana-toast.service';

@Component({
  selector: 'app-mana-toast',
  imports: [],
  templateUrl: './mana-toast.html',
  styleUrl: './mana-toast.css',
})
export class ManaToast {
  toastService = inject(ManaToastService);
}
