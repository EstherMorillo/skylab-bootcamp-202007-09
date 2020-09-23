import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { HEROES } from './mock-heroes';

@Injectable({
	providedIn: 'root'
})
export class HeroService {
	_heroes = HEROES;

	constructor(private messageService: MessageService) {}

	getHeroes() {
		this.messageService.addMessage('Heroes loaded...');
		return this._heroes;
	}

	getHero(heroId: number) {
		this.messageService.addMessage(`Hero loaded with id ${heroId}`);
		return this._heroes.filter((hero) => hero.id === heroId);
	}
}
