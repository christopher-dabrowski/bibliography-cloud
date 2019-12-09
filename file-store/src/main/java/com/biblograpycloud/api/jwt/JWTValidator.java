package com.biblograpycloud.api.jwt;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;

/**
 * Class for validation JWT tokens
 */
@Service
public class JWTValidator {
    @Value("${jwt.secret}")
    private String JWT_SECRET;

    public boolean isFileListingTokenValid(@NonNull String token,@NonNull String userName) {
//        System.out.println(JWT_SECRET);
//        System.out.println(userName);
        
        try {
            Key key = new SecretKeySpec(JWT_SECRET.getBytes(), "HmacSHA256");
            Jwts.parser()
                    .require("iss", "bibiograpy-cloud.pl")
                    .require("user", userName)
                    .require("list", true)
                    .setSigningKey(key)
                    .parseClaimsJws(token);
        } catch (JwtException e) {
            System.out.println("Błędny token");
            System.out.println(e.toString());
            return false;
        }

        return true;
    }

    public boolean isFileDownloadTokenValid(@NonNull String token, @NonNull String userName,
                                            @NonNull String fileName) {
        try {
            Key key = new SecretKeySpec(JWT_SECRET.getBytes(), "HmacSHA256");
            Jwts.parser()
                    .require("iss", "bibiograpy-cloud.pl")
                    .require("user", userName)
                    .require("fileName", fileName)
                    .require("download", true)
                    .setSigningKey(key)
                    .parseClaimsJws(token);
        } catch (JwtException e) {
            return false;
        }

        return true;
    }

    public boolean isFileDeletionTokenValid(@NonNull String token,@NonNull String userName) {
        try {
            Key key = new SecretKeySpec(JWT_SECRET.getBytes(), "HmacSHA256");
            Jwts.parser()
                    .require("iss", "bibiograpy-cloud.pl")
                    .require("user", userName)
                    .require("delete", true)
                    .setSigningKey(key)
                    .parseClaimsJws(token);
        } catch (JwtException e) {
            return false;
        }

        return true;
    }

    public boolean isFileUploadTokenValid(@NonNull String token,@NonNull String userName) {
        try {
            Key key = new SecretKeySpec(JWT_SECRET.getBytes(), "HmacSHA256");
            Jwts.parser()
                    .require("iss", "bibiograpy-cloud.pl")
                    .require("user", userName)
                    .require("upload", true)
                    .setSigningKey(key)
                    .parseClaimsJws(token);
        } catch (JwtException e) {
            return false;
        }

        return true;
    }
}
