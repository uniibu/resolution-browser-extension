import {ExternalProvider} from "@ethersproject/providers";

export enum EIP6963EventNames {
  Announce = "eip6963:announceProvider",
  Request = "eip6963:requestProvider", // eslint-disable-line @typescript-eslint/no-shadow
}

export type EIP6963ProviderInfo = {
  uuid: string;
  name: string;
  icon: string;
  rdns: string;
};

export type EIP6963ProviderDetail = {
  info: EIP6963ProviderInfo;
  provider: ExternalProvider;
};

export type EIP6963AnnounceProviderEvent = CustomEvent & {
  type: EIP6963EventNames.Announce;
  detail: EIP6963ProviderDetail;
};

export type EIP6963RequestProviderEvent = Event & {
  type: EIP6963EventNames.Request;
};
