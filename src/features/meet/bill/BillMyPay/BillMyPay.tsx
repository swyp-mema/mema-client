import { Bills } from '@/types/bills';
import React from 'react';
import styled from 'styled-components';

type Props = {
  payFors: Bills;
};

const BillMyPay = ({ payFors }: Props) => {
  return (
    <Container>
      <p className="paymentTitle">내가 보내야 할 돈</p>
      <div className="paymentContainer">
        {payFors.charges.map((payFor) => (
          <p key={payFor.chargeId} className="payment">
            <span>
              <b className="paymentName">{payFor.payeeNickname}</b>님에게
            </span>
            <span>
              <b className="paymentPrice">{payFor.totalPrice / payFor.peopleNumber}</b>원
            </span>
          </p>
        ))}
      </div>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 10px;
  border: 2px solid ${({ theme }) => theme.colors.primary.default};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: 16px;
  .paymentTitle {
    ${({ theme }) => theme.fonts.title['md']};
    margin-bottom: 20px;
  }
  .paymentContainer {
    display: flex;
    flex-direction: column;
    gap: 8px;
    .payment {
      ${({ theme }) => theme.fonts.text['lg']};
      & > span:first-child {
        margin-right: 10px;
      }

      .paymentName {
        ${({ theme }) => theme.fonts.text['xl']};
      }
      .paymentPrice {
        ${({ theme }) => theme.fonts.title['xs']};
        color: ${({ theme }) => theme.colors.primary.default};
      }
    }
  }
`;

export default BillMyPay;
