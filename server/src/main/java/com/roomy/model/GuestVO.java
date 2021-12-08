package com.roomy.model;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

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
    private Long guestSeq;

    @Column(columnDefinition = "VARCHAR(20)", nullable = false)
    private String guestWriterName;

    @Column(columnDefinition = "VARCHAR(20)",nullable = false)
    private String guestCreateAt;

    @Column(columnDefinition = "VARCHAR(20)",nullable = false)
    private String guestUpdateAt;

    @Column(columnDefinition = "INT", nullable = false)
    private Boolean guestPrivate;

    @Column(columnDefinition = "VARCHAR(4000)", nullable = false)
    private String guestContent;

    @Column(columnDefinition = "BIGINT", nullable = false)
    private Long userSeq2;

    @Column(columnDefinition = "BIGINT", nullable = false)
    private Long guestWriterSeq;


}
