import React, { useState, useEffect } from 'react';
import * as S from './ProfileSettingPage.styles';
import Label from '../../components/Onboarding/Label/Label';
import RadioLabel from '../../components/Onboarding/RadioLabel/RadioLabel';
import Select from '../../components/Onboarding/Select/Select';
import { VISA_OPTIONS, NATIONALITIES } from '../../constants/onboardingOptions';

function ProfileSettingPage() {
  const [visaType, setVisaType] = useState(VISA_OPTIONS[0].value);
  const [nationality, setNationality] = useState(NATIONALITIES[0].value);
  // 결혼 여부 boolean | null로 관리
  const [isMarried, setIsMarried] = useState<boolean | null>(null);

  useEffect(() => {
    const info = localStorage.getItem('onboardingInfo');
    if (info) {
      const parsed = JSON.parse(info);
      setVisaType(parsed.visa ?? VISA_OPTIONS[0].value);
      setNationality(parsed.nation ?? NATIONALITIES[0].value);
      // married 값이 boolean인지 문자열인지 체크 후 boolean으로 변환
      if (parsed.married === true || parsed.married === false) {
        setIsMarried(parsed.married);
      } else if (parsed.married === 'true') {
        setIsMarried(true);
      } else if (parsed.married === 'false') {
        setIsMarried(false);
      } else {
        setIsMarried(null);
      }
    }
  }, []);

  const saveToLocalStorage = (
    newVisaType: string,
    newNationality: string,
    newIsMarried: boolean | null,
  ) => {
    localStorage.setItem(
      'onboardingInfo',
      JSON.stringify({
        visa: newVisaType,
        nation: newNationality,
        married: newIsMarried,
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

  const onChangeIsMarried = (value: boolean) => {
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
                value="true"
                checked={isMarried === true}
                onChange={() => onChangeIsMarried(true)}
              />
              기혼
            </RadioLabel>
            <RadioLabel>
              <input
                type="radio"
                name="isMarried"
                value="false"
                checked={isMarried === false}
                onChange={() => onChangeIsMarried(false)}
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
