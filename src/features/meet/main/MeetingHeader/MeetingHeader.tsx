import MemberIconStack from '@/features/home/main/MemberIconStack';
import React from 'react';
import styled from 'styled-components';
import { Share2 } from 'react-feather';

const tmpMembers = [
  { puzzleId: 1, puzzleColor: 'blue' },
  { puzzleId: 2, puzzleColor: 'red' },
  { puzzleId: 3, puzzleColor: 'yellow' },
  { puzzleId: 4, puzzleColor: 'green' },
  { puzzleId: 5, puzzleColor: 'purple' },
];

const MeetingHeader = () => {
  return (
    <Container>
      <SpaceBetweenRow>
        <p className="title">찜닭머그러가자</p>
        <ShareIcon onClick={() => alert('기능 미정의')} />
      </SpaceBetweenRow>
      <Row>
        <p className="description">인원 {tmpMembers.length}명</p>
        <MemberIconStack members={tmpMembers} />
      </Row>
    </Container>
  );
};

export default MeetingHeader;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.primary.lighter};
  margin-bottom: 16px;
  .title {
    ${({ theme }) => theme.fonts.title.md};
  }
  .description {
    ${({ theme }) => theme.fonts.text.lg};
    color: white;
    margin-right: 10px;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SpaceBetweenRow = styled(Row)`
  justify-content: space-between;
`;

const ShareIcon = styled(Share2)`
  cursor: pointer;
`;
