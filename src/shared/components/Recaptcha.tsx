import React from 'react'
import ReCAPTCHA from "react-google-recaptcha";

interface Props {
  setVerified: React.Dispatch<React.SetStateAction<boolean>>
  captchaRef: React.RefObject<ReCAPTCHA>
}


export const Recaptcha = ({ setVerified, captchaRef }: Props) => {

  function handleChangeCaptcha(value: any) {
    // console.log("Captcha value:", value);

    // returns true when recaptcha is changing
    setVerified(true);

    // stores the recaptcha token in a variable
    const _grecaptcha = captchaRef.current !== null ? captchaRef.current.getValue() : null;
    // console.log("_grecaptcha:", _grecaptcha);
  }

  return (
    <ReCAPTCHA
      // sitekey="6LcdLfMoAAAAAK0KBalcMOTGTB-P7w38jnq78n9p"
      style={{transform:'scaleX(1.0) scaleY(0.9)', margin:'0.5'}}
      ref={captchaRef}

      // passing the sirekey form .env.REACT_APP_SITE_KEY to sitekey variable
      sitekey={String(process.env.REACT_APP_SITE_KEY)}
      onChange={handleChangeCaptcha}
    />
  )
}
