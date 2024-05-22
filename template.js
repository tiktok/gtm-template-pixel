/*
 * Copyright 2022 ByteDance Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const version = "0_2_01";

const log = require("logToConsole");
const copyFromWindow = require("copyFromWindow");
const copyFromDataLayer = require("copyFromDataLayer");
const makeNumber = require("makeNumber");
const callInWindow = require("callInWindow");
const Object = require("Object");
const JSON = require("JSON");

const ecommerce = copyFromDataLayer("ecommerce");
const eventModel = copyFromDataLayer("eventModel");
const userDataFromDataLayer = copyFromDataLayer("user_data");
const ttContents = copyFromDataLayer('tt_contents') || (eventModel && eventModel.tt_contents);
const ttContentType = copyFromDataLayer('tt_content_type') || (eventModel && eventModel.tt_content_type);
const ttExternalId = copyFromDataLayer('tt_external_id') || (eventModel && eventModel.tt_external_id);

const ValidEvents = {
  ViewContent: 1,
  ClickButton: 1,
  Search: 1,
  AddToWishlist: 1,
  AddToCart: 1,
  InitiateCheckout: 1,
  AddPaymentInfo: 1,
  CompletePayment: 1,
  PlaceAnOrder: 1,
  Contact: 1,
  Download: 1,
  SubmitForm: 1,
  CompleteRegistration: 1,
  Subscribe: 1,
};

const TTEventMap = {
  'add_payment_info': 'AddPaymentInfo',
  'add_to_cart': 'AddToCart',
  'add_to_wishlist': 'AddToWishlist',
  'begin_checkout': 'InitiateCheckout',
  'page_view': 'Pageview',
  'purchase': 'CompletePayment',
  'search': 'Search',
  'sign_up': 'CompleteRegistration',
  'view_item': 'ViewContent',
};

const checkExistence = (key) => {
  return typeof copyFromWindow(key) !== "undefined";
};

const looksLikeSHA256 = (s) => {
  return s && s.length == 64;
};

const getConfigHash = (data) => {
  // What API is used. 0: None, 1: Tag Manager, 2: Google Tag, 3: Both
  var apiVersion = 0;
  if (ecommerce || userDataFromDataLayer) apiVersion += 1;
  if (eventModel && (eventModel.items || eventModel.value || eventModel.currency || eventModel.user_data)) apiVersion += 2;

  var contents = 0;
  if (data.enhance_ecomm == false && data.single_multi_product == "empty") contents = 1;
  else if (data.enhance_ecomm == false && data.single_multi_product == "single") contents = 2;
  else if (data.enhance_ecomm == false && data.single_multi_product == "multiple") contents = 3;
  else if (data.enhance_ecomm == true && data.ga_ecomm == "enhance_ecomm") contents = 4;
  else if (data.enhance_ecomm == true && data.ga_ecomm == "ecomm") contents = 5;

  return '' + apiVersion + contents;
};

const getEnhancedEcommerceData = (data, ecommerce) => {
  if (!ecommerce) {
    return null;
  }

  if (data.event == "ViewContent" && ecommerce.detail && ecommerce.detail.products) {
    return ecommerce.detail.products;
  } else if (data.event == "AddToCart" && ecommerce.add && ecommerce.add.products) {
    return ecommerce.add.products;
  } else if ((data.event == "InitiateCheckout" || data.event == "AddPaymentInfo") && ecommerce.checkout && ecommerce.checkout.products) {
    return ecommerce.checkout.products;
  } else if ((data.event == "CompletePayment" || data.event == "PlaceAnOrder" || data.event == "Subscribe") && ecommerce.purchase && ecommerce.purchase.products) {
    return ecommerce.purchase.products;
  } else {
    if (ecommerce.detail && ecommerce.detail.products)
      return ecommerce.detail.products;
    if (ecommerce.add && ecommerce.add.products)
      return ecommerce.add.products;
    if (ecommerce.checkout && ecommerce.checkout.products)
      return ecommerce.checkout.products;
    if (ecommerce.purchase && ecommerce.purchase.products)
      return ecommerce.purchase.products;
  }
  return null;
};

const getItemCategories = (item) => {
  var categories = [];
  if (item.item_category) categories.push(item.item_category);
  if (item.item_category2) categories.push(item.item_category2);
  if (item.item_category3) categories.push(item.item_category3);
  if (item.item_category4) categories.push(item.item_category4);
  if (item.item_category5) categories.push(item.item_category5);

  if (categories.length > 0) {
    return categories.join(',');
  }

  return null;
};

const getEcommerceData = (data, ecommerce) => {
  var value = 0;
  var currency = "USD"; // default value
  var contents = [];

  /* 
    Standard Ecommerce Support. For more details on Ecommerce Data Structure
    https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtm
    We will need to check for standard ecommerce events if Enhanced Ecommerce doesnt work
  */
  const secData = (ecommerce && ecommerce.items) || (eventModel && eventModel.items) || ttContents;
  if (secData) {
    log("1a. Standard Ecommerce - Data layers detected");
    secData.map(function (ed) {
      // Form the TikTok Parameter Object
      var content = {};
      if (ed.item_id) content.content_id = ed.item_id;
      if (!ed.item_id && ed.id) content.content_id = ed.id;
      if (ed.item_name) content.content_name = ed.item_name;
      if (ed.item_brand) content.brand = ed.item_brand;
      var categoryString = getItemCategories(ed);
      if (categoryString) content.content_category = categoryString;
      if (ed.price) content.price = makeNumber(ed.price);
      if (ed.quantity) {
        content.quantity = makeNumber(ed.quantity);
      } else {
        content.quantity = 1;
      }
      content.content_type = ttContentType || "product";
      contents.push(content);
      // Calulate the total value shown
      if (ed.price) {
        if (!ed.quantity) ed.quantity = 1;
        value += ed.price * ed.quantity;
      }
    });
  } else if (data.ga_ecomm == "ecomm") {
    log("1a. Standard Ecommerce - Unable to detect any Data Layers");
  }

  /* 
    Enhanced Ecommerce Support. Fore more details on Enhanced Ecommerce Data Structure
    https://developers.google.com/analytics/devguides/collection/ua/gtm/enhanced-ecommerce#details
    ViewContent = detail
    AddToCart = add
    InitiateCheckout, AddPaymentInfo = checkout
    CompletePayment, PlaceAnOrder, Subscribe = purchase
  */
  const eecData = getEnhancedEcommerceData(data, ecommerce);
  if (eecData !== null && contents.length == 0) {
    log("1b. Enhanced Ecommerce - Data layers detected");
    eecData.map(function (ed) {
      // Form the TikTok Parameter Object
      var content = {};
      if (ed.id) content.content_id = ed.id;
      if (ed.name) content.content_name = ed.name;
      if (ed.brand) content.brand = ed.brand;
      if (ed.category) content.content_category = ed.category;
      if (ed.price) content.price = makeNumber(ed.price);
      if (ed.quantity) {
        content.quantity = makeNumber(ed.quantity);
      } else {
        content.quantity = 1;
      }
      content.content_type = ttContentType || "product";
      contents.push(content);
      // Calulate the total value shown
      if (ed.price) {
        if (!ed.quantity) ed.quantity = 1;
        value += ed.price * ed.quantity;
      }
    });
  } else if (data.ga_ecomm == "enhance_ecomm") {
    log("1b. Enhanced Ecommerce - Unable to detect any ecommerce data layers");
  }

  if (data.ecomm_currency)
    currency = data.ecomm_currency;
  else if (ecommerce && ecommerce.currencyCode)
    currency = ecommerce.currencyCode;
  else if (ecommerce && ecommerce.currency)
    currency = ecommerce.currency;
  else if (eventModel && eventModel.currency)
    currency = eventModel.currency;

  if (ecommerce && ecommerce.value) {
    value = ecommerce.value;
  } else if (
    ecommerce &&
    ecommerce.purchase &&
    ecommerce.purchase.actionField &&
    ecommerce.purchase.actionField.revenue
  ) {
    value = ecommerce.purchase.actionField.revenue;
  } else if (eventModel && eventModel.value) {
    value = eventModel.value;
  }

  return {
    value: value,
    currency: currency,
    contents: contents
  };
};

