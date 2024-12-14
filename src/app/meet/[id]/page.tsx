'use client';
import React, { useCallback, useEffect, useState } from 'react';
import TabBar from '@/components/TabBar';
import MeetingHeader from '@/features/meet/main/MeetingHeader';
import BasicLayout from '@/components/Layouts/BasicLayout';
import MeetingButtons from '@/features/meet/main/MeetingButtons';
import Modal from '@/components/Modal';
import { LargeText, Text } from '@/components/Modal/modalTypography';
import useToggle from '@/lib/hooks/useToggle';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { MeetResponse, MeetStatus } from '@/types/meets';
import { getMeet } from '@/lib/api/meets';
import { useParams, useRouter } from 'next/navigation';
import { toDate } from '@/lib/utils/dateUtils';
import { getBills } from '@/lib/api/bills';
import { Bills } from '@/types/bills';
import styled from 'styled-components';
import MeetingBillItem from '@/features/meet/main/MeetingContents/MeetingBillItem';
import MeetingDateItem from '@/features/meet/main/MeetingContents/MeetingDateItem';
import MeetingPlaceItem from '@/features/meet/main/MeetingContents/MeetingPlaceItem';
import { getAllSchedules } from '@/lib/api/schedules';
import { ScheduleResponse, VoteDate } from '@/types/schedules';
import { MEET_STATUS } from '@/constants/meetConst';
import { userMeetStore } from '@/store/userMeetStore';
import { useScheduleStatus } from '@/lib/hooks/useScheduleStatus';

