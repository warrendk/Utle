package com.utle.utleback.repo;

import com.utle.utleback.model.Player;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PlayerRepo extends JpaRepository<Player, Long> {
    void deletePlayerById(Long id);
    
    Optional<Player> findPlayerById(Long id);
}