const isHashed = (val) => {
  return val && val.match("^[A-Fa-f0-9]{64}$") != null;
};

const getUserDataFromDataLayer = () => {
  var userData = {};
  const email = (userDataFromDataLayer && (userDataFromDataLayer.email_address || userDataFromDataLayer.sha256_email_address)) ||
    (eventModel && eventModel.user_data && (eventModel.user_data.email_address || eventModel.user_data.sha256_email_address));
  if (email) {
    if (isHashed(email)) {
      userData.sha256_email = email;
    } else {
      userData.email = email;
    }
  }

  const phone = (userDataFromDataLayer && (userDataFromDataLayer.phone_number || userDataFromDataLayer.sha256_phone_number)) ||
    (eventModel && eventModel.user_data && (eventModel.user_data.phone_number || eventModel.user_data.sha256_phone_number));
  if (phone) {
    if (isHashed(phone)) {
      userData.sha256_phone_number = phone;
    } else {
      userData.phone_number = phone;
    }
  }

  if (ttExternalId) {
    userData.external_id = ttExternalId;
  }

  return userData;
};

const main = () => {
  // Forming the passed in parameters
  var parameters = {
    gtm_version: version + ':' + getConfigHash(data),
    event_trigger_source: 'GoogleTagManagerClient',
  };
  const ttEvent = TTEventMap[data.event] || data.event;

  // Check if enhance ecomm is enabled.
  if (data.enhance_ecomm == true) {
    const ecomData = getEcommerceData(data, ecommerce);
    parameters.currency = ecomData.currency;
    parameters.value = ecomData.value;
    if (ecomData.contents && ecomData.contents.length > 0) {
      parameters.contents = ecomData.contents;
    }
  } else {
    if (data.single_multi_product == "single") {
      // Single Content
      if (data.content_id) parameters.content_id = data.content_id;
      if (data.content_type || ttContentType) parameters.content_type = data.content_type || ttContentType;
      if (data.content_name) parameters.content_name = data.content_name;
      if (data.price) parameters.price = makeNumber(data.price);
      if (data.quantity) parameters.quantity = makeNumber(data.quantity);
      if (data.currency) parameters.currency = data.currency;
      if (data.value) {
        parameters.value = makeNumber(data.value);
      } else {
        if (data.price && data.quantity) {
          parameters.value = makeNumber(data.price) * makeNumber(data.quantity);
        }
      }
      if (data.content_category)
        parameters.content_category = data.content_category;
      if (data.description) parameters.description = data.description;
      if (data.query) parameters.query = data.query;
      if (data.status) parameters.status = data.status;
    } else if (data.single_multi_product == "multiple") {
      // Multiple Content
      if (data.contents) {
        const parsedContents = JSON.parse(data.contents);
        if (parsedContents !== undefined) {
          parameters.contents = parsedContents;
        } else {
          parameters.contents = data.contents;
        }
      }
      if (data.currency) parameters.currency = data.currency;
      if (data.value) parameters.value = makeNumber(data.value);
      if (data.description) parameters.description = data.description;
      if (data.query) parameters.query = data.query;
      if (data.status) parameters.status = data.status;
    } else if (data.single_multi_product == "empty") {
      // No Content
      if (data.currency) parameters.currency = data.currency;
      if (data.value) parameters.value = makeNumber(data.value);
      if (data.description) parameters.description = data.description;
      if (data.query) parameters.query = data.query;
      if (data.status) parameters.status = data.status;
    }
  }

  // Additional Object Properties
  if (data.custom_properties && data.custom_properties.length > 0) {
    for (let i = 0; i < data.custom_properties.length; i++) {
      let objectParam = data.custom_properties[i];
      if (objectParam.key) {
        parameters[objectParam.key] = objectParam.value;
      }
    }
  }

  // Advanced Matching and sending TT events
  var userData = getUserDataFromDataLayer();

  if (data.hash == "hashed") {
    // Send hashed data
    if (data.sha256_email) userData.sha256_email = data.sha256_email;
    if (data.sha256_phone)
      userData.sha256_phone_number = data.sha256_phone;
    // Note: The key is still "external_id"
    if (data.sha256_external_id)
      userData.external_id = data.sha256_external_id;
    log("2a. Advanced matching with hashed PII");
  } else if (data.hash == "non-hashed") {
    // Send non-hashed data and TikTok Pixel will hash it for you.
    if (data.email) userData.email = data.email;
    if (data.phone) userData.phone_number = data.phone;
    if (data.external_id) userData.external_id = data.external_id;
    log(
      "2b. Advanced matching without hashed data, TikTok Pixel will hash the data for you."
    );
  }

  if (Object.keys(userData).length > 0) {
    callInWindow("ttq.identify", userData);
  }

  log(
    "3. Base code found, sending ",
    ttEvent,
    "event with",
    parameters,
    data.event_id
  );

  if (data.pixel_code) {
    callInWindow("ttq.track", ttEvent, parameters, {
      event_id: data.event_id,
      pixel_code: data.pixel_code
    });
  } else {
    callInWindow("ttq.track", ttEvent, parameters, {
      event_id: data.event_id
    });
  }
};

