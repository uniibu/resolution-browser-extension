// @ts-nocheck

class CustomWalletProvider {
  isMetaMask: boolean;

  constructor() {
    this.isMetaMask = true;
  }

  async request({method, params}) {
    console.log("Request received", {method, params});

    let result;
    try {
      switch (method) {
        case "eth_requestAccounts":
          result = await this.handleAccountRequest();
          break;
        case "eth_chainId":
          result = await this.handleChainIdRequest();
          break;
        case "eth_accounts":
          result = await this.handleAccountRequest();
          break;
        case "personal_sign":
          result = await this.handlePersonalSign(params);
          break;
        default:
          throw new Error(`Unsupported method: ${method}`);
      }

      console.log("Request successful", {method, result});
      return result;
    } catch (error) {
      console.log("Request failed", {method, error});
      throw error;
    }
  }

  async handleAccountRequest() {
    const resp = new Promise((resolve, reject) => {
      document.dispatchEvent(new CustomEvent("selectAccountRequest"));
      document.addEventListener(
        "selectAccountResponse",
        function listener(event) {
          document.removeEventListener("selectAccountResponse", listener);
          if (event.detail.error) {
            reject(event.detail.error);
          } else {
            resolve(event.detail.address);
          }
        },
      );
    });

    const account = await resp;
    return [account];
  }

  async handleChainIdRequest() {
    const resp = new Promise((resolve, reject) => {
      document.dispatchEvent(new CustomEvent("selectChainIdRequest"));

      document.addEventListener(
        "selectChainIdResponse",
        function listener(event) {
          document.removeEventListener("selectChainIdResponse", listener);
          if (event.detail.error) {
            reject(event.detail.error);
          } else {
            resolve(event.detail.chainId);
          }
        },
      );
    });

    const chainId = await resp;
    return chainId;
  }

  async handlePersonalSign(params) {
    const resp = new Promise((resolve, reject) => {
      document.dispatchEvent(
        new CustomEvent("signMessageRequest", {
          detail: params,
        }),
      );

      document.addEventListener(
        "signMessageResponse",
        function listener(event) {
          document.removeEventListener("signMessageResponse", listener);
          if (event.detail.error) {
            reject(event.detail.error);
          } else {
            resolve(event.detail.response);
          }
        },
      );
    });

    const signResponse = await resp;
    return "";
  }
}

window.customWalletProvider = new CustomWalletProvider();
window.ethereum = window.customWalletProvider;
