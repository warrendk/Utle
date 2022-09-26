package com.utle.utleback;

import com.utle.utleback.Service.PlayerService;
import com.utle.utleback.model.Player;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/player")
public class PlayerResource {
    private final PlayerService PlayerService;

    @Value("${utle.http.auth-token}")
    private String principalRequestValue;

    public PlayerResource(PlayerService PlayerService) {
        this.PlayerService = PlayerService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Player>> getAllPlayers() {
        List<Player> Players = PlayerService.findAllPlayers();
        return new ResponseEntity<>(Players, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Player> getPlayerById(@PathVariable("id") Long id) {
        Player Player = PlayerService.findPlayerById(id);
        return new ResponseEntity<>(Player, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Player> addPlayer(@RequestBody Player Player, @RequestHeader("X-API-KEY") String key) {
        if(!key.equals(principalRequestValue)) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Player newPlayer = PlayerService.addPlayer(Player);
        return new ResponseEntity<>(newPlayer, HttpStatus.CREATED);
    }

    @PostMapping("/addmany")
    public ResponseEntity<Player> addPlayers(@RequestBody Player[] Players, @RequestHeader("X-API-KEY") String key) {
        if(!key.equals(principalRequestValue)) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Player newPlayer = null;
        for(Player p : Players) {
            newPlayer = PlayerService.addPlayer(p);
        }

        return new ResponseEntity<>(newPlayer, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Player> updatePlayer(@RequestBody Player Player, @RequestHeader("X-API-KEY") String key) {
        if(!key.equals(principalRequestValue)) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Player updatedPlayer = PlayerService.updatePlayer(Player);
        return new ResponseEntity<>(updatedPlayer, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    @Transactional
    public ResponseEntity<?> deletePlayer(@PathVariable("id") Long id, @RequestHeader("X-API-KEY") String key) {
        if(!key.equals(principalRequestValue)) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        PlayerService.deletePlayer(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/deleteall")
    @Transactional
    public ResponseEntity<?> deleteAll(@RequestHeader("X-API-KEY") String key) {
        if(!key.equals(principalRequestValue)) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        List<Player> Players = PlayerService.findAllPlayers();
        for(Player p : Players) {
            PlayerService.deletePlayer(p.getId());
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

}

