import React, { useEffect } from 'react';
import * as S from './DetailPage.styles';
import type { DetailPageProps } from './DetailPage.types';
import bookmarket from '../../assets/icons/bookmarket.svg';
import bookmarketFill from '../../assets/icons/bookmark_fill.svg';
import { useParams } from 'react-router-dom';
import { useBookmark } from '../../hooks/useBookmark';
import { getPostingDetail } from '../../apis/detail';

function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const { bookmarkedIds, toggleBookmark } = useBookmark();
  const isBookmarked = id ? bookmarkedIds.includes(id) : false;
  // const [detailData, setDetailData] = React.useState<DetailPageProps | null>(
  //   null,
  // );

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await getPostingDetail(Number(id));
  //     setDetailData(data ?? null);
  //   };
  //   // fetchData();
  // }, [id]);

  // if (!detailData) {
  //   return <div>불러오기 실패</div>;
  // }

  return (
    <S.DetailContainer>
      <S.DetailHeader>
        <S.DetailCategory>카테고리 없음</S.DetailCategory>
        <S.DetailTitle>제목 없음</S.DetailTitle>
        <S.DetailInfo>
          <S.DetailTarget>대상 | 모두</S.DetailTarget>
          <S.DetailPeriod>
            기간 | 상시
            <img
              src={isBookmarked ? bookmarketFill : bookmarket}
              alt="북마크"
              style={{ cursor: 'pointer' }}
              onClick={() => id && toggleBookmark(id)}
            />
          </S.DetailPeriod>
        </S.DetailInfo>
      </S.DetailHeader>
      <S.DetailBody>detai</S.DetailBody>
    </S.DetailContainer>
  );
}

export default DetailPage;
