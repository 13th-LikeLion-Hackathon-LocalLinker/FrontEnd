import React, { useState } from 'react';
import * as S from './OnboardingPage.styles';
import Title from '../../components/Onboarding/Title/Title';
import Label from '../../components/Onboarding/Label/Label';
import RadioLabel from '../../components/Onboarding/RadioLabel/RadioLabel';
import Select from '../../components/Onboarding/Select/Select';
import type { OnboardingPageProps } from './OnboardingPage.types';
import { VISA_OPTIONS, NATIONALITIES } from '../../constants/onboardingOptions';

function OnboardingPage({ onNext }: OnboardingPageProps) {
  const [visaType, setVisaType] = useState(VISA_OPTIONS[0].value);
  const [nationality, setNationality] = useState(NATIONALITIES[0].value);
  const [isMarried, setIsMarried] = useState<boolean | null>(null);

  const handleNext = () => {
    const marriedBoolean = isMarried === null ? undefined : isMarried;

    localStorage.setItem(
      'onboardingInfo',
      JSON.stringify({
        visa: visaType,
        nation: nationality,
        married: marriedBoolean,
      }),
    );
    onNext();
  };

  return (
    <S.Stage>
      <S.Page>
        <S.Content>
          <S.Box>
            <Title>서비스 시작 전, 아래 정보를 입력해주세요</Title>
            <S.Desc>
              해당 정보는 개인 맞춤형 혜택 및 제도를 <br />
              제공하는 데 사용됩니다
            </S.Desc>
          </S.Box>

          <S.Divider />

          <Label>Q. 체류자격(비자, 코드 포함)</Label>
          <Select
            value={visaType}
            onChange={(e) => setVisaType(e.target.value)}
            options={VISA_OPTIONS}
          />

          <Label>Q. 국적</Label>
          <Select
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
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
                onChange={() => setIsMarried(true)}
              />
              기혼
            </RadioLabel>
            <RadioLabel>
              <input
                type="radio"
                name="isMarried"
                value="false"
                checked={isMarried === false}
                onChange={() => setIsMarried(false)}
              />
              비혼
            </RadioLabel>
          </S.RadioGroup>

          <S.Button onClick={handleNext} disabled={isMarried === null}>
            다음으로
          </S.Button>
        </S.Content>
      </S.Page>
    </S.Stage>
  );
}

export default OnboardingPage;
