# Recaptcha for React

[![Licence MIT](https://img.shields.io/badge/licence-MIT-blue.svg)](https://github.com/douglasjunior/react-recaptcha-that-works/blob/master/LICENSE)
[![npm version](https://img.shields.io/npm/v/react-recaptcha-that-works.svg)](https://www.npmjs.com/package/react-recaptcha-that-works)
[![npm downloads](https://img.shields.io/npm/dt/react-recaptcha-that-works.svg)](#install)

A reCAPTCHA library for React that works.

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

## Use

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
                    ref={ref = this.recaptcha = ref}
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

## Props

|Name|Value|Default|Description|
|-|-|-|-|
|siteKey|||Your sitekey.|
|size|`'invisible'`, `'normal'` or `'compact'`|`'normal'`|The size of the widget.|
|theme|`'dark'` or `'light'`|`'light'`|The color theme of the widget.|
|onLoad|||A callback function, executed when the reCAPTCHA is ready to use.|
|onVerify|||A callback function, executed when the user submits a successful response. The recaptcha response token is passed to your callback.|
|onExpire|||A callback function, executed when the reCAPTCHA response expires and the user needs to re-verify.|
|onError|||A callback function, executed when reCAPTCHA encounters an error (usually network connectivity) and cannot continue until connectivity is restored. If you specify a function here, you are responsible for informing the user that they should retry.|

## reCAPTCHA v2 docs

- [I'm not a robot](https://developers.google.com/recaptcha/docs/display)
- [Invisible](https://developers.google.com/recaptcha/docs/invisible)

## Contribute

New features, bug fixes and improvements are welcome! For questions and suggestions use the [issues](https://github.com/douglasjunior/react-recaptcha-that-works/issues).

<a href="https://www.patreon.com/douglasjunior"><img src="http://i.imgur.com/xEO164Z.png" alt="Become a Patron!" width="200" /></a>
[![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=E32BUP77SVBA2)

## Licence

```
The MIT License (MIT)

Copyright (c) 2018 Douglas Nassif Roma Junior
```

See the full [licence file](https://github.com/douglasjunior/react-recaptcha-that-works/blob/master/LICENSE).
