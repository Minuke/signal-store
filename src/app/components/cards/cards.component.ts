import { Component, effect, inject, signal } from '@angular/core';
import { CardStore } from '../../store/card.store';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-cards',
  imports: [JsonPipe],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {

  readonly store = inject(CardStore);
  public page = signal(0);

  public ngOnInit():void {
    this.store.loadPages(0);
  }

  public nextPage():void {
    this.page.update((page) => page + 1);
    this.store.loadPages(this.page());
  }
}
