# TikTok Pixel Template

## About TikTok Pixel

TikTok Pixel is a piece of javascript code that you can place on your website that allows you to share website events with TikTok. The Pixel can be used with any TikTok for Business tools to measure traffic on your website, measure ad campaign performance, optimize your campaigns and find new customers.
<br><br>


## About TikTok Pixel x GTM Integration

You can use Google Tag Manger (GTM) to manage TikTok Pixel code installation and use this template to help configure pixel events to trigger on your website events. [Learn more](https://business-api.tiktok.com/portal/docs?id=1799004006287425)  
  * You need to first install the TikTok Base Code before using this template. See [Base Code and Template Installation](#base-code-and-template-installation).
  * This template parses Google Analytics 4 (GA4) events received by GTM web container, converts them to TikTok events and fires the Pixel events.
    * If you use TikTok Event Builder (Recommended) to configure Pixel events firing, then you don't need to use this template. Learn more about [Event Builder](https://ads.tiktok.com/help/article/about-event-builder-2).
<br><br>


## Base Code and Template Installation

### (Recommended) Install using Events Manager interactive setup flow

We recommend setting up Pixel x GTM Integration using TikTok Events Manager's interactive setup flow. The interactive flow guides you in configuring the integration and automatically installs this template and also the Pixel Base Code tag in a few clicks.
  * To get started, see our [developer document](https://business-api.tiktok.com/portal/docs?id=1799004034003969).

### Install manually
1. Install Pixel Base Code tag

* Create a <i>Custom HTML</i> tag in your GTM Web container.*
* Copy the Pixel Base Code from TikTok Events Manager and paste it in the HTML field, and set the trigger to <i>All Pages</i>.
  
  ![image](https://github.com/tiktok/gtm-template-pixel/assets/143729589/404b3a98-e73d-49a9-98d7-41c3975865ca)
  
2. Install TikTok Pixel Template tag

* You can find this template in [GTM Template Gallery](https://tagmanager.google.com/gallery/#/owners/tiktok/templates/gtm-template-pixel) and add it into your GTM Web container workspace.

  ![image](https://github.com/tiktok/gtm-template-pixel/assets/143729589/e548beed-0b42-4830-9ebd-48f4d386e482)
<br><br>


## Set up TikTok Events

### (Recommended) Using TikTok Event Builder
For TikTok Pixel x GTM Integration, we recommend setting up events using TikTok Event Builder. Learn more about [Event Builder](https://ads.tiktok.com/help/article/about-event-builder-2).
* You don't need to install this template if you uses Event Builder.

### Using GTM data layer or manually configure events
Use this template if you plan to use GTM data layer or want to manually configure events
  * The template recognizes [Google Analytics 4 (GA4) standard events and schema](https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtm), and will convert those to TikTok events and fires the Pixel events.  Follow the developer document on [Set up TikTok events with GTM data layer](https://business-api.tiktok.com/portal/docs?id=1799004097478658) to complete the setup.
  * You can also use the <i>Parameter Override</i> section in this template to manually set up TikTok events/parameters or override specific events/parameters parsed from GA4 events. See the developer document on [Set up TikTok events manually](https://business-api.tiktok.com/portal/docs?id=1799004110681154).
<br><br>


## Verify Pixel x GTM Integration
See <i>Verify TikTok Pixel Setup</i> section in this [developer document](https://business-api.tiktok.com/portal/docs?id=1799004129683458). <br>
If you have any feature requests or issues, please file a request in GitHub [here](https://github.com/tiktok/gtm-template-pixel/issues).
<br><br>

## Change Logs

- V0.1.14
  - Initial Release
- V0.2.01
  - Support parsing data layer GA4 recommended events
