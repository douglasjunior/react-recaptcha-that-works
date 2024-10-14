import React, {
  Ref,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react';

const isReady = () => Boolean(
  typeof window === 'object'
  // @ts-ignore
  && window.grecaptcha
  // @ts-ignore
  && window.grecaptcha.render
);

export type RecaptchaPropsType = {
  id?: string;
  siteKey: string;
  size?: 'invisible' | 'normal' | 'compact';
  theme?: 'light' | 'dark';
  onLoad?: () => void;
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
  onClose?: () => void;
}

export type RecaptchaRef = {
  execute: () => void;
  reset: () => void;
}

const Recaptcha = forwardRef(({
  id = 'react-recaptcha-that-works',
  siteKey,
  size = 'normal',
  theme = 'light',
  onLoad = undefined,
  onVerify,
  onExpire = undefined,
  onError = undefined,
  onClose = undefined,
}: RecaptchaPropsType, ref: Ref<RecaptchaRef>) => {

  const [ready, setReady] = useState(isReady());

  const widgetRef = useRef();
  const closeObserverRef = useRef<MutationObserver>();
  const readyIntervalRef = useRef<ReturnType<typeof setInterval>>();

  const isRendered = () => {
    return typeof widgetRef.current === 'number';
  }

  const updateReadyState = () => {
    if (isReady()) {
      clearInterval(readyIntervalRef.current);
      setReady(true);
    }
  }

  const renderRecaptcha = () => {
    // @ts-ignore
    widgetRef.current = window.grecaptcha.render(id, {
      sitekey: siteKey,
      size,
      theme,
      callback: onVerify,
      'expired-callback': onExpire,
      'error-callback': onError,
    });
    onLoad?.();
  };

  useEffect(() => {
    if (ready) {
      renderRecaptcha();
      return;
    }

    readyIntervalRef.current = setInterval(updateReadyState, 1000);
    return () => clearInterval(readyIntervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  useEffect(() => {
    if (ready && !isRendered()) {
      renderRecaptcha();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  useEffect(() => {
    return () => {
      closeObserverRef.current?.disconnect();
      if (isRendered()) {
        // @ts-ignore
        window.grecaptcha.reset(widgetRef.current);
      }
    }
  }, [])

  const registerOnCloseListener = useCallback(() => {
    closeObserverRef.current?.disconnect();

    const iframes = document.getElementsByTagName('iframe');
    const recaptchaFrame = Array.prototype.find
      .call(iframes, e => e.src.includes('google.com/recaptcha/api2'));
    const recaptchaElement = recaptchaFrame.parentNode.parentNode;

    let lastOpacity = recaptchaElement.style.opacity;
    closeObserverRef.current = new MutationObserver(() => {
      if (lastOpacity !== recaptchaElement.style.opacity
        && recaptchaElement.style.opacity == 0) { // eslint-disable-line eqeqeq
        onClose?.();
      }
      lastOpacity = recaptchaElement.style.opacity;
    });
    closeObserverRef.current.observe(recaptchaElement, {
      attributes: true,
      attributeFilter: ['style'],
    });
  }, [onClose]);

  useImperativeHandle(ref, () => ({
    execute: () => {
      if (onClose) {
        registerOnCloseListener();
      }
      // @ts-ignore
      window.grecaptcha.execute(widgetRef.current);
    },
    reset: () => {
      // @ts-ignore
      window.grecaptcha.reset(widgetRef.current);
    }
  }), [onClose, registerOnCloseListener]);

  return (
    <span id={id} />
  );
});

export default Recaptcha;
