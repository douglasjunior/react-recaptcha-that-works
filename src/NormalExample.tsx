import React, { useCallback, useRef } from "react";

import Recaptcha, { RecaptchaRef } from "../lib";

const NormalExample = () => {
  const recaptchaRef = useRef<RecaptchaRef | null>(null);

  const handleVerify = useCallback((token: string) => {
    console.warn('handleVerify', token);
  }, []);

  const handleExpire = useCallback(() => {
    console.warn('handleExpire');
    recaptchaRef.current?.reset();
  }, []);

  const handleError = useCallback(() => {
    console.warn('handleError');
  }, []);

  const handleLoad = useCallback(() => {
    console.warn('handleLoad');
  }, []);

  const handleClose = useCallback(() => {
    console.warn('handleClose');
  }, []);

  return (
    <div>
      <h1>Normal example</h1>

      <Recaptcha
        id="normal-example"
        ref={recaptchaRef}
        siteKey={'6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'}
        onVerify={handleVerify}
        onExpire={handleExpire}
        onError={handleError}
        onLoad={handleLoad}
        onClose={handleClose}
        size="normal"
      />
    </div>
  )
}

export default NormalExample;
