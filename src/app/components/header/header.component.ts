import { Component, EventEmitter, Output } from '@angular/core';
import { FavoritePknService } from 'src/app/service/favorite-pkn.service';
import { PokemonService } from 'src/app/service/pokemon.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  favoritePkmName: string | undefined;
  favoritePkmImage: string | undefined;
  pokemonDetails: any | undefined;
  @Output() searchPokemon = new EventEmitter<string>();
  searchInput: string = '';
  searchResults: any[] = [];

  onSearchPokemon() {
    if (this.searchInput) {
      this.pokemonService.getAllPokemonNames().subscribe((pokemonNames) => {
        this.searchResults = pokemonNames
          .filter((name) => name.toLowerCase().includes(this.searchInput.toLowerCase()))
          .slice(0, 5); // Limitar a 5 resultados para mostrar
      });
    } else {
      this.searchResults = [];
    }
  }

  showPokemonDetails(pokemonName: string) {
    this.searchPokemon.emit(pokemonName);
    this.searchInput = ''; // Limpiar el campo de búsqueda después de seleccionar un Pokemon
    this.searchResults = []; // Limpiar la lista de resultados después de seleccionar un Pokemon
  }

  onInputChange() {
    if (this.searchInput) {
      this.pokemonService.getAllPokemonNames().subscribe((pokemonNames) => {
        const searchTerm = this.searchInput.toLowerCase();
        this.searchResults = pokemonNames
          .filter((name) => name.toLowerCase().includes(searchTerm))
          .slice(0, 5); // Limitar los resultados a 5
      });
    } else {
      this.searchResults = [];
    }
  }

  selectSearchResult(result: string) {
    this.searchInput = result;
    this.searchResults = []; // Cerrar la lista de sugerencias
    this.onSearchPokemon(); // Realizar la búsqueda con la sugerencia seleccionada
  }

  constructor(
    private favoritePknSrv: FavoritePknService,
    private pokemonService: PokemonService
  ) {}

  ngOnInit() {
    this.favoritePknSrv.favoritePokemon$.subscribe((pokemonName) => {
      this.favoritePkmName = pokemonName;

      if (pokemonName) {
        this.pokemonService.getPokemonDetails(pokemonName).subscribe((pokemonDetails) => {
          this.favoritePkmImage = pokemonDetails.sprites.front_default;
          this.pokemonDetails = pokemonDetails;
        });
      }
    });
  }

  toTitleCase(str: string): string {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  openDetailsModal() {
    if (this.favoritePkmName) {
      this.pokemonService.getPokemonDetails(this.favoritePkmName).subscribe((pokemonDetails) => {
        this.favoritePkmImage = pokemonDetails.sprites.front_default;
        this.pokemonDetails = pokemonDetails;
        // Abre el modal
        const modal = document.getElementById('detailsModal');
        const backdrop = document.getElementsByClassName('modal-backdrop')[0] as HTMLElement;
        if (modal) {
          modal.classList.add('show');
          modal.style.display = 'block';
        }
        if (backdrop) {
          backdrop.style.display = 'block';
        }
      });
    }
  }

  closeDetailsModal() {
    // Cierra el modal
    const modal = document.getElementById('detailsModal');
    const backdrop = document.getElementsByClassName('modal-backdrop')[0] as HTMLElement;
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
    }
    if (backdrop) {
      backdrop.style.display = 'none';
    }
  }

  
}
