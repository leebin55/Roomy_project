package com.roomy.model;

import lombok.*;
import org.springframework.lang.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Getter
@Table(name ="tbl_user" , schema = "roomyDB")
@Data
public class User implements UserDetails {

//    pk를 user_seq 에서 userId로 변경해 필요없어짐
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "user_seq")
//    //회원번호
//    private Long id;

    // 화원 아이디
    @Id
    private String userId;

    // 비밀번호
    private String userPassword;

    // 이메일
    private String userEmail;

    // 성별
    private int userGender;

    // 생년월일
    private String userBirth;

    // 프로필 사진
    @Column(nullable = true)
    private String userprofile;

    // 회원 이름
    private String userName;

    // 회원 등급 ( 0 관리자 / 1 일반회원 )
    private int user_rank;

    @ElementCollection(fetch = FetchType.EAGER)
    @Builder.Default
    private List<String> roles = new ArrayList<>();


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        return userPassword;
    }

    @Override
    public String getUsername() {
        return userId;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
