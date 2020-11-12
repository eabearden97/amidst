import { Component, OnInit } from '@angular/core';
import { Player } from '../models/player';
import { PlayerServiceService } from '../player-service.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  players: Player[];

  constructor(private playerServiceService: PlayerServiceService) { }

  ngOnInit(): void {
    this.playerServiceService.findAll().subscribe(data => {
      this.players = data;
    });
  }


  add(): void {
    this.playerServiceService.addComputerPlayer(new Player)
      .subscribe(player => {this.players.push(player);
      });
  }


}
