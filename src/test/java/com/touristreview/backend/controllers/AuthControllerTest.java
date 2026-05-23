package com.touristreview.backend.controllers;

import com.touristreview.backend.dto.LoginRequest;
import com.touristreview.backend.dto.LoginResponse;
import com.touristreview.backend.dto.RegisterRequest;
import com.touristreview.backend.jwt.JwtTokenProvider;
import com.touristreview.backend.models.User;
import com.touristreview.backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class AuthControllerTest {

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtTokenProvider jwtTokenProvider;

    @InjectMocks
    private AuthController authController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void register_NewUser_Success() {
        RegisterRequest request = new RegisterRequest("testuser", "test@example.com", "password");

        when(userRepository.existsByUsername("testuser")).thenReturn(false);
        when(userRepository.existsByEmail("test@example.com")).thenReturn(false);
        when(passwordEncoder.encode("password")).thenReturn("encodedPassword");

        ResponseEntity<String> response = authController.register(request);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("User registered successfully!", response.getBody());
    }

    @Test
    void register_UsernameExists_ReturnsBadRequest() {
        RegisterRequest request = new RegisterRequest("testuser", "test@example.com", "password");

        when(userRepository.existsByUsername("testuser")).thenReturn(true);

        ResponseEntity<String> response = authController.register(request);

        assertEquals(400, response.getStatusCodeValue());
        assertEquals("Username is already taken.", response.getBody());
    }

    @Test
    void register_EmailExists_ReturnsBadRequest() {
        RegisterRequest request = new RegisterRequest("testuser", "test@example.com", "password");

        when(userRepository.existsByUsername("testuser")).thenReturn(false);
        when(userRepository.existsByEmail("test@example.com")).thenReturn(true);

        ResponseEntity<String> response = authController.register(request);

        assertEquals(400, response.getStatusCodeValue());
        assertEquals("Email is already registered.", response.getBody());
    }

    @Test
    void login_ValidCredentials_ReturnsToken() {
        LoginRequest loginRequest = new LoginRequest("testuser", "password");

        Authentication authMock = mock(Authentication.class);
        UserDetails userDetails = mock(UserDetails.class);

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(authMock);
        when(authMock.getPrincipal()).thenReturn(userDetails);
        when(jwtTokenProvider.generateToken(userDetails)).thenReturn("mock-token");

        ResponseEntity<LoginResponse> response = authController.login(loginRequest);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("mock-token", response.getBody().getToken());
    }
}
