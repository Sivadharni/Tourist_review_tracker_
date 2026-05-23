package com.touristreview.backend.dto;

import lombok.Data;

@Data
public class ReviewDTO {
    private Long id;
    private String content;
    private int rating;
    private Long userId;
    private Long attractionId;
}
