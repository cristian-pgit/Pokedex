import { Component, Input, OnChanges } from '@angular/core';
import { PokemonService } from 'src/app/service/pokemon.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnChanges {

  @Input() selectedPokemonName: string;
  selectedPokemon: any;
  

  constructor(private pokemonService: PokemonService) {
    this.selectedPokemonName = '';
  }

  ngOnChanges() {
      if (this.selectedPokemonName){
        this.getPokemonDetails(this.selectedPokemonName)
      }
  }

  getPokemonDetails(pokemonName: string) {
    this.pokemonService.getPokemonDetails(pokemonName).subscribe((data) => {
      this.selectedPokemon = data;
    });
  }



}
