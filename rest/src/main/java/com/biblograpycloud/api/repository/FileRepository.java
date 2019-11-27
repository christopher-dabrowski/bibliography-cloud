package com.biblograpycloud.api.repository;

import com.biblograpycloud.api.UserFile;
import lombok.NonNull;
import lombok.val;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.OptionalInt;
import java.util.stream.Collectors;

public interface FileRepository {

    public List<UserFile> getUserFiles(@NonNull String userName);

    public List<UserFile> getUserFiles(@NonNull String userName, int skip);

    public List<UserFile> getUserFiles(@NonNull String userName, int skip, OptionalInt limit);

    public void addUserFile(@NonNull String userName, @NonNull String fileName);
}
