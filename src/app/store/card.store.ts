import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { initialState } from './card.state';
import { computed, inject } from '@angular/core';
import { CardsService } from '../services/cards.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

export const CardStore = signalStore(
  { providedIn: "root"},
  withState(initialState),
  withComputed(({cards}) => ({
    cardsList: computed(() => cards()),
    cardsCount: computed(() => cards().length),
    spellCards: computed(() => cards().filter(card => card.type === 'Spell Card').length),
  })),
  withMethods((store, cardsService = inject(CardsService)) => ({
    loadPages: rxMethod<number>(
      pipe(
        tap(() => patchState(store, { state: 'loading' })),
        switchMap((page) => cardsService.loadCards(page).pipe(
          tap((cards) => {
            patchState(store, { cards, state: 'loaded' })
          })
        )),
      )
    ) 
  }))
)