# reCAPTCHA for React

[![License MIT](https://img.shields.io/badge/licence-MIT-blue.svg)](https://github.com/douglasjunior/react-recaptcha-that-works/blob/master/LICENSE)
[![npm version](https://img.shields.io/npm/v/react-recaptcha-that-works.svg)](https://www.npmjs.com/package/react-recaptcha-that-works)
[![npm downloads](https://img.shields.io/npm/dt/react-recaptcha-that-works.svg)](#install)

A reCAPTCHA library for React that works.

_Looking for [React Native version](https://github.com/douglasjunior/react-native-recaptcha-that-works)?_

## Install 

### Install the module 

```bash
  yarn add react-recaptcha-that-works
```
Or
```bash
  npm i -S react-recaptcha-that-works
```

### Import the reCAPTCHA script

```html
<html>
    <head>
        <script src="https://www.google.com/recaptcha/api.js" async defer></script>
    </head>
    <body>
        ...
    </body>
</html>
```

## Usage

### I'm not a robot

```jsx
import React, { Component } from 'react';

import Recaptcha from 'react-recaptcha-that-works';

class App extends Component {

    send = () => {
        console.log('send!', this.state.token);
    }

    onVerify = token => {
        console.log('success!', token);
        this.setState({ token });
    }

    onExpire = () => {
        console.warn('expired!');
    }

    render() {
        return (
            <div>
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <Recaptcha
                    siteKey="<your-recaptcha-public-key>"
                    onVerify={this.onVerify}
                    onExpire={this.onExpire}
                />
                <button onClick={this.send}>Send</button>
            </div>
        )
    }
}
```

### Invisible

```jsx
import React, { Component } from 'react';

import Recaptcha from 'react-recaptcha-that-works';

class App extends Component {

    send = () => {
        console.log('send!');
        this.recaptcha.execute();
    }

    onVerify = token => {
        console.log('success!', token);
    }

    onExpire = () => {
        console.warn('expired!');
    }

    render() {
        return (
            <div>
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <Recaptcha
                    ref={ref = this.recaptcha = ref}
                    siteKey="<your-recaptcha-public-key>"
                    onVerify={this.onVerify}
                    onExpire={this.onExpire}
                    size="invisible"
                />
                <button onClick={this.send}>Send</button>
            </div>
        )
    }
}
```

### TypeScript

```tsx
import React, { useRef } from 'react';
import { View, Button } from 'react-native';

import Recaptcha, { RecaptchaRef } from "react-recaptcha-that-works";

// ...

export const Component: React.FC = () => {
    const recaptcha = useRef<RecaptchaRef>(null);

    const send = () => {
        console.log('send!');
        recaptcha.current?.execute();
    };

    const onVerify = (token: string) => {
        console.log('success!', token);
    };

    const onExpire = () => {
        console.warn('expired!');
    }

    return (
        <div>
            <Recaptcha
                ref={recaptcha}
                siteKey="<your-recaptcha-public-key>"
                onVerify={onVerify}
                onExpire={onExpire}
                size="invisible"
            />
            <button onClick={send}>
                Send
            </button>
        </div>
    );
};
```

<br />

For more details, see the [Sample Project](https://github.com/douglasjunior/react-recaptcha-that-works/blob/master/src/App.tsx).

## Props

|Name|Value|Default|Description|
|-|-|-|-|
|siteKey|||Your sitekey.|
|size|`'invisible'`, `'normal'` or `'compact'`|`'normal'`|The size of the widget.|
|theme|`'dark'` or `'light'`|`'light'`|The color theme of the widget.|
|onLoad|`function()`||A callback function, executed when the reCAPTCHA is ready to use.|
|onVerify|`function(token)`||A callback function, executed when the user submits a successful response. The reCAPTCHA response token is passed to your callback.|
|onExpire|`function()`||A callback function, executed when the reCAPTCHA response expires and the user needs to re-verify.|
|onError|`function()`||A callback function, executed when reCAPTCHA encounters an error (usually network connectivity) and cannot continue until connectivity is restored. If you specify a function here, you are responsible for informing the user that they should retry.|
|onClose|`function()`||(Experimental) A callback function, executed when the challenge window is closed.|

## Methods

|Name|Type|Description|
|-|-|-|
|execute|`function`|Executes the challenge in "invisible" mode.|
|reset|`function`|Resets the reCAPTCHA state.|

Note: If using `size="invisible"`, then challenge run automatically when `open` is called.

## reCAPTCHA v2 docs

- [I'm not a robot](https://developers.google.com/recaptcha/docs/display)
- [Invisible](https://developers.google.com/recaptcha/docs/invisible)

## Contribute

New features, bug fixes and improvements are welcome! For questions and suggestions, use the [issues](https://github.com/douglasjunior/react-recaptcha-that-works/issues).

<a href="https://www.patreon.com/douglasjunior"><img src="http://i.imgur.com/xEO164Z.png" alt="Become a Patron!" width="200" /></a>
[![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=E32BUP77SVBA2)

## License

```
The MIT License (MIT)

Copyright (c) 2018 Douglas Nassif Roma Junior
```

See the full [license file](https://github.com/douglasjunior/react-recaptcha-that-works/blob/master/LICENSE).
