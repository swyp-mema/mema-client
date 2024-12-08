import MeetingStatusItem from '@/features/meet/main/MeetingStatusItem';
import BillStatusItem from '@/features/meet/main/BillStatusItem';
import React from 'react';
import styled from 'styled-components';

const MeetingContents = () => {
  return (
    <Container>
      <MeetingStatusItem
        status="completed"
        title="만나는 날짜 정하기"
        totalMembers={5}
        votedMembers={5}
        warningMessage=""
        voteResult="11/29"
      />
      <MeetingStatusItem
        status="inProgress"
        title="만나는 장소 정하기"
        totalMembers={5}
        votedMembers={3}
        warningMessage=""
      />
      <BillStatusItem status="notStarted" count={2} />
    </Container>
  );
};

export default MeetingContents;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
