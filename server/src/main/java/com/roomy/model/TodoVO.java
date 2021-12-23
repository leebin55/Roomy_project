package com.roomy.model;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "tbl_todo")
public class TodoVO {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(name = "todo_ok", columnDefinition = "boolean default false")
    private Boolean ok;

    @Column(name = "todo_content", columnDefinition = "VARCHAR(125)")
    private String content;

    @Column(name = "todo_important", columnDefinition = "int")
    @ColumnDefault("0")
    private Integer important;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @Column(name = "todo_user_id", columnDefinition = "VARCHAR(20)")
    private String userId;

//    @Builder
//    public Todo(String content, LocalDateTime createdAt) {
//        this.content = content;
//        this.createdAt = createdAt;
//    }
}