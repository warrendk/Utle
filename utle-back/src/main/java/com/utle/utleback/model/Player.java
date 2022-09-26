package com.utle.utleback.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.io.Serializable;

@Entity
public class Player implements Serializable {
    @Id
    @Column(nullable = false, updatable = false)
    private Long id;
    private String first_name;
    private String last_name;
    private String position;
    private Long height;
    private Long jersey;
    private String home_state;
    private Long start_year;
    private Long end_year;

    public Player(Long id, String first_name, String last_name, String position, Long height, Long jersey, String home_state, Long start_year, Long end_year) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.position = position;
        this.height = height;
        this.jersey = jersey;
        this.home_state = home_state;
        this.start_year = start_year;
        this.end_year = end_year;
    }

    public Player() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public Long getHeight() {
        return height;
    }

    public void setHeight(Long height) {
        this.height = height;
    }

    public Long getJersey() {
        return jersey;
    }

    public void setJersey(Long jersey) {
        this.jersey = jersey;
    }

    public String getHome_state() {
        return home_state;
    }

    public void setHome_state(String home_state) {
        this.home_state = home_state;
    }

    public Long getStart_year() {
        return start_year;
    }

    public void setStart_year(Long start_year) {
        this.start_year = start_year;
    }

    public Long getEnd_year() {
        return end_year;
    }

    public void setEnd_year(Long end_year) {
        this.end_year = end_year;
    }
}
