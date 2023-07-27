import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PokemonService } from 'src/app/service/pokemon.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnChanges {
  @Input() allPokemons: any[] = [];
  @Input() initialLetterSummary: { letter: string; count: number }[] = [];

  constructor(private pokemonService: PokemonService) {}

  ngOnChanges(changes: SimpleChanges) {
    if ('allPokemons' in changes) {
      this.updateInitialLetterSummary();
    }
  }

  updateInitialLetterSummary() {
    const letters = this.allPokemons.map((name) => name.charAt(0).toUpperCase());
    const uniqueLetters = Array.from(new Set(letters));
    
    // Crea un array y cuenta
    const summaryArray = uniqueLetters.map((letter) => ({
      letter,
      count: letters.filter((l) => l === letter).length
    }));
  
    // Ordena por la propiedad 'letter' (orden alfabético)
    this.initialLetterSummary = summaryArray.sort((a, b) => a.letter.localeCompare(b.letter));
  }
  
  
  
}
