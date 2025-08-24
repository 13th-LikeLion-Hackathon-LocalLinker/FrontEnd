//개인 맞춤 공고 스위치 버튼

import React from 'react';
import type { PersonSwitchProps } from './PersonSwitch.types';
import { PersonalWrap, Switch } from './PersonSwitch.styles';

export default function PersonalOnlyToggle({
  personalOnly,
  onSwitchPerson,
}: PersonSwitchProps) {
  return (
    <PersonalWrap>
      <span>개인 맞춤 공고만</span>
      <Switch
        $on={personalOnly}
        aria-pressed={personalOnly}
        onClick={onSwitchPerson}
      />
    </PersonalWrap>
  );
}
