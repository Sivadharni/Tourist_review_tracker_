package com.touristreview.backend.repository;

import com.touristreview.backend.models.Review;
import com.touristreview.backend.models.Attraction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByAttraction(Attraction attraction);
}
