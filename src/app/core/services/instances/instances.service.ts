import {computed, Injectable, signal} from '@angular/core';
import {Instance} from '../../models/instances/instance.model';

@Injectable({
  providedIn: 'root',
})
export class InstancesService {
  instances = signal<Instance[]>([]);
  instanceNames = signal<string[]>([]);
}
