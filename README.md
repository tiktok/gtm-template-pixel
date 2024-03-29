![](https://elegant-circle-342708.as.r.appspot.com/static/img/tt-x-gtm-new.png)

# TikTok Pixel Client-Side Google Tag Manager Template

The Google Tag Manager Client Side Template is created to speed up the set up of TikTok Events in Google Tag Manager without the need of writing a line of code. This doc will bring you through the downloading and installation of the template into your Google Tag Manager workspace.


For general questions about TikTok pixel, please submit a ticket [here](https://ads.tiktok.com/athena/requester/boards/1705151646989743?identify_key=6a1e079024806640c5e1e695d13db80949525168a052299b4970f9c99cb5ac78).


## Table of Contents

1. [Install the TikTok GTM Client Side Template](#download)
2. [Installing TikTok Pixel Base Code](#install)
3. [Creating TikTok Event Tags](#create-tag)
4. [Enable Advanced Matching](#am)
5. [Enable Enhanced / Standard Ecommerce Heavy-Lifting](#eecomm)
6. [Enable Additional Parameters](#params)
7. [Updating TikTok's GTM Client Side Template](#update)
8. [Migrating from Events Builder](#migrate-events)
9. [Migrating from Custom Code](#migrate-custom)
10. [Getting Support](#support)
11. [Change Logs](#change)

## Pre-requisites

1. Already have a [Google Tag Manager](https://tagmanager.google.com/) workspace.
2. Already have Google Tag Manager installed in your website.
3. Have certain understanding of Google Tag Manager components below. If not refer to this [Q&A](https://support.google.com/tagmanager/answer/6103657?hl=en)

- Tags
- Triggers
- DataLayer
- Variables
- Templates

### <a name="download"></a> 1. Install the TikTok GTM Client Side Template

You can find our template in the [Google Tag Manager Template Gallery](https://tagmanager.google.com/gallery/#/owners/tiktok/templates/gtm-template-pixel). Click "Add to workspace" to install it into your workspace.

### <a name="install"></a> 2. Installing TikTok Pixel Base Code

Before installing any TikTok Event Tag, always remember to install **TikTok's Pixel Base Code** and set **trigger to fire on all pages**. If you already have got the Base Code installed, you may go to the next step.

### Method A: Installing Base Code through Custom HTML

1. Go to your **Workspace** > Select **Tags** > Select **New**

   ![](https://elegant-circle-342708.as.r.appspot.com/static/img/1-basecode_1.png)

2. Give your tag a name **e.g. TikTok Pixel Base Code** > Click **Tag Configuration** > Select **Custom HTML**

   ![](https://elegant-circle-342708.as.r.appspot.com/static/img/1-basecode_2.png)

3. Copy the **Pixel Base Code** from TikTok and paste it in the **HTML** field > Set the **trigger** to **All Pages**.

   ![](https://elegant-circle-342708.as.r.appspot.com/static/img/1-basecode_3.png)

### Method B: Alternatively, Installing Base Code through TikTok Events Manager UI

1. Go to **TikTok Events Manager** > **Set up Web Events** > **Automatically Set Up Web Events via Partner Platforms**

   ![](https://elegant-circle-342708.as.r.appspot.com/static/img/1-basecode_4.png)

2. Select **Google Tag Manager** > Follow through the rest of the screens

   ![](https://elegant-circle-342708.as.r.appspot.com/static/img/1-basecode_5.png)

### <a name="create-tag"></a> 3. Creating TikTok Event Tags

After installing the base code, you should plan to trigger any one of our [TikTok 14 Events](https://ads.tiktok.com/marketing_api/docs?rid=5ipocbxyw8v&id=1701890972233730) according to your user journey, simply follow the steps below. For every event you wish to create:

1. Go to your **Workspace** > Select **Tags** > Select **New**

2. Give your Tag a name **e.g. TikTok ViewContent** > Select the **template you have just imported (TikTok Event Tag vX.X.XX)**

   ![](https://elegant-circle-342708.as.r.appspot.com/static/img/2-createtag_1.png)

3. You should then be able to choose from the 14 events you wish to trigger.

   ![](https://elegant-circle-342708.as.r.appspot.com/static/img/2-createtag_2.png)

4. Finally, set a **Trigger** of your choice. For consistency, it is recommended to select the Google Tag Manager custom event you are invoking on your page. Then, save your tag.

   ![](https://elegant-circle-342708.as.r.appspot.com/static/img/2-createtag_3.png)

### <a name="am"></a> 4. Enable Advanced Matching

> **IMPORTANT!**
>
> You should already have **email** and **phone** Data Layers set up and if you have industry standard SHA256 hashed email and phone, you should also use them and have them set up.

**[Achieve Gold Standard Pixel Here]** You are recommended to pass TikTok user email and phone parameters to enable Advanced Matching. This will greatly improve attribution and leads to a larger audience created for you on TikTok for better Ad performance.

1. Edit the tag you recently created and check on the **Enable and Pass Advance Matching (AM) Parameters** selection.

2. You may choose between passing in **SHA256 hashed email** / **SHA256 hashed phone** or simply just the plain **email** / **phone**.

   ![](https://elegant-circle-342708.as.r.appspot.com/static/img/3-am_1.png)

3. If you are familiar with Data Layer Variables, you may simply invoke the list by typing in a double curly brackets `{{` and you will be able to select the available variables.

   ![](https://elegant-circle-342708.as.r.appspot.com/static/img/3-am_2.png)

4. After setting up the variables, save your tag.

### <a name="eecomm"></a> 5. Enable Enhanced / Standard Ecommerce Heavy-Lifting

If you are already using [Google Enhanced Ecommerce](https://developers.google.com/analytics/devguides/collection/ua/gtm/enhanced-ecommerce) or [Standard Ecommerce](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtm) to track user's online shopping events such as product detail views, add to cart, purchases on Google Analytics. You may leverage on the `ecommerce` Data Layers you have already created to pass parameters to TikTok. This usually is a one-click set up and if you set this up you may skip the next step completely.

1. Edit the tag you recently created.

2. Under Parameters Configuration > Check on the **Use Google Analytics E-commerce Data Layers** selection > Select either **Enhanced Ecommerce** or **Standard Ecommerce**. That's it!

   ![](https://elegant-circle-342708.as.r.appspot.com/static/img/4-ee_1.png)

3. Select the correct triggers that are firing your Enhanced Ecommerce events. You may simply **navigate to your website** > **inspect element (F12)** > type in **dataLayer** in the console > find the Enhanced / Standard Ecommerce events which usually has the product details and check the **event** value. The event value should be your custom event trigger.

   ![](https://elegant-circle-342708.as.r.appspot.com/static/img/4-ee_2.png)

4. Then, save your tag.

### <a name="params"></a> 6. Enable Additional Parameters

> **NOTE: Heavy Lifting Available**
>
> If you have Enhanced Ecommerce or Standard Ecommerce implemented, there is no need for you to go through this section as the step above [Enable Enhanced / Standard Ecommerce Heavy-Lifting](#eecomm) have already helped you manipulate the exisiting `ecommerce` Data Layers into Additional Parameters and sending them as signals to TikTok.

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

### Option 1: No Items

1. If you are not planning to send any parameters from your event, simply select the No Contents. This option is usually for advertisers who are not from the e-commerce verticals.

   ![](https://elegant-circle-342708.as.r.appspot.com/static/img/5-params_1.png)

2. We deliberately left the **value** and **currency** available to cater for advertisers who wish to only pass in **value** and **currency** if you are planning to track events Total Value in your reporting.

3. If you wish to pass in **value** and **currency**, simply pass in the Data Layer variable that contains those values.

   ![](https://elegant-circle-342708.as.r.appspot.com/static/img/5-params_2.png)

4. Then, save your tag.

### Option 2: Parameters for Single Item

1. If your event is typically for a single product. You should select the **Single Content** option. Some examples of **Single Content** events will be:

   - A user viewing a page with a single item
   - A user adding a single item to the cart but with multiple quantities

   ![](https://elegant-circle-342708.as.r.appspot.com/static/img/5-params_3.png)

2. Fill up the fields accordingly to your Data Layer variables. A rough idea on how to fill this up will be:

   | Content Field | Your Data Layer |
   | ------------- | --------------- |
   | content_id    | SKU ID          |
   | content_name  | Product Name    |
   | content_type  | product         |
   | price         | price           |
   | quantity      | quantity        |
   | value         | value           |
   | currency      | currency        |

   ![](https://elegant-circle-342708.as.r.appspot.com/static/img/5-params_4.png)

3. To differentiate between `product` and `product_group`. If you have uploaded catalogs to TikTok Catalog Manager, you should be aware that your products will have `SKU ID` and `Item Group ID`. Below is a mapping table of what you may use.

   | IF                         | content_type  |
   | -------------------------- | ------------- |
   | content_id = SKU ID        | product       |
   | content_id = item_group_id | product_group |

   However, if you are unsure, you may follow this generic guideline: If your `content_id` represents 1 product, use `product`, else if your `content_id` represents a group of products, use `product_group`

4. Then, save your tag.

### Option 3: Parameters for Multiple Item

1. If your event is typically for multiple products. You should select the **Multiple Contents** option. Some examples of **Multiple Contents** events will be:

   - A user checking out multiple items from the cart
   - A user completes the payment for multiple items

     ![](https://elegant-circle-342708.as.r.appspot.com/static/img/5-params_5.png)

2. For multiple contents, you will need to form multiple content structure. Your `contents` data layer should be a list of items structured like this. If you are unsure on how to do this, you may approach your website developers to add this structure to the `dataLayer`.

   ```
   // contents
   [
   	{
   		content_id: 'SKU 1',
   		content_name: 'product name 1',
   		content_type: 'product',
   		quantity: 1,
   		price: 10
   	},
   	{
   		content_id: 'SKU 2',
   		content_name: 'product name 2',
   		content_type: 'product',
   		quantity: 2,
   		price: 30
   	},
   	{
   		content_id: 'SKU 3',
   		content_name: 'product name 3',
   		content_type: 'product',
   		quantity: 1,
   		price: 50
   	}
   ]
   ```

3. Finally, specify the data layer in the contents field.

   ![](https://elegant-circle-342708.as.r.appspot.com/static/img/5-params_6.png)

4. Then, save your tag.

### <a name="update"></a> 7. Updating TikTok's GTM Client Side Template

1. Follow the steps to [Install the TikTok GTM Client Side Template](#download)

2. You should see a new template appearing on yout Templates list.

   ![](https://elegant-circle-342708.as.r.appspot.com/static/img/6-update_1.png)

3. Edit your existing tags, **remember the existing settings**

4. Edit the **Tag Type** > Select the **Latest Version Template** in the Custom section

   ![](https://elegant-circle-342708.as.r.appspot.com/static/img/6-update_2.png)

5. Note: You will need to set up the Advanced Matching, Parameters all over again after the template change.


### <a name="migrate-events"></a> 8. Migrate from Events Builder to Google Tag Manager Template.

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



### <a name="migrate-custom"></a> 9. Migrate from Custom Code to Google Tag Manger Template

> **NOTE**
> 
> Read this only if you have implemented TikTok Pixel Custom Code via Google Tag Manager Custom HTML Tag.


1. Make sure you have followed [Step 1](#download) to install our Google Tag Manager Template.


2. If you have already installed TikTok Pixel Custom Code in your Google Tag Manager Custom HTML tag, simply click on the edit button after opening up your Custom HTML tag.

   ![](https://elegant-circle-342708.as.r.appspot.com/static/img/migrate_custom_code.png)

3. Replace your Custom HTML tag with the installed template and follow through [Step 3](#create-tag) to [Step 6](#params) to set up parameters, advanced matching, etc.

4. Save, preview and publish your events.


### <a name="support"></a> 10. Support / Terms & Condition

> **WARNING**
>
> The template is not officially supported and it is act as tool to speed up your custom code development. TikTok will not be held liable for any issues for your Ads.

1. If you have any questions on the template please reach out to your TikTok Sales Representative.

2. Please do not edit any code in the template if you are not sure of what you are doing.

3. If you have any Feature requests / Issues, please file a request in GitHub [here](https://github.com/tiktok/gtm-template-pixel/issues).

### <a name="change"></a> 11. Change Logs

- V0.1.14
  - Initial Release
