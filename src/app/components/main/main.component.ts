import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PokemonService } from 'src/app/service/pokemon.service';
import { FavoritePknService } from 'src/app/service/favorite-pkn.service'; 

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  pokemons: any[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  totalPokemons = 0;
  @Output() pokemonSelected = new EventEmitter<string>;
  favoritePokemon: string = "";
  @Input() initialLetterSummary: { letter: string; count: number }[] = [];
  allPokemons: any[] = [];
  searchQuery: string = "";

  constructor (private pokemonService: PokemonService, private favoritePknSrv: FavoritePknService){}

  ngOnInit(){
    this.getPokemons();
    this.getAllPokemons();
  }

  getPokemons() {
    const offset = (this.currentPage - 1) * this.itemsPerPage;
    this.pokemonService.getPokemons(offset, this.itemsPerPage).subscribe((data) => {
      this.pokemons = data.results;
      this.totalPokemons = data.count;
    });
  }

  loadNextPage() {
    this.currentPage++;
    this.getPokemons();
  }

  loadPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getPokemons();
    }
  }

  showPokemonDetails(pokemonName: string) {
    this.pokemonSelected.emit(pokemonName);
  }

  markAsFavorite(pokemonName: string) {
    if (this.isFavorite(pokemonName)) {
      this.favoritePokemon = ''; // Desmarcar el Pokemon si ya es favorito
    } else {
      this.favoritePokemon = pokemonName; // Marcar el Pokemon como favorito
    }
  }
  
  isFavorite(pokemonName: string): boolean {
    return this.favoritePokemon === pokemonName;
  }

  getAllPokemons() {
    this.pokemonService.getAllPokemons().subscribe((data) => {
      this.allPokemons = data.results;
      this.totalPokemons = data.count;
      this.sortAllPokemonsByInitialLetter();
      this.getPokemons(); 
    });
  }

  sortAllPokemonsByInitialLetter() {
    this.allPokemons.sort((a, b) => a.name.charAt(0).localeCompare(b.name.charAt(0))); // Ordenar por la primera letra del nombre en orden alfabético
  }

  

}
