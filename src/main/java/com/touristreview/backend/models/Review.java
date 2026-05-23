package com.touristreview.backend.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String comment;
    private int rating;

    private LocalDateTime createdAt;

    // Many reviews belong to one attraction
    @ManyToOne
    @JoinColumn(name = "attraction_id")
    private Attraction attraction;

    // Many reviews belong to one user
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
