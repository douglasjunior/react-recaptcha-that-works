import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';

const isReady = () => Boolean(window && window.grecaptcha && window.grecaptcha.render);

export default class Recaptcha extends PureComponent {

    static propTypes = {
        id: PropTypes.string,
        siteKey: PropTypes.string.isRequired,
        size: PropTypes.oneOf(['invisible', 'normal', 'compact']),
        theme: PropTypes.oneOf(['light', 'dark']),
        onLoad: PropTypes.func,
        onVerify: PropTypes.func,
        onExpire: PropTypes.func,
        onError: PropTypes.func,
        onClose: PropTypes.func,
    }

    static defaultProps = {
        id: 'react-recaptcha-that-works',
        size: 'normal',
        theme: 'light',
        onLoad: undefined,
        onVerify: undefined,
        onExpire: undefined,
        onError: undefined,
        onClose: undefined,
    }

    constructor(props) {
        super(props);

        this.state = {
            ready: isReady(),
        };
    }

    componentDidMount() {
        if (this.state.ready) {
            this._renderRecaptcha();
        } else {
            this.readyInterval = setInterval(this._updateReadyState, 1000);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (!this._isRendered() && this.state.ready && !prevState.ready) {
            this._renderRecaptcha();
        }
    }

    componentWillUnmount() {
        if (this.readyInterval) {
            clearInterval(this.readyInterval);
        }
        if (this.onCloseObserver) {
            this.onCloseObserver.disconnect();
        }
        if (this._isRendered()) {
            window.grecaptcha.reset(this.widget);
        }
    }

    execute = () => {
        if (this.props.onClose) {
            this._registerOnCloseListener();
        }
        window.grecaptcha.execute(this.widget);
    }

    reset = () => {
        window.grecaptcha.reset(this.widget);
    }

    _isRendered = () => {
        return typeof this.widget === 'number';
    }

    _updateReadyState = () => {
        if (isReady()) {
            clearInterval(this.readyInterval);
            this.setState({
                ready: true,
            });
        }
    }

    _registerOnCloseListener = () => {
        if (this.onCloseObserver) {
            this.onCloseObserver.disconnect();
        }

        const iframes = document.getElementsByTagName('iframe');
        const recaptchaFrame = Array.prototype.find
            .call(iframes, e => e.src.includes('google.com/recaptcha/api2/bframe'));
        const recaptchaElement = recaptchaFrame.parentNode.parentNode;

        let lastOpacity = recaptchaElement.style.opacity;
        this.onCloseObserver = new MutationObserver(mutations => {
            if (lastOpacity !== recaptchaElement.style.opacity
                && recaptchaElement.style.opacity == 0) { // eslint-disable-line eqeqeq
                this.props.onClose();
            }
            lastOpacity = recaptchaElement.style.opacity;
        });
        this.onCloseObserver.observe(recaptchaElement, {
            attributes: true,
            attributeFilter: ['style'],
        });
    }

    _renderRecaptcha() {
        const {
            siteKey, size, onLoad,
            onVerify, onExpire, onError,
            theme, id,
        } = this.props;
        this.widget = window.grecaptcha.render(id, {
            sitekey: siteKey,
            size,
            theme,
            callback: onVerify,
            'expired-callback': onExpire,
            'error-callback': onError,
        });
        if (onLoad) {
            onLoad();
        }
    }

    render() {
        return (
            <span id={this.props.id} />
        );
    }

}
