import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Console } from 'console';
import { response } from 'express';
import { Player } from './player';
import { PlayerService} from './player.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public players: Player[];
  public allPlayers: Player[];
  public pickedPlayers: Player[];
  public editPlayer: Player;
  public deletePlayer: Player;
  public math = Math;
  public answerPlayer: Player;
  public pickNumber;
  public gameOver;
  public showOverlay;
  public showAbout;
  public ll22Link: String = "/assets/img/lltj-transparent.png";
  
  constructor(private playerService: PlayerService, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.reset();
  }

  public reset(): void {
    this.getPlayers();
    this.pickedPlayers = [];
    this.pickNumber = 0;
    this.gameOver = false;
    this.showOverlay = false;
    this.showAbout = false;
    document.getElementById("guess-header").innerHTML = this.pickNumber + " of 8 guesses";
  }

  public getPlayers(): void {
    this.playerService.getPlayers().subscribe(
      (response: Player[]) => {
        this.players = response;
        this.allPlayers = response;
        this.answerPlayer = response[Math.floor(Math.random() * response.length)];
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchPlayers(key: string) : void {
    const results: Player[] = [];
    const display: string = key == '' ? 'none' : 'block';
    document.getElementById("myDropdown").style.display = display;
    
    for(const player of this.allPlayers) {
      // if a player has been guessed, dont display them in dropdown
      if(this.pickedPlayers.includes(player)) continue;
      var fullName = player.first_name + " " + player.last_name;
      if(player.first_name.toLowerCase().indexOf(key.toLowerCase()) != -1
      || player.last_name.toLowerCase().indexOf(key.toLowerCase()) != -1
      || fullName.toLowerCase().indexOf(key.toLowerCase()) != -1) {
        results.push(player);
      }
    }
    
    // if no key, all players; else, the results found above
    this.players = !key ? this.allPlayers : results; 
  }

  public onClickPlayer(player: Player) : void {
    this.pickedPlayers.push(player);
    const searchBar = <HTMLInputElement> document.getElementById("searchName");
    searchBar.value = '';
    this.searchPlayers(searchBar.value);
  
  }

  public tyJordan(player: Player) : boolean {
    return player.first_name == "Ty";
  }
  
  public displayCorrectCollumns(player: Player) : void {
    if(this.pickNumber == this.pickedPlayers.length) return;
    this.pickNumber = this.pickedPlayers.length;
    
    document.getElementById("guess-header").innerHTML = this.pickNumber + " of 8 guesses";
    
    const playerElements = document.querySelectorAll("#pickedPlayer");
    const curPlayer = playerElements[playerElements.length - 1];
    const columns = curPlayer.getElementsByClassName("player-info-col") as HTMLCollectionOf<HTMLElement>;
    const up = "<div class='arrow'>↑</div>";
    const down = "<div class='arrow'>↓</div>";

    if(this.tyJordan(player)) {
      columns[0].querySelector("p").innerHTML = '<img src="' + this.ll22Link + '"class="ll22"/>';
    }
    var numCorrect = 0;
    // jersey
    if(player.jersey == this.answerPlayer.jersey) {
      columns[0].style.backgroundColor = "var(--wordle-green)";
      numCorrect++;
    }
    else {
      if(player.jersey < this.answerPlayer.jersey)
        columns[0].querySelector("p").innerHTML += up;
      if(player.jersey > this.answerPlayer.jersey)
        columns[0].querySelector("p").innerHTML += down;
      if(Math.abs(player.jersey - this.answerPlayer.jersey) < 3) 
        columns[0].style.backgroundColor = "var(--wordle-yellow)"; 
    }

    // position
    if(player.position == this.answerPlayer.position) {
      columns[1].style.backgroundColor = "var(--wordle-green)";
      numCorrect++;
    }

    // height
    if(player.height == this.answerPlayer.height) {
      columns[2].style.backgroundColor = "var(--wordle-green)";
      numCorrect++;
    }
    else {
      if(player.height < this.answerPlayer.height)
        columns[2].querySelector("p").innerHTML += up;
      if(player.height > this.answerPlayer.height)
        columns[2].querySelector("p").innerHTML += down;
      if(Math.abs(player.height - this.answerPlayer.height) < 3) 
        columns[2].style.backgroundColor = "var(--wordle-yellow)"; 
    }

    // home
    if(player.home_state == this.answerPlayer.home_state) {
      columns[3].style.backgroundColor = "var(--wordle-green)";
      numCorrect++;
    }
  
    // start year
    if(player.start_year == this.answerPlayer.start_year) {
      columns[4].style.backgroundColor = "var(--wordle-green)";
      numCorrect++;
    }
    else {
      if(player.start_year < this.answerPlayer.start_year)
        columns[4].querySelector("p").innerHTML += up;
      if(player.start_year > this.answerPlayer.start_year)
        columns[4].querySelector("p").innerHTML += down;
      if(Math.abs(player.start_year - this.answerPlayer.start_year) < 3) 
        columns[4].style.backgroundColor = "var(--wordle-yellow)"; 
    }

    // end year
    if(player.end_year == this.answerPlayer.end_year) {
      columns[5].style.backgroundColor = "var(--wordle-green)";
      numCorrect++;
    }
    else {
      if(player.end_year < this.answerPlayer.end_year)
        columns[5].querySelector("p").innerHTML += up;
      if(player.end_year > this.answerPlayer.end_year)
        columns[5].querySelector("p").innerHTML += down;
      if(Math.abs(player.end_year - this.answerPlayer.end_year) < 3) 
        columns[5].style.backgroundColor = "var(--wordle-yellow)"; 
    }

    if(numCorrect == 6) {    
      this.gameOver = true;
      this.showOverlay = true;
      this.cdRef.detectChanges(); 
      this.onGameOver(true); 
    }

    // guessed too many
    if(this.pickNumber == 8) {
      this.gameOver = true;
      this.showOverlay = true;
      this.cdRef.detectChanges(); 
      this.onGameOver(false);
    }
  }

  public onGameOver(won: boolean): void {

    var footerMessage = "#: " + this.answerPlayer.jersey + 
      ", Pos: " + this.answerPlayer.position + 
      ", Ht: " + Math.floor(this.answerPlayer.height/12)+"'"+this.answerPlayer.height%12 + 
      ", Home: " + this.answerPlayer.home_state +
      ", " + this.answerPlayer.start_year + "-" + this.answerPlayer.end_year;

    var answerMessage = "Answer: " + this.answerPlayer.first_name + " " + this.answerPlayer.last_name;
    var headerMessage = won ? "Well Done!" : "Try Again?";

    document.getElementById("game-over-message").innerHTML = answerMessage;
    document.getElementById("game-over-message-header").innerHTML = headerMessage;
    document.getElementById("toast-footer").innerHTML = footerMessage;
    
  }

  public removeOverlay(): void {
    this.showOverlay = false;
  }

  public removeAbout(): void {
    this.showAbout = false;
  }

  public toggleAbout(): void {
    this.showAbout = !this.showAbout;
  }


  public darkModeOn(): void {
    document.documentElement.style.setProperty(`--${"background-color"}`, "#1A1A1D");
    document.documentElement.style.setProperty(`--${"secondary-background-color"}`, "#2b2b2f");
    document.documentElement.style.setProperty(`--${"text-color"}`, "silver");
    document.documentElement.style.setProperty(`--${"secondary-text-color"}`, "white");
    document.documentElement.style.setProperty(`--${"toast-border-color"}`, "silver");

  }

  public darkModeOff(): void {
    document.documentElement.style.setProperty(`--${"background-color"}`, "#efefef");
    document.documentElement.style.setProperty(`--${"secondary-background-color"}`, "#DFDCDC");
    document.documentElement.style.setProperty(`--${"text-color"}`, "black");
    document.documentElement.style.setProperty(`--${"secondary-text-color"}`, "black");
    document.documentElement.style.setProperty(`--${"toast-border-color"}`, "white");
  }

  public toggleDarkMode(checkbox: any): void {
    if(!checkbox) this.darkModeOn();
    else this.darkModeOff();
  }

  public onOpenModal(player: Player, mode: string): void {
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';

    button.setAttribute('data-toggle', 'modal');
    
    if(mode == 'add') {
      button.setAttribute('data-target', '#addPlayerModal');
    }
    if(mode == 'edit') {
      button.setAttribute('data-target', '#updatePlayerModal');
      this.editPlayer = player;
    }
    if(mode == 'delete') {
      this.deletePlayer = player;
      button.setAttribute('data-target', '#deletePlayerModal');
    }

    const container = document.getElementById("main-container");
    container?.appendChild(button);
    button.click();
  }
}
