import styled from 'styled-components';

interface Props {
  currentValue: number;
  maxValue: number;
}

const ProgressBar = ({ currentValue, maxValue }: Props) => {
  const progress = maxValue === 0 ? 0 : (currentValue / maxValue) * 100;

  return (
    <ProgressBarContainer>
      <ProgressBarFill $progress={progress} />
    </ProgressBarContainer>
  );
};

export default ProgressBar;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 20px;
  background-color: ${({ theme }) => theme.colors.gray[5]};
  border-radius: 15px;
  overflow: hidden;
`;

const ProgressBarFill = styled.div<{ $progress: number }>`
  width: ${({ $progress }) => $progress}%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.blue};
  transition: width 0.3s ease;
`;