function MeetIdPage() {
  const router = useRouter();
  const params = useParams();
  const meetId = (params?.id && Number(params.id)) || null;
  const { getMeetMemberId, setMeetMemberId } = userMeetStore();
  const [isOpenModal, toggleOpenModal] = useToggle();
  const [meetStatus, setMeetStatus] = useState<MeetStatus>(MEET_STATUS.SCHEDULE_BEFORE_USE);
  const [meetWarningMessage, setMeetWarningMessage] = useState<string>('');

  /** API */
  const { data: meet } = useQuery<AxiosResponse<MeetResponse>>({
    queryKey: ['meet', meetId],
    queryFn: () => getMeet(meetId as number),
    enabled: meetId !== null,
  });

  const { data: schedules } = useQuery<AxiosResponse<ScheduleResponse>>({
    queryKey: ['schedules', meetId],
    queryFn: () => getAllSchedules(meetId as number),
    enabled: meetId !== null,
  });

  const { data: bills } = useQuery<AxiosResponse<Bills[]>>({
    queryKey: ['bills', meetId],
    queryFn: () => getBills(meetId as number),
    enabled: meetId !== null,
  });

  /** Custom Functions */
  const getScheduleUniqueVoterCount = useCallback(() => {
    const uniqueMemberIds = new Set();

    schedules?.data.voteDates.forEach((voteDate) => {
      voteDate.members.forEach((member) => {
        uniqueMemberIds.add(member.meetMemberId);
      });
    });

    return uniqueMemberIds.size;
  }, [schedules]);

  const hasUserVotedSchedule = useCallback(
    (schedules: VoteDate[], memberId: number | null): boolean => {
      if (!meetId) return false;
      return schedules.some((voteDate) =>
        voteDate.members.some((member) => member.meetMemberId === memberId),
      );
    },
    [meetId],
  );

  const getFullParticipationDateCount = (voteDates: VoteDate[], totalMemberCount: number) => {
    const fullParticipationDates = voteDates.filter(
      (voteDate) => voteDate.members.length === totalMemberCount,
    );
    return fullParticipationDates.length;
  };

  const getTotalVotedMembers = (voteDates: VoteDate[]) => {
    const uniqueMemberIds = new Set<number>();

    voteDates.forEach((voteDate) => {
      voteDate.members.forEach((member) => {
        uniqueMemberIds.add(member.meetMemberId);
      });
    });

    return uniqueMemberIds.size;
  };

  /** useEffects */
  // 미팅 상태 저장
  useEffect(() => {
    if (!meet || !schedules) return;
    const { meetDate, voteExpiredDate, voteExpiredLocation, meetLocation } = meet.data;
    const isVoteExpired = new Date() > new Date(meet.data.voteExpiredDate);
    // const totalMemberCount = meet.data.members.length;
    const votedMemberCount = getTotalVotedMembers(schedules.data.voteDates);
    const hasIVoted = hasUserVotedSchedule(
      schedules.data.voteDates,
      getMeetMemberId(meet.data.meetId),
    );
    const fullParticipationDateCount = getFullParticipationDateCount(
      schedules.data.voteDates,
      votedMemberCount,
    );

    if (voteExpiredDate === null) {
      // 미팅 시작 전
      setMeetStatus(MEET_STATUS.SCHEDULE_BEFORE_USE);
    } else if (!meetDate && voteExpiredDate) {
      // 미팅 진행 중
      if (isVoteExpired) {
        // 일정 투표 만료
        if (fullParticipationDateCount === 0) {
          setMeetStatus(MEET_STATUS.SCHEDULE_AFTER_USE);
          setMeetWarningMessage('가능한 날짜가 없어요! 재투표가 필요해요.');
        } else {
          setMeetStatus(MEET_STATUS.SCHEDULE_AFTER_USE);
        }
      } else {
        // 일정 투표 만료 이전
        if (hasIVoted) {
          setMeetStatus(MEET_STATUS.SCHEDULE_AFTER_USE);
        } else {
          setMeetStatus(MEET_STATUS.SCHEDULE_CREATED_BUT_BEFORE_USE);
        }
      }
    } else if (meetDate) {
      // 미팅 일정 확정
      if (!meetLocation) {
        // 장소 확정 이전
        if (!voteExpiredLocation) {
          setMeetStatus(MEET_STATUS.PLACE_BEFORE_USE);
        } else if (voteExpiredLocation) {
          setMeetStatus(MEET_STATUS.PLACE_AFTER_USE);
        }
      } else {
        // 장소 확정 후
        if (new Date(meetDate) > new Date()) {
          setMeetStatus(MEET_STATUS.BILL_BEFORE_MEET);
        } else {
          setMeetStatus(MEET_STATUS.BILL_AFTER_MEET);
        }
      }
    }
  }, [meet, schedules, getMeetMemberId, hasUserVotedSchedule]);

  // 나의 미팅 멤버 아이디 저장
  useEffect(() => {
    if (!meetId || !meet) return;
    const myMeetMemberId = getMeetMemberId(meetId);
    if (!myMeetMemberId) {
      console.log(meet.data.members);
      const foundMeetMemberId = meet.data.members.find((member) => member.isMe)?.meetMemberId;
      if (foundMeetMemberId) {
        setMeetMemberId(meetId, foundMeetMemberId);
      }
    }
  }, [meetId, meet, getMeetMemberId, setMeetMemberId]);

  // 일정 투표 상태 저장
  useScheduleStatus({
    meetId,
    meet: meet?.data,
    schedules: schedules?.data,
  });

  if (!meetId || !meet || !bills || !schedules) return;

  return (
    <BasicLayout>
      <TabBar onClickBack={() => router.push(`/`)} />
      <MeetingHeader
        meetName={meet.data.meetName}
        members={meet.data.members}
        joinCode={meet.data.joinCode}
        onClickShare={toggleOpenModal}
      />
      <Container>
        <MeetingDateItem
          totalMembers={meet.data.members.length}
          voteExpiredDate={toDate(meet.data.voteExpiredDate)}
          meetDate={meet.data.meetDate}
          votedMembers={getScheduleUniqueVoterCount()}
          warningMessage={meetWarningMessage}
        />
        <MeetingPlaceItem
          totalMembers={meet.data.members.length}
          voteExpiredLocation={toDate(meet.data.voteExpiredLocation)}
          meetLocation={meet.data.meetLocation}
          votedMembers={0}
        />
        <MeetingBillItem
          isAfterMeet={meetStatus === MEET_STATUS.BILL_AFTER_MEET}
          billCount={bills.data.length}
        />
      </Container>
      <MeetingButtons meetId={meetId} status={meetStatus} />
      {isOpenModal && (
        <Modal type="Ok" onOk={toggleOpenModal} width={326}>
          <Text>
            참여코드 복사 완료!
            <br />
          </Text>
          <LargeText>{meet.data.joinCode}</LargeText>
        </Modal>
      )}
    </BasicLayout>
  );
}

export default MeetIdPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
