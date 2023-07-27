import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritePknService {
  private favoritePokemonSubject: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);
  public favoritePokemon$: Observable<string | undefined> = this.favoritePokemonSubject.asObservable();

  setFavoritePokemon(pokemonName: string) {
    this.favoritePokemonSubject.next(pokemonName);
  }

  constructor() { }
}
