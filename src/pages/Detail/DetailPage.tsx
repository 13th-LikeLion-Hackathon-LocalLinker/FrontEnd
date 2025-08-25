import React, { useEffect } from 'react';
import * as S from './DetailPage.styles';
import type { DetailPageProps } from './DetailPage.types';
import bookmarket from '../../assets/icons/bookmarket.svg';
import bookmarketFill from '../../assets/icons/bookmark_fill.svg';
import { useParams } from 'react-router-dom';
import { useBookmark } from '../../hooks/useBookmark';
import { getPostingDetail } from '../../apis/detail';

const formatDate = (dateString: string) => {
  const d = new Date(dateString);
  const yy = String(d.getFullYear()).slice(2); // 뒤 2자리
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yy}.${mm}.${dd}`;
};

function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const { bookmarkedIds, toggleBookmark } = useBookmark();
  const isBookmarked = id ? bookmarkedIds.includes(id) : false;
  const [detailData, setDetailData] = React.useState<DetailPageProps | null>(
    null,
  );

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPostingDetail(Number(id));
      setDetailData(data ?? null);
    };
    fetchData();
  }, [id]);

  if (!detailData) {
    return <div>loading...</div>;
  }

  return (
    <S.DetailContainer>
      <S.DetailHeader>
        <S.DetailCategory>{detailData.category}</S.DetailCategory>
        <S.DetailTitle>{detailData.title}</S.DetailTitle>
        <S.DetailInfo>
          <S.DetailTarget>대상 | {detailData.eligibility}</S.DetailTarget>
          <S.DetailPeriod>
            기간 |{' '}
            {detailData.applyStartAt
              ? formatDate(detailData.applyStartAt)
              : '-'}{' '}
            ~ {detailData.applyEndAt ? formatDate(detailData.applyEndAt) : '-'}
            <img
              src={isBookmarked ? bookmarketFill : bookmarket}
              alt="북마크"
              style={{ cursor: 'pointer' }}
              onClick={() => id && toggleBookmark(id)}
            />
          </S.DetailPeriod>
        </S.DetailInfo>
      </S.DetailHeader>
      <S.DetailBody>{detailData.detail}</S.DetailBody>
    </S.DetailContainer>
  );
}

export default DetailPage;
