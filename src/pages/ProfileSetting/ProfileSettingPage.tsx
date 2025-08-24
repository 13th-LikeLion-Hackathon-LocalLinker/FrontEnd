import React, { useState, useEffect } from 'react';
import * as S from './ProfileSettingPage.styles';
import Label from '../../components/Onboarding/Label/Label';
import RadioLabel from '../../components/Onboarding/RadioLabel/RadioLabel';
import Select from '../../components/Onboarding/Select/Select';
import { VISA_OPTIONS, NATIONALITIES } from '../../constants/onboardingOptions';

function ProfileSettingPage() {
  const [visaType, setVisaType] = useState(VISA_OPTIONS[0].value);
  const [nationality, setNationality] = useState(NATIONALITIES[0].value);
  const [isMarried, setIsMarried] = useState<string | null>(null);

  useEffect(() => {
    const info = localStorage.getItem('onboardingInfo');
    if (info) {
      const parsed = JSON.parse(info);
      setVisaType(parsed.visaType || VISA_OPTIONS[0].value);
      setNationality(parsed.nationality || NATIONALITIES[0].value);
      setIsMarried(parsed.isMarried ?? null);
    }
  }, []);

  const saveToLocalStorage = (
    newVisaType: string,
    newNationality: string,
    newIsMarried: string | null,
  ) => {
    localStorage.setItem(
      'onboardingInfo',
      JSON.stringify({
        visaType: newVisaType,
        nationality: newNationality,
        isMarried: newIsMarried,
      }),
    );
  };

  const onChangeVisaType = (value: string) => {
    setVisaType(value);
    saveToLocalStorage(value, nationality, isMarried);
  };

  const onChangeNationality = (value: string) => {
    setNationality(value);
    saveToLocalStorage(visaType, value, isMarried);
  };

  const onChangeIsMarried = (value: string) => {
    setIsMarried(value);
    saveToLocalStorage(visaType, nationality, value);
  };

  return (
    <S.Stage>
      <S.Page>
        <S.Content>
          <S.Box>
            <S.Desc>
              해당 정보는 개인 맞춤형 혜택 및 제도를
              <br />
              제공하는 데 사용됩니다
            </S.Desc>
          </S.Box>

          <S.Divider />

          <Label>Q. 체류자격(비자, 코드 포함)</Label>
          <Select
            value={visaType}
            onChange={(e) => onChangeVisaType(e.target.value)}
            options={VISA_OPTIONS}
          />

          <Label>Q. 국적</Label>
          <Select
            value={nationality}
            onChange={(e) => onChangeNationality(e.target.value)}
            options={NATIONALITIES}
          />

          <Label>Q. 결혼 여부</Label>
          <S.RadioGroup>
            <RadioLabel>
              <input
                type="radio"
                name="isMarried"
                value="기혼"
                checked={isMarried === '기혼'}
                onChange={() => onChangeIsMarried('기혼')}
              />
              기혼
            </RadioLabel>
            <RadioLabel>
              <input
                type="radio"
                name="isMarried"
                value="비혼"
                checked={isMarried === '비혼'}
                onChange={() => onChangeIsMarried('비혼')}
              />
              비혼
            </RadioLabel>
          </S.RadioGroup>
        </S.Content>
      </S.Page>
    </S.Stage>
  );
}

export default ProfileSettingPage;
