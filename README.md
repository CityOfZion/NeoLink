# NeoLink

This is a Chrome extension wallet for the Neo Smart Economy.

Currently the project is undergoing heavy development.

![alt](https://i.gyazo.com/816b21e8fcbb35073919603c9d6030c1.gif)


## Current Features

* Open a wallet using an encyrpted WIF
* Get a list of transactions for any known address - does not require login
* Get the balance of any known address - does not require login
* Send Neo or Gas to an address
* Easily switch between Public & Private Net
* Test invoke smart contracts, with parameters, to determine gas cost and test
* Send invoke smart contracts with parameters and arguments
* Authorize both types of smart contract invocations as requested by third-party dApp
* SemVer 2.0 compliant http://semver.org/
* Easy selection of MainNet, TestNet, or custom private net
* Persistent storage of user configuration
* Create wallet

## Future Features

*    Add progress indicator for all actions to show user something is happening
*    Add global status bar or modal system
*    Re-skin UI and layout
*    Refactor: lint, modularity, and clarity
*    Contact book that remembers addresses used
*    Configurable watch wallet for any saved addresses to display balances all in one view
*    Claim Gas
*    Import Wallet
*    Export Wallet
*    Add arbitrary number of arguments for smart contract invocation
*    Ledger hardware support
*    Any ideas from the community!

## Roadmap for Q1 2018

* Finalize React version + Material Design
* Product Landing Page
* Firefox plug-in
* Version 1.0 Release (Release packed plug-in on Google and Firefox)
* neon-api integration (NEO's web3 equivalent)


## Setup

`npm install`

`npm run start` (for development with live reload)

`npm run build` (production)


Your unpacked extension will be in the ./build/ folder.

See https://developer.chrome.com/extensions/getstarted#unpacked for instructions on manually loading an unpacked Chrome extension in developer mode.

## Use NeoLink with your dApp

Add the following code to your dApp:


```
<input type='text' id='contractScriptHash' />
<input type='text' id='operationName' />
<input type='text' id='runInvokeArgument1' />
<input type='text' id='runInvokeArgument2' />
<input type='text' id='assetType' />
<input type='text' id='assetAmount' />

<button id="runInvokeButton">Invoke</button>
<script>
document.getElementById("runInvokeButton).addEventListener("click",
    function() {
      var scriptHash = document.getElementById("contractScriptHash").value
      var operation = document.getElementById("operationName").value
      var invokeArg1 = document.getElementById("runInvokeArgument1").value
      var invokeArg2 = document.getElementById("runInvokeArgument2").value
      var type = document.getElementById("assetType").value
      var amount = document.getElementById("assetAmount").value

      var invocationObject = {
        'scriptHash': scriptHash, // Your contract's script hash.
        'operation': operation,   // Operation as defined in your contract.
        'arg1': invokeArg1,       // Depending on your input/contract, you may need to use u.str2hexstring, u.reverseHex
        'arg2': invokeArg2,       // or other utility methods from neon-js for these arguments.
        'assetType': type,        // NEO or GAS currently.
        'assetAmount': amount     // Amount, decimals allowed for GAS.
      }

      window.postMessage({ type: "NEOLINK_SEND_INVOKE", text: invocationObject }, "*");
}, false);
</script>
```

Please note that currently the code is limited to a maximum of two arguments to the smart contract.

## NeoLink - Demo

- Install NeoLink
    - Clone github.com/cityofzion/neolink/
    - Follow the instructions there to install and build
    - Login with encrypted WIF (wallet needs a balance of TestNet gas)
- Visit sendeo.surge.sh and watch the video to learn how it works.
- Code available at [on Githhub](https://github.com/slipo/sendeo)
