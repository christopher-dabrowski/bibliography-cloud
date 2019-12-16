package com.biblograpycloud.publications.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;

@Service
public class JwtCreator {

    @Value("${JWT_SECRET}")
    private String JWT_KEY;

    @Value("${JWT_SESSION_TIME}")
    private int JWT_TIME;

    public String creteFileDownloadToken(@NonNull String user, @NonNull String file) {
        var algorithm = Algorithm.HMAC256(JWT_KEY.getBytes());

        var calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        calendar.add(Calendar.MINUTE, JWT_TIME);
        var exp = calendar.getTime();

        String token = JWT.create()
                .withIssuer("bibiograpy-cloud.pl")
                .withExpiresAt(exp)
                .withClaim("user", user)
                .withClaim("fileName", file)
                .withClaim("download", true)
                .sign(algorithm);

        return token;
    }
}
