import React, { useCallback, useRef, useState } from "react";

import Recaptcha, { RecaptchaRef } from "../lib";

const InvisibleExample = () => {
  const [loading, setLoading] = useState(false);

  const recaptchaRef = useRef<RecaptchaRef | null>(null);
  const recaptchaToken = useRef<string | null>(null);

  const handleLoginSubmit = useCallback(() => {
    alert(`Recaptcha token: ${recaptchaToken.current}`)
    setLoading(false);
    recaptchaRef.current?.reset();
  }, []);

  const handleExecuteRecaptcha = useCallback(() => {
    setLoading(true);
    recaptchaRef.current?.execute();
  }, []);

  const handleVerify = useCallback((token: string) => {
    console.warn('handleVerify', token);
    recaptchaToken.current = token;
    handleLoginSubmit();
  }, [handleLoginSubmit]);

  const handleExpire = useCallback(() => {
    console.warn('handleExpire');
    recaptchaToken.current = null;
    recaptchaRef.current?.reset();
  }, []);

  const handleError = useCallback(() => {
    console.warn('handleError');
    setLoading(false);
  }, []);

  const handleLoad = useCallback(() => {
    console.warn('handleLoad');
  }, []);

  const handleClose = useCallback(() => {
    console.warn('handleClose');
  }, []);

  return (
    <div>
      <h1>Invisible example</h1>

      <Recaptcha
        id="invisible-example"
        ref={recaptchaRef}
        siteKey={'6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'}
        onVerify={handleVerify}
        onExpire={handleExpire}
        onError={handleError}
        onLoad={handleLoad}
        onClose={handleClose}
        size="invisible"
      />

      <br />

      <button disabled={loading} onClick={handleExecuteRecaptcha}>
        {loading ? 'Loading...' : 'Execute'}
      </button>
    </div>
  )
}

export default InvisibleExample;
