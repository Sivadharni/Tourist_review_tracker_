package com.touristreview.backend.services;

import com.touristreview.backend.dto.UserDTO;
import java.util.List;

public interface UserService {
    UserDTO getUserById(Long id);
    List<UserDTO> getAllUsers();
}
