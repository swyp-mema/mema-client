import Button from '@/components/Button';
import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';

interface SubButton {
  name: string;
  route: string;
}
interface MainButton {
  name: string;
  route: string;
}
interface MeetingButtonsConfig {
  mainButton: MainButton;
  subButtons: SubButton[];
}
interface MeetingButtonsProps {
  config: MeetingButtonsConfig;
}

const MeetingButtons = ({ config }: MeetingButtonsProps) => {
  const router = useRouter();
  return (
    <ButtonContainer>
      <SubButtonContainer>
        {config.subButtons.map((subButton, index) => (
          <Button
            key={index}
            name={subButton.name}
            onClick={() => router.push(subButton.route)}
            buttonType="ghost"
          />
        ))}
      </SubButtonContainer>
      <Button name={config.mainButton.name} onClick={() => router.push(config.mainButton.route)} />
    </ButtonContainer>
  );
};

export default MeetingButtons;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 34px;
  width: calc(100% - 32px);
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SubButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;
