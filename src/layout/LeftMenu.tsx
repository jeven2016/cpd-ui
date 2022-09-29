import { Menu } from 'react-windy-ui';
import IconCustomerMgr from '@/common/icons/IconCustomerMgr';
import IconSystem from '@/common/icons/IconSystem';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function LeftMenu(props) {
  const { collapse } = props;
  const { t } = useTranslation();

  return (
    <Menu
      compact={collapse}
      defaultActiveItems={['item1']}
      hasBox={false}
      type="primary"
      hasRipple={true}>
      <Menu.Item id="item1" icon={<IconCustomerMgr />}>
        {t('menu.books')}
      </Menu.Item>
      <Menu.Item id="item2" icon={<IconSystem />}>
        {t('menu.system_config')}
      </Menu.Item>
    </Menu>
  );
}
