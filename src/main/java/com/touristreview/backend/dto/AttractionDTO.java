package com.touristreview.backend.dto;

import lombok.Data;

@Data
public class AttractionDTO {
    private Long id;
    private String name;
    private String description;
    private String location;
}
