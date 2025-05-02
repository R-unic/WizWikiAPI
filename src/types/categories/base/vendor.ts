import type { Infobox, WikiObject } from "../../common";

export function createVendor(base: VendorInfobox): Vendor {
  return {};
}

export interface VendorInfobox extends Infobox {

}

export interface Vendor extends WikiObject {

}