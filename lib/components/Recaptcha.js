import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';

const isReady = () => Boolean(window && window.grecaptcha && window.grecaptcha);

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
    }

    static defaultProps = {
        id: 'react-recaptcha-that-works',
        size: 'normal',
        theme: 'light',
        onLoad: undefined,
        onVerify: undefined,
        onExpire: undefined,
        onError: undefined,
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
        if (!this.widget && this.state.ready && !prevState.ready) {
            this._renderRecaptcha();
        }
    }

    componentWillUnmount() {
        clearInterval(this.readyInterval);
    }

    execute = () => {
        window.grecaptcha.execute();
    }

    reset = () => {
        window.grecaptcha.reset(this.widget);
    }

    _updateReadyState = () => {
        if (isReady()) {
            clearInterval(this.readyInterval);
            this.setState({
                ready: true,
            });
        }
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
            onLoad(this.widget);
        }
    }

    render() {
        return (
            <span id={this.props.id} />
        );
    }

}
