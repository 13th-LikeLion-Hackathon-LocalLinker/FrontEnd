import React from 'react';
import * as S from './Banner.styles';
import arrow_right_circle from '../../../assets/icons/arrow_right_circle.svg';
import bell from '../../../assets/icons/notifications_banner.svg';
import { useNavigate } from 'react-router-dom';
import type { BannerProps } from './Banner.types';

export default function Banner({
  title = '저장된 공고 중에 \n기간이 끝나가는 것이 있어요!',
  body = '국내 정기거주 아동 교육권 보장을 위한 체류자격 부여 방안',
}: BannerProps) {
  const navigate = useNavigate();
  const goBookmarked = () => navigate('/bookmarked');

  return (
    <S.BannerContainer aria-label="채용 공고 알림 배너">
      <S.Title>
        {title.split('\n').map((line, i) => (
          <React.Fragment key={i}>
            {line}
            {i === 0 && <br />}
          </React.Fragment>
        ))}
      </S.Title>

      <S.Body>{body}</S.Body>

      <S.Button type="button" onClick={goBookmarked} aria-label="북마크한 공고 페이지로 이동">
        바로가기 <img src={arrow_right_circle} alt="" />
      </S.Button>

      <S.BellIcon>
        <img src={bell} alt="알림 벨 아이콘" />
      </S.BellIcon>
    </S.BannerContainer>
  );
}
