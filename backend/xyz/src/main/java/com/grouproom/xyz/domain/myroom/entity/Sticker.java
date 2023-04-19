package com.grouproom.xyz.domain.myroom.entity;

import com.grouproom.xyz.domain.user.entity.ModifierColor;
import com.grouproom.xyz.domain.user.entity.ModifierGrade;
import com.grouproom.xyz.global.model.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

/**
 * packageName    : com.grouproom.xyz.domain.myroom.entity
 * fileName       : Sticker
 * author         : SSAFY
 * date           : 2023-04-19
 * description    :
 * <p>
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * <p>
 * 2023-04-19        SSAFY       최초 생성
 */
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Sticker extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sequence", nullable = false)
    private Long sequence;
    @Column(name = "name",length = 300)
    private String name;

    @Column(name = "image",length = 2083)
    private String image;
    @Column(name = "sticker_color")
    private StickerColor stickerColor;
    @Column(name = "sticker_grade")
    private StickerGrade stickerGrade;

}
