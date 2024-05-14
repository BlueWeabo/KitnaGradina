package com.blueweabo.kitnaserver.configuration;

import java.util.UUID;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;

import jakarta.servlet.http.HttpServletRequest;

public class AuthenticationService {

    private static final String AUTH_TOKEN_HEADER_NAME = "KG-API-KEY";
    private static final UUID AUTH_TOKEN = UUID.fromString("12b6bcf1-c8fe-43c4-b01f-6684129e8bdf");

    public static Authentication getAuthentication(HttpServletRequest request) {
        String apiKey = request.getHeader(AUTH_TOKEN_HEADER_NAME);
        if (apiKey == null || !UUID.fromString(apiKey).equals(AUTH_TOKEN)) {
            throw new BadCredentialsException("Invalid API Key");
        }
        return new ApiKeyAuthentication(UUID.fromString(apiKey), AuthorityUtils.NO_AUTHORITIES);
    }
}
