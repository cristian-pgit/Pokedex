import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, distinct, toArray } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  // Método para obtener la lista de Pokemons
  getPokemons(offset: number, limit: number) {
    return this.http.get<any>(`${this.apiUrl}?offset=${offset}&limit=${limit}`);
  }

  // Método para obtener los detalles de un Pokemon por su nombre
  getPokemonDetails(pokemonName: string) {
    return this.http.get<any>(`${this.apiUrl}/${pokemonName}`);
  }

  getInitialLetters(): Observable<string[]> {
    return this.http.get<any>(`${this.apiUrl}?limit=1000`).pipe(
      map((data: any) => data.results.map((pokemon: any) => pokemon.name.charAt(0).toUpperCase())),
      distinct(),
      toArray()
    );
  }

  getAllPokemons(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?limit=10000`);
  }

  getAllPokemonNames(): Observable<string[]> {
    return this.http.get<any>(`${this.apiUrl}?limit=10000`).pipe(
      map((data: any) => data.results.map((pokemon: any) => pokemon.name))
    );
  }

}
