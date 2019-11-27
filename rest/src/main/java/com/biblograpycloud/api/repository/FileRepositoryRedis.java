package com.biblograpycloud.api.repository;

import com.biblograpycloud.api.UserFile;
import lombok.NonNull;
import lombok.val;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.stereotype.Repository;
import redis.clients.jedis.Jedis;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Class for storing user files
 * TODO: Change this to Redis
 */
@Repository
public class FileRepositoryRedis implements FileRepository {

    private final RedisTemplate<String, String> redisTemplate;
    private final ListOperations<String, String> listOperations;
    private final SetOperations<String, String> setOperations;

    private final Map<String, List<UserFile>> data;

    private Jedis jedis;

    public FileRepositoryRedis(RedisTemplate<String, String> redisTemplate) {
        this.redisTemplate = redisTemplate;
        this.listOperations = this.redisTemplate.opsForList();
        this.setOperations = this.redisTemplate.opsForSet();

        this.jedis = new Jedis();

        data = new HashMap<>();

        fillWithInitialData();
    }

    private void fillWithInitialData() {

        var user = "jan";
        redisTemplate.delete(user);
        var files = Arrays.asList(
                new UserFile(user, "Praca naukowa.pdf"),
                new UserFile(user, "Odbicia światła.pdf"),
                new UserFile(user, "Ciekawe dowody.pdf")
        );
        data.put(user, files);


        listOperations.rightPushAll(user, files.stream().map(f -> f.getName()).collect(Collectors.toList()));
        System.out.println(listOperations.size(user));

        List<String> tmp = listOperations.range(user, 0, -1);
        tmp.forEach(n -> System.out.println(n));

        user = "Atrox";
        redisTemplate.delete(user);
        files = Arrays.asList(
                new UserFile(user, "Zupy świata.pdf"),
                new UserFile(user, "Kompzycje przypraw.pdf"),
                new UserFile(user, "Najlepsze desery.pdf"),
                new UserFile(user, "Sztuka marynowania.pdf")
        );
        data.put(user, files);
    }

    public List<UserFile> getUserFiles(@NonNull String userName) {
        return getUserFiles(userName, 0, OptionalInt.empty());
    }

    public List<UserFile> getUserFiles(@NonNull String userName, int skip) {
        return getUserFiles(userName, skip, OptionalInt.empty());
    }

    public List<UserFile> getUserFiles(@NonNull String userName, int skip, OptionalInt limit) {
        if (!data.containsKey(userName)) {
            data.put(userName, new ArrayList<UserFile>());
        }

        var result = data.get(userName).stream().skip(skip);
        if (limit.isPresent()) {
            result = result.limit(limit.getAsInt());
        }

        return result.collect(Collectors.toList());
    }

    public void addUserFile(@NonNull String userName, @NonNull String fileName) {
        if (!data.containsKey(userName)) {
            data.put(userName, new LinkedList<UserFile>());
        }

        val file = new UserFile(userName, fileName);
        data.get(userName).add(file);
    }

}