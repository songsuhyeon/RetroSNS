package com.grouproom.xyz.domain.azt.controller;

import com.grouproom.xyz.domain.azt.dto.request.AztRequest;
import com.grouproom.xyz.domain.azt.service.AztService;
import com.grouproom.xyz.global.model.BaseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.logging.Logger;

@RequiredArgsConstructor
@RestController
@RequestMapping("/azt")
public class AztController {

    private final Logger logger = Logger.getLogger("com.grouproom.xyz.domain.azt.controller.AztController");
    private final AztService aztService;

    @GetMapping ("/all")
    public BaseResponse<?> aztList() {
        logger.info("aztList 호출");
        Long loginSeq = 1L;
        return new BaseResponse<>(aztService.findAztList(loginSeq));
    }

    @GetMapping ("/{aztSeq}")
    public BaseResponse<?> aztDetails(@PathVariable("aztSeq") Long aztSeq) {
        logger.info("aztDetails 호출");
        Long loginSeq = 1L;
        try {
            return new BaseResponse<>(aztService.findAzt(loginSeq, aztSeq));
        } catch (Exception e) {
            return new BaseResponse<>(HttpStatus.BAD_REQUEST, "실패", "");
        }
    }

    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public BaseResponse<?> addAzt(@RequestPart AztRequest aztRequest, @RequestPart(required = false) MultipartFile image) {
        logger.info("addAzt 호출");
        Long loginSeq = 1L;
        try {
            return new BaseResponse<>(aztService.addAzt(loginSeq, aztRequest, image));
        } catch (Exception e) {
            return new BaseResponse<>(HttpStatus.BAD_REQUEST, "실패", "");
        }
    }

    @PutMapping
    public BaseResponse<?> modifyAzt(@RequestBody AztRequest aztRequest) {
        logger.info("modifyAzt 호출");
        Long loginSeq = 1L;
        try {
            return new BaseResponse<>(aztService.modifyAzt(loginSeq, aztRequest));
        } catch (Exception e) {
            return new BaseResponse<>(HttpStatus.BAD_REQUEST, "실패", "");
        }
    }

    @GetMapping("")
    public BaseResponse<?> friendList(@RequestParam Long aztSeq) {
        logger.info("friendList 호출");
        Long loginSeq = 1L;
        return new BaseResponse<>(aztService.findFriendForMembers(loginSeq, aztSeq));
    }

    @PostMapping("/member")
    public BaseResponse<?> addAztMember(@RequestBody AztRequest aztRequest) {
        logger.info("addAztMember 호출");
        Long loginSeq = 1L;
        try {
            return new BaseResponse<>(aztService.addAztMember(loginSeq, aztRequest));
        } catch (Exception e) {
            return new BaseResponse<>(HttpStatus.BAD_REQUEST, "실패", "");
        }
    }

    @DeleteMapping("/member/{aztSeq}")
    public BaseResponse<?> modifyAztMemberToDelete(@PathVariable("aztSeq") Long aztSeq) {
        logger.info("modifyAztMemberToDelete 호출");
        Long loginSeq = 1L;
        try {
            return new BaseResponse<>(aztService.modifyAztMemberToDelete(loginSeq, aztSeq));
        } catch (Exception e) {
            return new BaseResponse<>(HttpStatus.BAD_REQUEST, "실패", "");
        }
    }

}
