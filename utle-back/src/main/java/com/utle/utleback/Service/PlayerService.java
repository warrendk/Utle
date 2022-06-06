package com.utle.utleback.Service;

import com.utle.utleback.exception.PlayerNotFoundException;
import com.utle.utleback.model.Player;
import com.utle.utleback.repo.PlayerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlayerService {
    private final PlayerRepo playerRepo;

    @Autowired
    public PlayerService(PlayerRepo playerRepo) {
        this.playerRepo = playerRepo;
    }

    public Player addPlayer(Player player) {
        return playerRepo.save(player);
    }

    public List<Player> findAllPlayers() {
        return playerRepo.findAll();
    }

    public Player updatePlayer(Player player) {
        return playerRepo.save(player);
    }

    public Player findPlayerById(Long id) {
        return playerRepo.findPlayerById(id)
                .orElseThrow(() -> new PlayerNotFoundException("Player by id " + id + " was not found"));
    }
    public void deletePlayer(Long id) {
        playerRepo.deletePlayerById(id);
    }
}
