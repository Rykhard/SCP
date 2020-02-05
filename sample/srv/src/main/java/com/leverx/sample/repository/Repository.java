package com.leverx.sample.repository;

import java.util.List;
import java.util.Optional;

import my.bookshop.Bags;

public interface Repository <T, K> {

    Optional<T> findById(K id);

    List<T> findAll();


}
