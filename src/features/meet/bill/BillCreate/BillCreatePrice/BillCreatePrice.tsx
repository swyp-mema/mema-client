'use client';
import React from 'react';
import styled from 'styled-components';
import Input from '@/components/Input';
import InputWrapper from '@/components/Input/InputWrapper';
import Button from '@/components/Button';
import TabBar from '@/components/TabBar';
import { useSearchParams } from 'next/navigation';

type Props = {
  data: {
    content: string;
    totalPrice: number;
    peopleNumber: number;
    memberIds: number[];
  };
  members: {
    userId: number;
    nickname: string;
    puzzleId?: number;
    puzzleColor?: string;
    isMe?: boolean;
  }[];
  value: string;
  isAllSelected: boolean;
  isFocused: boolean;
  isEmpty: boolean;
  handleFocus: () => void;
  handleBlur: () => void;
  handleChange: (newValue: string) => void;
  onClickBack: () => void;
  onClickSelect: (id: number) => void;
  onClickAllSelect: () => void;
  onClickStep2: () => void;
};

const BillCreatePrice = ({
  data,
  members,
  value,
  isAllSelected,
  isFocused,
  isEmpty,
  handleFocus,
  handleBlur,
  handleChange,
  onClickBack,
  onClickSelect,
  onClickAllSelect,
  onClickStep2,
}: Props) => {
  const searchParams = useSearchParams();
  const searchParam = Number(searchParams.get('chargeId'));

  return (
    <Container>
      <TabBar onClickBack={onClickBack} />
      <p className="billCreatePriceTitle">
        <b>{data.content}</b>에서의
        <br />
        결제 금액을 알려주세요!
      </p>
      <InputWrapper isEmpty={isEmpty} isFocused={isFocused}>
        <Input
          value={value}
          type="number"
          placeholder="금액 입력하기 (원)"
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </InputWrapper>
      <div className="billCreatePersonContainer">
        <div className="billCreatePersonTop">
          <p>누구와 함께했나요?</p>
          <div className="allSelectBtn" onClick={onClickAllSelect}>
            {isAllSelected ? '전체 해제' : '전체 선택'}
          </div>
        </div>
        <div className="billCreatePersonBtnG">
          {members.map((member) => (
            <button
              key={member.userId}
              className={`billCreatePersonBtn ${data.memberIds.includes(member.userId) && 'active'}`}
              disabled={member.isMe}
              onClick={() => onClickSelect(member.userId)}
            >
              {member.nickname}
            </button>
          ))}
        </div>
      </div>
      <div className="billCreateBottom">
        <div className="wrapper">
          <p>
            <b>{value ? value : 0}</b>원 ÷ <b>{data.memberIds.length}</b>명
          </p>
          <p>
            인당 결제 금액은
            <br />
            <b>{Number(value) / data.memberIds.length}</b>원 이에요!
          </p>
        </div>
        <Button
          name={searchParam === 0 ? '정산 공유하기' : '수정하기'}
          disabled={data.totalPrice === 0}
          onClick={onClickStep2}
        />
      </div>
    </Container>
  );
};

const Container = styled.div`
  .billCreatePriceTitle {
    font-size: ${({ theme }) => theme.fonts.text['2xl']};
    margin-bottom: 20px;
    b {
      ${({ theme }) => theme.fonts.title['md']};
    }
  }
  .billCreatePersonContainer {
    margin: 70px 0 20px;
    .billCreatePersonTop {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: ${({ theme }) => theme.fonts.text['2xl']};
      margin-bottom: 20px;
      .allSelectBtn {
        padding: 4px 10px;
        color: ${({ theme }) => theme.colors.gray[4]};
        ${({ theme }) => theme.fonts.text['md']};
        cursor: pointer;
      }
    }
    .billCreatePersonBtnG {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      .billCreatePersonBtn {
        outline: none;
        border: none;
        ${({ theme }) => theme.fonts.text.lg};
        padding: 6px 12px;
        border-radius: ${({ theme }) => theme.borderRadius.medium};
        background-color: ${({ theme }) => theme.colors.gray[6]};
        color: ${({ theme }) => theme.colors.black};
        cursor: pointer;
        &.active {
          background-color: ${({ theme }) => theme.colors.primary.default};
          color: ${({ theme }) => theme.colors.white};
        }
        &:disabled {
          background-color: ${({ theme }) => theme.colors.primary.default};
          color: ${({ theme }) => theme.colors.white};
        }
      }
    }
  }
  .billCreateBottom {
    background-color: ${({ theme }) => theme.colors.white};
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 358px;
    padding-bottom: 34px;
    @media (max-width: 390px) {
      width: calc(100% - 32px);
    }
    .wrapper {
      display: flex;
      justify-content: space-between;
      margin-bottom: 24px;
      font-size: ${({ theme }) => theme.fonts.text['2xl']};
      b {
        ${({ theme }) => theme.fonts.title['md']};
      }
    }
  }
`;

export default BillCreatePrice;
