import config from "../config";
import "../subscripts/onInstalled";
import {clearAllConnectedSites} from "../lib/wallet/evm/connection";
import {supportedDomains} from "../lib/helpers";
import {backgroundEventListener} from "./liteWalletProvider/background";

/************************************
 * Onchain domain IPFS redirect logic
 ************************************/

const RESOLUTION_URL = "https://api.unstoppabledomains.com/resolve/";
const REDIRECT_URL = `${RESOLUTION_URL}redirect?url=`;
const domainsList = supportedDomains.map((domain) => domain.replace(".", ""));

function deleteAllRules() {
  chrome.declarativeNetRequest.getDynamicRules((rules) => {
    const ruleIds = rules.map((rule) => rule.id);

    if (ruleIds.length > 0) {
      chrome.declarativeNetRequest.updateDynamicRules(
        {removeRuleIds: ruleIds},
        () => {
          console.log("All dynamic rules have been removed successfully.");
        },
      );
    } else {
      console.log("No dynamic rules to remove.");
    }
  });
}

function addRules() {
  console.log("Adding HTTP rules...");
  domainsList.forEach((domain, index) => {
    const urlRegex = `https?://([^/]*?\\.${domain})(/|$)`;
    const id = index + 1001;
    chrome.declarativeNetRequest.updateDynamicRules({
      addRules: [
        {
          id,
          action: {
            type: chrome.declarativeNetRequest.RuleActionType.REDIRECT,
            redirect: {
              regexSubstitution: `${REDIRECT_URL}\\1`,
            },
          },
          condition: {
            regexFilter: urlRegex,
            resourceTypes: [
              "main_frame" as chrome.declarativeNetRequest.ResourceType,
            ],
          },
        },
      ],
      removeRuleIds: [id],
    });
  });

  console.log("Adding search engines rules...");
  domainsList.forEach((domain, index) => {
    const urlRegex = `https?://.*[?&]q=([^&]*?\\b\\.${domain})(&|$)`;
    const id = index + 2001;
    chrome.declarativeNetRequest.updateDynamicRules({
      addRules: [
        {
          id,
          action: {
            type: chrome.declarativeNetRequest.RuleActionType.REDIRECT,
            redirect: {
              regexSubstitution: `${REDIRECT_URL}\\1`,
            },
          },
          condition: {
            regexFilter: urlRegex,
            resourceTypes: [
              "main_frame" as chrome.declarativeNetRequest.ResourceType,
            ],
            requestDomains: [
              "google.com",
              "duckduckgo.com",
              "bing.com",
              "mojeek.com",
              "qwant.com",
              "search.aol.co.uk",
              "yahoo.com",
              "wiki.com",
            ],
          },
        },
      ],
      removeRuleIds: [id],
    });
  });
}

deleteAllRules();

setTimeout(() => {
  addRules();
}, 2000);

/***********************************
 * Wallet extension popup management
 ***********************************/

// clear all connected sites when in local development mode
if (config.NODE_ENV === "localhost") {
  void clearAllConnectedSites();
}

// register the wallet popup event listener
chrome.runtime.onMessage.addListener(backgroundEventListener);
