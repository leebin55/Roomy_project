package com.roomy.model;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@EntityListeners(AuditingEntityListener.class)
@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name="tbl_guest", schema="roomyDB")
public class GuestVO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long guest_seq;

    @CreatedDate
    @Column(nullable = false)
    private LocalDateTime guest_create_at;

    @LastModifiedDate
    @Column(nullable = false)
    private LocalDateTime guest_update_at;

    @Column(columnDefinition = "VARCHAR(4000)", nullable = false)
    private String guest_content;

    @Column(columnDefinition = "INT", nullable = false)
    private Boolean guest_private;

    @Column(columnDefinition = "BIGINT", nullable = false)
    private Long guest_writer;
}
