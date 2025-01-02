import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Card } from '../models/card.interface';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  private http = inject(HttpClient);

  public loadCards(page = 0) {
    return this.http.get<{data: Card[]}>(`https://db.ygoprodeck.com/api/v7/cardinfo.php?num=20&offset=${page * 5}`).pipe(map((response) => response.data));
  }
}
