"use client";
import Textbox from "../common/Textbox";
import Image from "next/image";
import React, { useState } from "react";
import ProfileDropdown from "./ProfileDropdown";
import { useUserList } from "@/hooks/queries/user";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logOut, withDraw } from "@/app/api/user";
import { useDispatch } from "react-redux";
import {
  updateAccessToken,
  updateLoginStatus,
  updateUserInfo,
} from "@/store/authSlice";
import { queryKeys } from "@/constants/queryKeys";
import ModalBtn from "../common/ModalBtn";
import { useAppSelector } from "@/hooks/redux";
import { deleteFollow, postBlock } from "@/app/api/friend";
import { KEYS } from "@/constants/queryKeys";

interface ProfileMainProps {
  userSeq: number;
}

function ProfileMain({ userSeq }: ProfileMainProps) {
  const { data: profileData, isLoading } = useUserList(userSeq);
  console.log(profileData, "profileData");
  const state = useAppSelector((state) => state);
  const myUserSeq = state.auth.userInfo?.userSeq;

  const [isModal, setIsModal] = useState(false);
  const router = useRouter();
  const pushToProfileEdit = () => {
    router.push("/profile/edit");
  };

  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const deleteUserInfo = () => {
    dispatch(updateLoginStatus(false));
    dispatch(updateAccessToken(""));
    dispatch(updateUserInfo(null));
    router.push("/");
  };

  const useLogOutMutation = useMutation({
    mutationFn: () => logOut(),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.user.userList(+userSeq!));
      alert("로그아웃 완료");
      deleteUserInfo();
    },
  });

  const useWithDrawMutation = useMutation({
    mutationFn: () => withDraw(),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.user.userList(+userSeq!));
      alert("회원탈퇴 되었어요 ㅠㅠ");
      deleteUserInfo();
    },
  });

  const handleClickLogOut = () => {
    useLogOutMutation.mutate();
  };
  const handleYesWithDraw = () => {
    useWithDrawMutation.mutate();
  };

  const useDeleteFollowMutation = useMutation({
    mutationFn: () => deleteFollow(userSeq),
    onSuccess: () => {
      queryClient.invalidateQueries(KEYS.friend);
    },
  });

  const usePostBlockMutation = useMutation({
    mutationFn: () => postBlock(userSeq),
    onSuccess: () => {
      queryClient.invalidateQueries(KEYS.friend);
    },
  });

  const handleClickDeleteFollow = () => {
    useDeleteFollowMutation.mutate();
  };

  const handleClickBlock = () => {
    usePostBlockMutation.mutate();
  };

  const userSeqToNumber = +userSeq;
  // 여기 모달창 띄워야한다. 친구 끊기 / 차단할때
  return (
    <>
      <div className={`box-content w-full h-full bg-yellow py-2 px-2`}>
        <div className="flex flex-row gap-2 items-center justify-center h-full w-full">
          <div className="object-cover h-[90%] w-[90%]">
            <img
              src={profileData?.profileImage}
              height={150}
              alt="profileImg"
            />
          </div>
          {/* 유저 본인일 때 이 드롭다운이 보이게 하기 */}
          <div>
            <div className="flex gap-10 item-center">
              {profileData?.identify}
              {userSeqToNumber === myUserSeq ? (
                <ProfileDropdown
                  firstText="프로필 편집"
                  firstFunc={pushToProfileEdit}
                  secondText="로그아웃"
                  secondFunc={handleClickLogOut}
                  thirdText="탈퇴하기"
                  thirdFunc={() => setIsModal(true)}
                />
              ) : profileData?.friend === true ? (
                <ProfileDropdown
                  firstText="친구 끊기"
                  firstFunc={handleClickDeleteFollow}
                  secondText="차단하기"
                  secondFunc={handleClickBlock}
                />
              ) : (
                <ProfileDropdown
                  firstText="차단하기"
                  firstFunc={handleClickBlock}
                />
              )}
            </div>
            <Textbox
              icon="/icons/edit.svg"
              alt="pretty"
              text="수식어"
              maintext={profileData?.modifier}
              firstClass="border border-black flex my-2 items-center"
              secondClass="flex items-center justify-center mx-1 h-full "
              textClass=" whitespace-nowrap ml-1"
              maintextClass=" px-1 border-black border-l h-full"
            />
            <Textbox
              icon="/icons/avatar.svg"
              alt="nickname"
              text="닉네임"
              maintext={profileData?.nickname}
              firstClass="border border-black flex my-3 items-center "
              secondClass="flex flex-none items-center justify-center mx-1"
              textClass="whitespace-nowrap ml-1"
              maintextClass="px-1 border-black border-l"
            />
            <Textbox
              icon="/icons/user.svg"
              alt="visitor"
              text="방문자"
              maintext={profileData?.visitCount}
              firstClass="border border-black flex my-2 items-center"
            />
          </div>
        </div>
        <div className="border-2 border-black m-1 h-[92px] shadow-lg pb-2">
          <div className="border-black border-b-2">자기소개 한 마디</div>
          <div className="">{profileData?.introduce}</div>
        </div>
      </div>
      {isModal && (
        <ModalBtn
          yesFunc={handleYesWithDraw}
          closeModal={() => setIsModal(false)}
          text="정말 탈퇴할까요 ㅠㅠ?"
        />
      )}
    </>
  );
}

export default ProfileMain;
