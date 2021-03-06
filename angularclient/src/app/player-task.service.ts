import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlayerTask } from './models/player-task';
import { Player } from './models/player';
import { Game } from './models/game';

@Injectable({
  providedIn: 'root'
})
export class PlayerTaskService {

  private playerTaskUrl: string;
  private playerTask: PlayerTask;

  constructor(private http: HttpClient) {
    this.playerTaskUrl = 'http://localhost:8080/assignedTask';
  }

  public findAll(): Observable<PlayerTask[]> {
    return this.http.get<PlayerTask[]>(this.playerTaskUrl);
  }

  public findPlayerTaskByTaskId(): Observable<PlayerTask[]> {
    return this.http.get<PlayerTask[]>(this.playerTaskUrl);
  }

  public findPlayerTaskByPlayerId(gameRoomCode: string, playerId: number): Observable<PlayerTask[]> {
    return this.http.get<PlayerTask[]>(this.playerTaskUrl + (`/${gameRoomCode}`) + (`/${playerId}`));
  }

  public async updatePlayerTask(taskId: number, game: Game){
    return await this.http.put(this.playerTaskUrl + (`/${taskId}`), game).toPromise();
  }

  public deleteAllPlayerTasks(): Observable<boolean> {
    return this.http.delete<boolean>(this.playerTaskUrl, this.httpOptions);
  }

  public async save(playerTask: PlayerTask) {
    return await this.http.post<PlayerTask>(this.playerTaskUrl, playerTask, this.httpOptions).toPromise();
  }

  public assignTasks(players: Player[]) {
    for (let i=0; i<players.length; i++) {
      var firstTaskId = this.getRandomTaskId(0);
      var secondTaskId = this.getRandomTaskId(firstTaskId);
      this.playerTask = new PlayerTask();
      this.playerTask.taskId = firstTaskId;
      this.playerTask.playerId = players[i].playerId;
      if (players[i].imposter) {
        this.playerTask.complete = true;
      } else {
        this.playerTask.complete = false;
      }
      this.save(this.playerTask);

      this.playerTask = new PlayerTask();
      this.playerTask.taskId = secondTaskId;
      this.playerTask.playerId = players[i].playerId;
      if (players[i].imposter) {
        this.playerTask.complete = true;
      } else {
        this.playerTask.complete = false;
      }
      this.save(this.playerTask);
    }
  }

  getRandomTaskId(num: number) {
    var returnNum = num;
    while(returnNum == num) {
      returnNum =  Math.floor(Math.random() * (12) + 1);
    }
    return returnNum;
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

}
