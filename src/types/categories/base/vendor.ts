import type { Infobox, WikiObject } from "../../common";

export function createVendor(base: VendorInfobox): Vendor {
  return {
    vendor: base.vendor
  };
}

export interface VendorInfobox extends Infobox {
  readonly vendor?: boolean;
}

export interface Vendor extends WikiObject {
  readonly vendor?: boolean;
}