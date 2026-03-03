import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ManaToast} from './shared/components/mana-toast/mana-toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ManaToast],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
