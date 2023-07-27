import { Component, OnInit } from '@angular/core';
import { PokemonService } from './service/pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Pokedex';
  selectedPokemon: string = '';
  pokemons: any [] = [];
  currentPage = 1;
  itemsPerPage = 10;
  initialLetterSummary: { letter: string; count: number }[] = [];

  showPokemonDetails(pokemonName: string){
    this.selectedPokemon = pokemonName;
  }

  ngOnInit() {
    this.getInitialLetterSummary();
  }

  getInitialLetterSummary() {
    this.pokemonService.getAllPokemonNames().subscribe((pokemonNames) => {
      const letters = pokemonNames.map((name) => name.charAt(0).toUpperCase());
      const uniqueLetters = Array.from(new Set(letters));
      this.initialLetterSummary = uniqueLetters.map((letter) => ({
        letter,
        count: letters.filter((l) => l === letter).length
      }));
    });
  }

  constructor(private pokemonService : PokemonService){
    this.getPokemons();
  }

  getPokemons() {
    const offset = (this.currentPage - 1) * this.itemsPerPage;
    this.pokemonService.getPokemons(offset, this.itemsPerPage).subscribe((data) => {
      this.pokemons = data.results;
    });
  }

  onSearchPokemon(pokemonName: string) {
    this.selectedPokemon = pokemonName;
  }

}
