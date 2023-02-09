# TikTok Pixel Client-Side Google Tag Manager Template

Google Tag Manager (GTM) is a tag management system that enables you to quickly and easily add measurement codes and related code fragments collectively known as tags on your website or mobile app. TikTok has developed a tag template that allows you to integrate with Google Tag Manager, enabling you to add Pixel Custom Code events with minimal to no developer resources.

## Table of Contents

- [Step 1. Install the TikTok Pixel Base Code](#install-base-code)
- [Step 2. Install the TikTok GTM Client-Side Template](#install-template)
- [Step 3. Create Tags with TikTok GTM Client-Side Template](#create-tag)
- [Migrating from Events Builder or Custom Code](#migrate)
- [Getting Support](#support)

## Pre-requisites

1. Already have a [Google Tag Manager](https://tagmanager.google.com/) workspace.
2. You should be using a Web container.
3. You need to have Google Tag Manager installed on your website.

To learn more about key components of Google Tag Manager, refer to this [Q&A](https://support.google.com/tagmanager/answer/6103657?hl=en)

## Getting Started

### <a name="install-base-code"></a> Step 1. Install the TikTok Pixel Base Code

There are two methods for installing TikTok's Pixel Base Code.

Note: Please only use one of the methods.

#### Method A: Installing Base Code through Events Manager (Recommended)

Use Events Manager to automatically create a base code tag for your pixel in your Google Tag Manager.

1. Go to TikTok Events Manager > Set up Web Events > Automatically Set Up Web Events via Partner Platforms.

![image](https://user-images.githubusercontent.com/115744386/217714438-0071d11c-4cc1-48d6-b5ba-95309cd20be3.png)

2. Select Google Tag Manager > Follow through the rest of the screens.

![image](https://user-images.githubusercontent.com/115744386/217714459-8d64e57d-1e8b-49e3-8b7f-d343b0fca1cd.png)

3. Follow the screens and log in to your Google account that is linked to your GTM workspace.

	1. Log in to your Google Account by clicking on the Connect button.

	![image](https://user-images.githubusercontent.com/115744386/217714506-8794ec1a-3221-452d-9383-06a2525172a4.png)

	2. Select the Container and Workspace that you wish to install the base code.

	![image](https://user-images.githubusercontent.com/115744386/217714540-e6ee3eff-b0f0-4480-8485-2c7c6ab787a8.png)

	3. After you have installed the base code, you may visit our template in Google Tag Manager gallery by clicking on the link. Then, follow through the Creating TikTok Event Tags steps below.
	
	![image](https://user-images.githubusercontent.com/115744386/217714571-bca9d226-c96d-41de-9db6-56f0e6af720f.png)

#### Method B: Installing through Custom HTML

Manually add a tag with the pixel base code.

1. Go to TikTok Events Manager > Set up Web Events > Manually Install Pixel Code > Custom Code. Copy your TikTok Pixel Base code from your Events Manager.

![image](https://user-images.githubusercontent.com/115744386/217715184-7dd4153e-a6d0-42c5-a7f7-91ee18d598cd.png)

2. Go to your Workspace > Select Tags > Select New.

![image](https://user-images.githubusercontent.com/115744386/217715420-216d16e9-0b3c-42ae-adf0-ef3a5b3fb125.png)

3. Name your tag (e.g. TikTok Pixel Base Code) > Click Tag Configuration > Select Custom HTML.

![image](https://user-images.githubusercontent.com/115744386/217715443-f4dcc441-eddc-4b75-a100-b38b7cb02df9.png)

4. Paste the Pixel Base Code from TikTok in the HTML field > Set the trigger to All Pages.

![image](https://user-images.githubusercontent.com/115744386/217715475-d189c360-4b94-4a67-983c-1b0337ededb1.png)


### <a name="install-template"></a> Step 2. Install the TikTok GTM Client-Side Template

1. Click on this link: ["TikTok Pixel" template by TikTok](https://tagmanager.google.com/gallery/#/owners/tiktok/templates/gtm-template-pixel). Alternatively, navigate to Google Tag Manager > Templates > [Search Gallery](https://tagmanager.google.com/gallery/#/) and search for "TikTok Pixel".

![image](https://user-images.githubusercontent.com/115744386/217718631-d2e54fb5-3fe8-468d-90f3-081ef6c48c6c.png)

2. Select Add to workspace to import the template into your workspace.
3. Save and close the template editor.



### <a name="create-tag"></a> Step 3. Create Tags with TikTok GTM Client-Side Template

After installing the base code, you should plan to trigger any one of our [TikTok 14 Events](https://ads.tiktok.com/marketing_api/docs?rid=5ipocbxyw8v&id=1701890972233730) according to your user journey, simply follow the steps below. For every event you wish to create:

1. Go to your Google Tag Manager Workspace > Select Tags > Select New.

2. Give your Tag a name e.g. TikTok ViewContent > Select the template you have just imported (TikTok Pixel).

![image](https://user-images.githubusercontent.com/115744386/217715647-d5baf76a-03fe-4f6f-8484-02893dd861e4.png)

3. You should then be able to choose from the 14 events you wish to trigger.

![image](https://user-images.githubusercontent.com/115744386/217715668-8e9e6ba8-31ce-407a-9b2b-8463910f49c8.png)

4. Finally, set a Trigger of your choice. For consistency, it is recommended to select the Google Tag Manager custom event you are invoking on your page. Then, save your tag.

![image](https://user-images.githubusercontent.com/115744386/217715698-de911d96-2ca1-4d67-a357-49ee17f15722.png)


#### Enable Advanced Matching

Advanced Matching is available via TikTok Business Tools to enable businesses to send privacy-safe customer information to better match website events with ads on TikTok. We recommend passing hashed emails and phone numbers for web events from your Data Layer to increase the efficacy of ad performance and attribution on TikTok. ([Learn more](https://ads.tiktok.com/help/article?aid=10007891))

1. Edit the tag you created and choose between passing in SHA256 hashed email / SHA256 hashed phone or simply just the plain email / phone (Note: You can do so by typing "{{" and selecting the available variables.)
2. After setting up the variables, click Save your tag.

![image](https://user-images.githubusercontent.com/115744386/217715821-df8ee351-72c1-4f29-a22c-15ca720663a1.png)


#### Product Contents: Use Enhanced Ecommerce or Standard Ecommerce

> **NOTE: Heavy Lifting Available**

If you have enabled [Google's Enhanced Ecommerce](https://developers.google.com/analytics/devguides/collection/ua/gtm/enhanced-ecommerce) or [Standard Ecommerce](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtm) to track online shopping events in your Google Analytics, you can leverage the ecommerce Data Layers to pass additional parameters to TikTok, to enable products such as Return on Ad Spend (ROAS), Dynamic Showcase Ads (DSA), and Value-Based Optimization (VBO). ([Learn more](https://ads.tiktok.com/marketing_api/docs?rid=5ipocbxyw8v&id=1701890973258754))

1. Edit the tag you created above.
2. Under Parameters Configuration > Check on the Use Google Analytics E-commerce Data Layers selection.
3. Select either Enhanced Ecommerce or Standard Ecommerce.

![image](https://user-images.githubusercontent.com/115744386/217715951-2960a552-2982-4415-b280-dd5fb646ef27.png)

4. Select the correct triggers that are firing your Enhanced Ecommerce events.
5. You may simply navigate to your website > inspect element (F12) > type in dataLayer in the console > find the Enhanced / Standard Ecommerce events which usually have the product details and check the event value.
6. The event value should be your custom event trigger.

![image](https://user-images.githubusercontent.com/115744386/217715991-5303db5f-fb47-4290-a7d2-dbbc39f08bf4.png)

7. Save your tag.


#### Product Contents: Custom Input

If you are not using any Google Enhanced Ecommerce of Standard Ecommerce, you may pass additional parameters back to TikTok using Data Layers. Please refer to [TikTok documentation](https://ads.tiktok.com/marketing_api/docs?rid=5ipocbxyw8v&id=1701890973258754) for more details on parameters.

##### Option 1: No Items

This option is for advertisers who are not hosting e-commerce websites.

1. Select No Contents if you are not planning to send any parameters from your event.

![image](https://user-images.githubusercontent.com/115744386/217716290-bd7acfe9-09f1-4821-bfd1-b24fc0323443.png)

2. Pass value and currency if you are planning to measure Total Value in your TikTok Reporting by passing them from the Data Layer variable that contains those values.
3. Save your tag.

##### Option 2: Single Item

This option is for advertisers whose events are typically for a single product. Examples of Single Content events include:

- A user viewing a page with a single item.
- A user adding a single item to the cart but with multiple quantities.

![image](https://user-images.githubusercontent.com/115744386/217716365-b91da45b-ffa5-473b-933b-a8827559116f.png)

1. Map the fields accordingly to your Data Layer variables. See example mapping:

![image](https://user-images.githubusercontent.com/115744386/217716380-31d27953-5356-4551-a8dc-8bda6db1f50d.png)

2. If you have uploaded catalogs to TikTok Catalog Manager, you should be aware that your products will have SKU ID and Item Group ID. Below is a mapping table of what you may use. If your content_id represents 1 product, use product, else if your content_id represents a group of products, use product_group

![image](https://user-images.githubusercontent.com/115744386/217716404-d79184bb-73e8-4323-8a72-3cbf0619fb19.png)

3. Then, save your tag.

##### Option 3: Multiple Items

This option is for advertisers whose events are typically for multiple products. Examples of Multiple Contents events include:

- A user checking out multiple items from the cart
- A user completes the payment for multiple items

![image](https://user-images.githubusercontent.com/115744386/217716497-35145c9d-469d-4db1-9689-c744c59e0809.png)

1. For multiple contents, you or your website developers will be required to generate a multiple content structure and add it to your dataLayer. See contents data layer items structure example:

```
[
        {
                content_id: "SKU 1",
                content_name: "product name 1",
                content_type: "product",
                quantity: 1,
                price: 10

        },
        {
                content_id: "SKU 2",
                content_name: "product name 2",
                content_type: "product",
                quantity: 2,
                price: 30
        },
        {
                content_id: "SKU 3",
                content_name: "product name 3",
                content_type: "product",
                quantity: 1,
                price: 50
        }
]
```

2. Select the dataLayer in the contents field.
3. Save your tag.

#### Additional Parameters

**[Achieve Gold Standard Pixel Here]** If you are not using any Google Enhanced Ecommerce of Standard Ecommerce, you may pass additional parameters back to TikTok using Data Layers.

Please refer to [TikTok documentation](https://ads.tiktok.com/marketing_api/docs?rid=5ipocbxyw8v&id=1701890973258754) for more details on parameters. To give a rough idea on the available parameters

**TikTok Shopping Ads Parameters**

- content_id
- content_name
- content_type
- quantity
- price

**ROAs and Value-based Optimization Parameters**

- currency
- value


## <a name="migrate"></a> Migrate to Google Tag Manager Template

### Migrate from Events Builder to Google Tag Manager Template.

> **NOTE** 
> 
> Read this only if you have implemented TikTok Pixel Events Builder in Google Tag Manager

1. If you have already set up TikTok Pixel Events Builder in Google Tag Manager, you should already have the [base code installed in Google Tag Manager](#install) while having triggers set up via css selector or URL in TikTok Events Manager.

	**WARNING: Migrating from TikTok Pixel Events Builder to use our Google Tag Manager Template means you are completely switching to TikTok Pixel Custom Code.**

3. Ensure that you have the template installed in your Google Tag Manager in [Step 1](#download).

4. Follow through [Step 3](#create-tag) to [Step 6](#params) to create Event Tags and set up parameters, advanced matching, etc. 

	**TIP: There is no need to create a new pixel, you may use your existing pixel**
	
5. Delete the Events Builder in TikTok Ads Manager as a best practice to prevent duplicate of events.

   ![](https://elegant-circle-342708.as.r.appspot.com/static/img/migrate_events_builder.png)

6. Save, preview and publish your events.



### Migrate from Custom Code to Google Tag Manager Template

> **NOTE**
> 
> Read this only if you have implemented TikTok Pixel Custom Code via Google Tag Manager Custom HTML Tag.


1. Make sure you have followed [Step 1](#download) to download our Google Tag Manager Template.


2. If you have already installed TikTok Pixel Custom Code in your Google Tag Manager Custom HTML tag, simply click on the edit button after opening up your Custom HTML tag.

   ![](https://elegant-circle-342708.as.r.appspot.com/static/img/migrate_custom_code.png)

3. Replace your Custom HTML tag with the installed template and follow through [Step 3](#create-tag) to [Step 6](#params) to set up parameters, advanced matching, etc.

4. Save, preview and publish your events.


## <a name="support"></a> Support


1. If you have any questions - please reach out to your TikTok Sales Representative.

2. Please do not edit any code in the template to ensure the intended functionality.

3. If you have any feature requests or issues, please file a request in GitHub [here](https://github.com/tiktok/gtm-template-pixel/issues).
