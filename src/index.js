// @flow
import * as React from 'react';
import type {Data} from 'react-hovertable';
import HoverTable from 'react-hovertable';
import Trigger from 'rc-trigger';
import placements from './placements';

function prevent(e) {
  e.preventDefault();
}

function refFn(field, component) {
  // trigger instance change to children
  (this: any)[field] = component;
}

type Props = {
  row: number,
  column: number,
  width: number,
  height: number,
  theme: string,
  onChange: (Data) => void,
  onOpen: Function,
  onClose: Function,
  placement: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight',
  children: React.Node,
  prefixCls: string,
  popupAlign?: Object,
  style?: {[string]: any},
  getPopupContainer?: Function,
  popupAnimation?: any,
  transitionName?: string,
  disabled?: boolean
}

export default class TablePicker extends React.Component<Props, {open: boolean}> {

  constructor(props: Props) {
    super(props);

    this.state = {
      open: false
    };

    const events = [
      'onTriggerClick',
      'onChange',
      'getPickerElement',
      'getRootDOMNode',
      'getTriggerDOMNode',
      'onVisibleChange',
      'setOpen',
      'open',
      'close'
    ];

    events.forEach(e => {
      (this: any)[e] = (this: any)[e].bind(this);
    });

    (this: any).savePickerPanelRef = refFn.bind(this, 'pickerPanelInstance');
    (this: any).saveTriggerRef = refFn.bind(this, 'triggerInstance');
  }

  static defaultProps = {
    column: 12,
    row: 12,
    width: 300,
    height: 300,
    theme: 'light',
    placement: 'topLeft',
    prefixCls: 'rc-trigger-popup',
    onOpen: (arg: Object) => arg,
    onClose: (arg: Object) => arg,
    children: <span className="create-table-picker-trigger"/>
  };

  onTriggerClick(e: Event) {
    e.preventDefault();
    this.setState({
      open: !this.state.open
    });
  }

  onChange(e: Event, data: Data) {
    this.props.onChange(data);
    this.setState({
      open: false
    });
  }

  onVisibleChange(open: boolean) {
    this.setOpen(open);
  }

  setOpen(open: boolean, callback?: Function) {
    const {onOpen, onClose} = this.props;
    if (this.state.open !== open) {
      this.setState({
        open: open
      }, callback);
      const event = {
        open: open
      };
      if (open) {
        onOpen(event);
      } else {
        onClose(event);
      }
    }
  }

  getRootDOMNode() {
    return this;
  }

  getTriggerDOMNode() {
    // $FlowFixMe
    return this.triggerInstance;
  }

  getPickerElement() {
    const {column, row, width, height, theme} = this.props;
    return (
      <div style={{
        border: '1px solid #d9d9d9',
        borderRadius: '5px',
        background: '#fff',
        width: width + 10
      }}>
        <HoverTable
          column={column}
          row={row}
          width={width}
          height={height}
          theme={theme}
          onClick={this.onChange}
          showDimension={true}
          />
      </div>
    );
  }

  open(callback: Function) {
    this.setOpen(true, callback);
  }

  close(callback: Function) {
    this.setOpen(false, callback);
  }

  render() {
    const props = this.props;
    const state = this.state;

    let children = props.children;

    if (children) {
      // $FlowFixMe
      children = React.cloneElement(children, {
        // $FlowFixMe
        ref: node => this.saveTriggerRef = node,
        onClick: this.onTriggerClick,
        onMouseDown: prevent
      });
    }

    const {
      prefixCls,
      placement,
      style,
      getPopupContainer,
      popupAlign,
      popupAnimation,
      disabled,
      transitionName
    } = this.props;

    return (
      <Trigger
        popup={this.getPickerElement()}
        popupAlign={popupAlign}
        builtinPlacements={placements}
        popupPlacement={placement}
        action={disabled ? [] : ['click']}
        destroyPopupOnHide
        getPopupContainer={getPopupContainer}
        popupStyle={style}
        popupAnimation={popupAnimation}
        popupTransitionName={transitionName}
        popupVisible={state.open}
        onPopupVisibleChange={this.onVisibleChange}
        prefixCls={prefixCls}>
        {children}
      </Trigger>
    );
  }
}
