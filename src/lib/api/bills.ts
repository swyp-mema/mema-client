import { Bill, Bills } from '@/types/bills';
import { AxiosResponse } from 'axios';
import { mockbillData, mockbillsData } from './mock/bills';
import { defaultAxios } from './defaultAxios';

// 정산 전체조회
export const getBills = async (meetId: number): Promise<AxiosResponse<Bills>> => {
  console.log(`Mock API 호출: /meets/${meetId}/charge/total`);
  return new Promise<AxiosResponse<Bills>>((resolve) =>
    setTimeout(
      () =>
        resolve({
          data: mockbillsData,
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {},
          request: {},
        } as AxiosResponse<Bills>),
      500,
    ),
  );
};
// export const getBills = async (meetId: number) => {
//   return await defaultAxios.get(`/meets/${meetId}/charge/total`);
// };

// 정산 개별조회
export const getBill = async ({
  meetId,
  chargeId,
}: {
  meetId: number;
  chargeId: number;
}): Promise<AxiosResponse<Bill>> => {
  console.log(`Mock API 호출: /meets/${meetId}/charge/${chargeId}`);
  return new Promise<AxiosResponse<Bill>>((resolve) =>
    setTimeout(
      () =>
        resolve({
          data: mockbillData,
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {},
          request: {},
        } as AxiosResponse<Bill>),
      500,
    ),
  );
};
// export const getBill = async ({ meetId, chargeId }: { meetId: number; chargeId: number }) => {
//   return await defaultAxios.get(`/meets/${meetId}/charge/${chargeId}`);
// };

// 정산 나의피정산조회
export const getBillPayfor = async (meetId: number): Promise<AxiosResponse<Bills>> => {
  console.log(`Mock API 호출: /meets/${meetId}/charge/payfor`);
  return new Promise<AxiosResponse<Bills>>((resolve) =>
    setTimeout(
      () =>
        resolve({
          data: mockbillsData,
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {},
          request: {},
        } as AxiosResponse<Bills>),
      500,
    ),
  );
};
// export const getBillPayfor = async (meetId: number) => {
//   return await defaultAxios.get(`/meets/${meetId}/charge/payfor`);
// };

// 정산 생성
export const createBill = async ({
  meetId,
  data,
}: {
  meetId: number;
  data: {
    content: string;
    totalPrice: number;
    peopleNumber: number;
    memberIds: number[];
  };
}) => {
  console.log(`Mock API 호출: /meets/${meetId}/charge CREATE, data:${data}`);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 201,
        message: '정상적으로 정산이 생성되었습니다.',
        data,
      });
    }, 500);
  });
};
// export const createBill = async (
//   meetId: number,
//   data: {
//     content: string;
//     totalPrice: string;
//     peopleNumber: string;
//     memberIds: number[];
//   },
// ) => {
//   await defaultAxios.post(`/meets/${meetId}/charge`, data);
// };

// 정산 수정
export const updateBill = async ({
  meetId,
  chargeId,
  data,
}: {
  meetId: number;
  chargeId: number;
  data: { content: string; totalPrice: number; peopleNumber: number; memberIds: number[] };
}) => {
  console.log(`Mock API 호출: /meets/${meetId}/charge/${chargeId} PATCH, data: ${data}`);
  return new Promise((resolve) => setTimeout(() => resolve(''), 500));
};

// export const updateBill = async ({
//   meetId,
//   chargeId,
//   data,
// }: {
//   meetId: number;
//   chargeId: number;
//   data: { content: string; totalPrice: number; peopleNumber: number; memberIds: number[] };
// }) => {
//   await defaultAxios.patch(`/meets/${meetId}/charge/${chargeId}`, data);
// };

// 정산 삭제
export const deleteBill = async ({
  meetId,
  chargeId,
}: {
  meetId: number;
  chargeId: number;
}): Promise<AxiosResponse> => {
  console.log(`Mock API 호출: /meets/${meetId}/charge/${chargeId} DELETE`);
  return new Promise<AxiosResponse>((resolve) =>
    setTimeout(() => {
      resolve({
        data: null,
        status: 204,
        statusText: 'OK',
        headers: {},
        config: {},
        request: {},
      } as AxiosResponse);
    }, 500),
  );
};
// export const deleteBill = async ({ meetId, chargeId }: { meetId: number; chargeId: number }) => {
//   await defaultAxios.delete(`/meets/${meetId}/charge/${chargeId}`);
// };
