# The Unstoppable Extension

**The Unstoppable Extension** enables access to decentralized blockchain domains, facilitating a secure and user-driven browsing experience. It integrates with decentralized storage networks such as IPFS to resolve domain names stored on the blockchain, such as `.crypto` and `.eth`, directly within the Chrome browser.

## Getting Started

### Prerequisites

Ensure that you have `yarn` installed on your machine. If not, you can install it via [Yarn's official documentation](https://classic.yarnpkg.com/en/docs/install).

### Running locally

1. Clone the repository:
   ```bash
   git clone <repository-url>

3. Copy .env.sample to .env and fill in the required values:
   ```bash
   cp .env.sample .env
   ```

4. Install dependencies and setup your environment:
   ```bash
   yarn install
   yarn postinstall
   yarn predev
   ```

5. Run the project locally:
   ```bash
   yarn dev
   ```

6. Once the build is complete, open `chrome://extensions` in your Chrome browser, enable Developer mode, and load the unpacked extension by selecting the `dist` folder.

### Distribution

This package has builds extension releases for Chrome and Firefox browsers. Follow the steps below
to build a new release version.

1. Update the release version in the `package.json` and `manifest-template.json` files

2. Build a release version
   ```bash
   # For a mainnet production release
   yarn build:all

   # For a testnet development release
   yarn build:all:dev
   ```

3. Find the release files in the `./releases` directory

## Usage

1. Open the extension popup window.
1. Select a sign in option
   1. Existing users may enter their user name and password
   1. New users may create a new account

## Frequently Asked Questions (FAQ)

### Why does this extension require access to `*.google.com` and other search engine domains?

This access is essential for redirecting queries from major search engines like Google to decentralized addresses. For instance, searching for "brad.crypto" will redirect to its decentralized counterpart. Note that this extension _does not_ store or transmit your browsing history; all processing is done locally on your device.

### How can I add support for additional search engines?

Adding a new search engine is straightforward:

1. Update the `manifest-template.json` file to include permissions for intercepting requests from the new search engine.
2. Modify `src/util/searchEngines.ts` to incorporate the new search engine's specific configurations.

Submit a pull request with these changes, and we will integrate the support promptly.