const validate = (data) => {
  const errors = [];
  const warnings = [];

  // errors
  if (!checkExistence("ttq")) {
    errors.push("ttq not found");
  }

  // clean up
  if (data.external_id) {
    data.external_id = data.external_id.trim();
  }

  // warnings
  // 1. Prevent user from passing in SHA256 hash as "email" or "phone" to avoid double-hashing.
  // 2. Prevent user from passing in non-hash as "sha256_email" or "sha256_phone".
  if (data.email) {
    if (data.email.indexOf("@") === -1)
      warnings.push("data.email is not an email");
    if (looksLikeSHA256(data.email))
      warnings.push("data.email appears to be a SHA256 hash");
  }
  if (data.phone) {
    if (looksLikeSHA256(data.phone))
      warnings.push("data.phone appears to be a SHA256 hash");
  }
  if (data.sha256_email) {
    if (!looksLikeSHA256(data.sha256_email))
      warnings.push("data.sha256_email is not a SHA256 hash");
  }
  if (data.sha256_phone) {
    if (!looksLikeSHA256(data.sha256_phone))
      warnings.push("data.sha256_phone is not a SHA256 hash");
  }

  if (TTEventMap[data.event] == undefined && ValidEvents[data.event] === undefined) {
    warnings.push('data.event "' + data.event + '" is not a valid event');
  }

  for (const msg of warnings) {
    log("[WARN] " + msg);
  }
  for (const msg of errors) {
    log("[ERROR] " + msg);
  }
  return errors;
};

const start = () => {
  const errors = validate(data);
  if (errors.length > 0) {
    data.gtmOnFailure();
    return;
  }

  main();

  data.gtmOnSuccess();
};

start();
