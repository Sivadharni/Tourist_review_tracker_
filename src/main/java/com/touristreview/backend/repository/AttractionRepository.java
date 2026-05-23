package com.touristreview.backend.repository;

import com.touristreview.backend.models.Attraction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttractionRepository extends JpaRepository<Attraction, Long> {
    // Can add custom queries if needed later
}
