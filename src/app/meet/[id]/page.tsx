'use client';
import React from 'react';
import TabBar from '@/components/TabBar';
import MeetingHeader from '@/features/meet/main/MeetingHeader';
import MeetingContents from '@/features/meet/main/MeetingContents';
import BasicLayout from '@/components/Layouts/BasicLayout';
import MeetingButtons from '@/features/meet/main/MeetingButtons';

function MeetIdPage() {
  const buttonConfig = {
    beforeSchedule: {
      mainButton: {
        name: '만나는 날짜 정하기',
        route: '/meet/1/schedule/create',
      },
      subButtons: [],
    },
    afterSchedule: {
      mainButton: {
        name: '날짜 투표 현황 보기',
        route: '/meet/1/schedule',
      },
      subButtons: [],
    },
    beforePlace: {
      mainButton: {
        name: '만나는 장소 정하기',
        route: '/meet/1/place',
      },
      subButtons: [{ name: '만나는 날짜 확인하기', route: '/meet/1/schedule' }],
    },
    afterPlace: {
      mainButton: {
        name: '장소 입력 현황 보기',
        route: '/meet/1/place',
      },
      subButtons: [{ name: '만나는 날짜 확인하기', route: '/meet/1/schedule' }],
    },
    bill: {
      mainButton: {
        name: '정산하기',
        route: '/meet/1/bill',
      },
      subButtons: [
        { name: '날짜 확인하기', route: '/meet/1/schedule' },
        { name: '장소 확인하기', route: '/meet/1/place' },
      ],
    },
  };
  const status = 'afterPlace'; // tmp
  const config = buttonConfig[status];

  return (
    <BasicLayout>
      <TabBar />
      <MeetingHeader />
      <MeetingContents />
      <MeetingButtons config={config} />
    </BasicLayout>
  );
}

export default MeetIdPage;
