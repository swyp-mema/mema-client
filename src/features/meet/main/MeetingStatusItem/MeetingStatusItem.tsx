import styled from 'styled-components';
import ProgressBar from '@/components/ProgressBar';

interface Props {
  status: 'notStarted' | 'inProgress' | 'completed';
  title: string;
  totalMembers: number;
  votedMembers: number;
  warningMessage?: string;
  voteResult?: string;
}

const MeetingStatusItem = ({
  status,
  title,
  totalMembers,
  votedMembers,
  warningMessage,
  voteResult,
}: Props) => {
  const labelName = {
    notStarted: '이용 전',
    inProgress: '이용 중',
    completed: '완료',
  };
  return (
    <Container>
      <SpaceBetweenRow>
        <Row>
          <StatusLabel $status={status}>{labelName[status]}</StatusLabel>
          <p>{title}</p>
          {warningMessage && <WarningMessage>{warningMessage}</WarningMessage>}
          <p className="blueText">{voteResult}</p>
        </Row>
        <div>
          <CountText $isHighlighted={votedMembers > 0}>{votedMembers}</CountText>
          <CountText $isHighlighted={false}>&nbsp;/&nbsp;{totalMembers}</CountText>
        </div>
      </SpaceBetweenRow>
      <Row>
        <ProgressBar currentValue={votedMembers} maxValue={totalMembers} />
      </Row>
    </Container>
  );
};
export default MeetingStatusItem;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  padding: 16px;
  gap: 10px;
  background-color: ${({ theme }) => theme.colors.gray[6]};
  ${({ theme }) => theme.fonts.title.xs};
  .blueText {
    color: ${({ theme }) => theme.colors.primary.default};
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const SpaceBetweenRow = styled(Row)`
  justify-content: space-between;
`;

const StatusLabel = styled.p<{ $status: 'notStarted' | 'inProgress' | 'completed' }>`
  ${({ theme }) => theme.fonts.title.xs};
  color: ${({ $status, theme }) => {
    const statusColors = {
      notStarted: theme.colors.gray[4],
      inProgress: theme.colors.green,
      completed: theme.colors.blue,
    };
    return statusColors[$status];
  }};
`;

const WarningMessage = styled.p`
  ${({ theme }) => theme.fonts.text.lg};
  color: ${({ theme }) => theme.colors.red};
`;

const CountText = styled.span<{ $isHighlighted: boolean }>`
  ${({ theme }) => theme.fonts.text.md};
  color: ${({ $isHighlighted, theme }) =>
    $isHighlighted ? theme.colors.blue : theme.colors.gray[4]};
`;
