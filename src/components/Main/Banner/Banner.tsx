import React from 'react';
import * as S from './Banner.styles';
import arrow_right_circle from '../../../assets/icons/arrow_right_circle.svg';
import bell from '../../../assets/icons/notifications_banner.svg';
import { BannerProps } from './Banner.types';

// TODO Body값 받아와서 뿌려주기(type), 바로가기 네비게이트 설정

export default function Banner() {
  return (
    <S.BannerContainer aria-label="채용 공고 알림 배너">
      <S.Title>
        저장된 공고 중에 <br /> 기간이 끝나가는 것이 있어요!
      </S.Title>
      <S.Body>국내 정기거주 아동 교육권 보장을 위한 체류자격 부여 방안</S.Body>
      <S.Button>
        바로가기 <img src={arrow_right_circle} alt="" />
      </S.Button>
      <S.BellIcon>
        <img src={bell} alt="알림 벨 아이콘" />
      </S.BellIcon>
    </S.BannerContainer>
  );
}
