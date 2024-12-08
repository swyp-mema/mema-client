import styled from 'styled-components';

interface Props {
  status: 'notStarted' | 'completed';
  count: number;
}

const statusLabel = {
  notStarted: '이용 전',
  completed: '약속 끝!',
};

const BillStatusItem = ({ status, count }: Props) => {
  return (
    <Container>
      <Row>
        <StatusLabel status={status}>{statusLabel[status]}</StatusLabel>
        <p>정산하기</p>
      </Row>
      <Row>
        <p className="description">공유된 정산 : </p>
        <div>
          <span className="blueText">{count}</span>
          <span>개</span>
        </div>
      </Row>
    </Container>
  );
};

export default BillStatusItem;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 15px;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.gray[6]};
  ${({ theme }) => theme.fonts.title.xs};
  .description {
    ${({ theme }) => theme.fonts.text.xl};
    color: ${({ theme }) => theme.colors.gray[4]};
  }
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

const StatusLabel = styled.p<{ status: 'notStarted' | 'completed' }>`
  ${({ theme }) => theme.fonts.title.xs};
  color: ${({ status, theme }) =>
    status === 'notStarted' ? theme.colors.gray[4] : theme.colors.primary.default};
`;
