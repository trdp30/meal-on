/**
 *
 * Notification
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import Content from './Content';

export function Notification(props) {
  const { children, variant, message, actions, isAnimate, closeToast, showBorder } = props;
  return (
    <>
      {children || (
        <Content
          title={message.title}
          summary={message.summary}
          close={closeToast}
          actions={actions}
          variant={variant}
          isAnimate={isAnimate}
          showBorder={showBorder}
        />
      )}
    </>
  );
}

Notification.propTypes = {
  variant: PropTypes.oneOf(['success', 'info', 'warning', 'danger', 'default', 'processing']),
  message: PropTypes.shape({
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.node]).isRequired,
    summary: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.node]),
  }).isRequired,
  actions: PropTypes.any,
  isAnimate: PropTypes.bool,
  showBorder: PropTypes.bool,
  closeToast: PropTypes.func,
};

Notification.defaultProps = {
  variant: 'info',
  showBorder: false,
};

export const triggerToast = arg => {
  const { setting = {}, type, ...props } = arg;
  const defaultSettings = {
    theme: 'light',
    icon: false,
    closeButton: false,
    hideProgressBar: true,
    autoClose: 5000,
    ...setting,
    position: 'bottom-right',
  };

  toast(<Notification {...props} />, { ...defaultSettings });
};

export default memo(Notification);
