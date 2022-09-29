import { Space } from 'react-windy-ui';
import HomeIcon from '@/common/icons/HomeIcon';
import React, { useContext } from 'react';
import LeftMenu from '@/layout/LeftMenu';
import { useTranslation } from 'react-i18next';
import { animated, useSpring } from 'react-spring';
import { WindowContext } from '@/common/Context';
import { LAYOUT_SETTING } from '@/common/Constants';

export default function LeftSlider(props) {
  const { collapse } = props;
  const { t } = useTranslation();
  const { mdWindow } = useContext(WindowContext);

  const { left } = useSpring({
    left: mdWindow ? LAYOUT_SETTING.LEFT_SLIDER.MIN : LAYOUT_SETTING.LEFT_SLIDER.MAX,
    config: { duration: 200 }
  });

  return (
    <animated.div className="c-slider" style={{ left: left }}>
      <div className="c-slider-content">
        <div className="slider-title">
          <Space>
            <HomeIcon />
            {!collapse && <span style={{ whiteSpace: 'nowrap' }}>{t('web.title')}</span>}
          </Space>
        </div>
        <LeftMenu collapse={collapse} />
      </div>
    </animated.div>
  );
}
