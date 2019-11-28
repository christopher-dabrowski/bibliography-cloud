package com.biblograpycloud.api.repository;

import com.biblograpycloud.api.UserFile;
import lombok.NonNull;
import lombok.val;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOError;
import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.OptionalInt;
import java.util.stream.Collectors;

public interface FileRepository {

    List<UserFile> getUserFiles(@NonNull String userName);

    List<UserFile> getUserFiles(@NonNull String userName, int skip);

    List<UserFile> getUserFiles(@NonNull String userName, int skip, OptionalInt limit);

    void addUserFile(@NonNull String userName, @NonNull MultipartFile file) throws IOException;

    void deleteUserFile(@NonNull String userName, @NonNull String fileName);

    byte[] getActualFile(String userName, String fileName) throws IOException;
}
