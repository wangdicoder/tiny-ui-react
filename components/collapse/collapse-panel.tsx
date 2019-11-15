import React, { useRef } from 'react';
import classNames from 'classnames';
import Icon from '../icon';
import CollapseTransition from './collapse-transition';
import { BaseProps } from '../_utils/props';

export interface CollapsePanelProps extends BaseProps {
  itemKey: string;
  header: React.ReactNode;
  duration: number;
  isActive?: boolean;
  disabled?: boolean;
  extra?: React.ReactNode;
  className?: string;
  deletable?: boolean;
  /** header click callback */
  onItemClick?: (itemKey: string) => any;
  style?: React.CSSProperties;
  showArrow?: boolean;
  prefixCls?: string;
  children?: React.ReactNode;
}

/**
 * Allow to parse active status to a node
 * @param node
 * @param isActive
 */
const richNode = (node: React.ReactNode, isActive: boolean) => {
  return typeof node === 'function' ? node(isActive) : node;
};

const CollapsePanel = ({
  prefixCls = 'ty-collapse-item',
  showArrow = true,
  isActive = false,
  ...restProps
}: CollapsePanelProps) => {
  const {
    itemKey,
    duration,
    header,
    disabled,
    extra,
    deletable,
    onItemClick,
    className,
    style,
    children,
  } = restProps;
  const itemEl = useRef<HTMLDivElement | null>(null);
  const contentEl = useRef<HTMLDivElement | null>(null);

  const cls = classNames(prefixCls, className, {
    [`${prefixCls}_active`]: isActive,
  });

  const _headerOnClick = () => {
    if (!disabled) {
      onItemClick && onItemClick(itemKey);
    }
  };

  /**
   * Remove a item from collapse only the header is enabled
   * @param e
   * @private
   */
  const _removeItem = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    if (!disabled && itemEl.current) {
      itemEl.current!.parentNode!.removeChild(itemEl.current!);
    }
  };

  const _renderHeader = () => {
    const headerCls = classNames(`${prefixCls}__header`, {
      [`${prefixCls}__header_disabled`]: disabled,
    });
    const arrowCls = classNames(`${prefixCls}__arrow`, {
      [`${prefixCls}__arrow_active`]: isActive,
    });

    return (
      <div className={headerCls} onClick={_headerOnClick}>
        {showArrow && <Icon type="right" className={arrowCls} />}
        <div className={`${prefixCls}__title`}>{richNode(header, isActive)}</div>
        <div className={`${prefixCls}__extra`}>
          {deletable ? <span onClick={_removeItem}>✕</span> : richNode(extra, isActive)}
        </div>
      </div>
    );
  };

  return (
    <div className={cls} style={style} ref={itemEl}>
      {_renderHeader()}
      <CollapseTransition duration={duration} isShow={isActive}>
        <div ref={contentEl} className={`${prefixCls}__content`}>
          {richNode(children, isActive)}
        </div>
      </CollapseTransition>
    </div>
  );
};

export default CollapsePanel;
