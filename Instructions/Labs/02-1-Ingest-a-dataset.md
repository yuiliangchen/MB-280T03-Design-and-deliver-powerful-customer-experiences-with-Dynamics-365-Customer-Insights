---
lab:
    title: 'Lab 2.1: Ingest a dataset'
---

# Module 2: Ingest data into Dynamics 365 Customer Insights - Data

## Lab Scenario: Contoso Coffee
Contoso Coffee produces high-quality coffee and coffee machines, which they retail through channels including new Contoso Retail Stores in premium locations, premium food resellers, and the Contoso Coffee Web Site. Contoso plans to further expand their offerings with Contoso Cafes and a new Connected Coffee Machine which can trigger refill orders and alert Contoso Service about any issues. This new offering will help them to build direct relationships with their customers and learn more about how customers consume their products.

### Contoso Coffee’s Challenges
- **Transactional Relationship:** Their existing business model means that they lack a direct relationship with their customers.
- **Data Silos:** They are unable to deliver personalized customer experiences.

### Contoso’s Existing Data Landscape
- **Fractured Customer Data:** With multiple systems, Contoso has multiple records for the same person. This causes a disjointed experience to the customer who expects to be treated as one person regardless of the channel they are transacting upon.
- **Multiple Platforms:** The architecture at Contoso has evolved through acquisition and legacy systems meaning that data can reside in not only different systems, but different platforms across multiple clouds and on-premise.
- **Non-Customer Data:** Contoso is drawing correlations between non-customer data and the impact it has on customer experiences, including data from third parties such as weather data.

### Contoso Coffee Customer Insights Project
You have been selected as the project manager for the implementation of Dynamics 365 Customer Insights at Contoso Coffee. As an experienced project manager, you devise the following plan:
1. Create a Customer Insights environment
2. Ingest data from highest priority data sources from within the business:
   - Point-of-Sale (POS)
   - Loyalty Data
   - Ecommerce Customers
   - Web Purchases
3. Create a unified customer profile from ingested data

## Module Introduction

### Lab pre-requisites:
Before you can start this exercise, you must have completed Lab 0 to set up your environment.

### Data Ingestion & Data Unification
As Project Manager for Contoso Retail, you will create a unified customer profile by ingesting key sources of customer data and following the Map, Match, and Merge process. In this lab, we will ingest data. In the next lab, we will unify the data.

**Approximate Time to Complete:** 45 minutes

### Familiarize yourself with Customer Insights - Data
In this task, you will explore the pre-configured Demo environment to familiarize yourself with moving around in the Customer Insights – Data application.
1. Sign in to Customer Insights - Data at https://home.ci.ai.dynamics.com if you are not already signed in.
2. In the Environment selector in the top right-hand corner, confirm **Marketing Trial** is selected.
3. Explore the left-hand menu options to familiarize yourself with the navigation:
   - **Home:** Home Page
   - **Customers:** View cards for unified Customer Profiles (you won't be able to view this yet - we need to ingest and unify our data first)
   - **Data > Data sources:** Ingest siloed demographic, transactional, or behavioral data. Map, match, and merge into a Unified Customer Profile. View your entities and define activity types and their relationships to your customers.
   - **Data > Enrichment:** Go beyond your unified profile and enrich customer profiles with Microsoft Proprietary Data. Unlock data on affinities for hundreds of brands and dozens of interest-categories. These affinities are extracted for profiles that might be like your customers.
   - **Insights > Segments, Measures & Predictions:** View segments, configure measures, and use out-of-the-box prediction models (or build your own). (You won't be able to view this section yet.)
   - **Settings:** Administer Roles, Permissions, APIs, and Export Destinations for Customer Segments.

## Exercise 1 - Data Ingestion
In this lab, you will become familiar with ingesting data from multiple sources. As Project Manager for Contoso Retail, you have already identified that key sources of data include eCommerce Customers, Online Purchases, in-store Point of Sales Purchases, and data from the Contoso Retail Loyalty Card scheme.

### Task 1 - Ingest Customer Data from eCommerce Platform
1. Sign in to Customer Insights at http://home.ci.ai.dynamics.com and verify **Marketing Trial** is selected in the drop-down menu in the top right-hand corner.
2. In Customer Insights, expand **Data** on the left navigation menu and select **Data sources.**
<img width="1440" height="755" alt="Screenshot 2025-12-07 at 5 30 38 PM" src="https://github.com/user-attachments/assets/91f66f7f-9c96-48da-b1d4-aad649a39159" />
3. Select **+Add a data source**. View the available methods of ingesting data. For this lab, choose Microsoft Power Query, name the source *eCommerce*, then select **Next.**
<img width="1440" height="756" alt="Screenshot 2025-12-07 at 5 33 17 PM" src="https://github.com/user-attachments/assets/284b5ced-6675-4009-b2ee-071c149e9cc3" />
4. You will be presented with a view of Power Query data sources that Customer Insights is able to ingest. Take note of the connector types available. Select the **Text/CSV** connector.
5. Enter https://aka.ms/CI-ILT/Contacts for File path or URL and select **Next.** It may take a few moments for the data to upload.
<img width="1440" height="755" alt="Screenshot 2025-12-07 at 5 38 02 PM" src="https://github.com/user-attachments/assets/59aedd39-1570-4789-9460-f4acc045cf9b" />
6. You should now see the data from the source tabulated. Select **Transform data** to configure the data types and formats for the data you ingest.
<img width="1440" height="755" alt="Screenshot 2025-12-07 at 5 40 33 PM" src="https://github.com/user-attachments/assets/540ff57b-e970-4769-a638-38cc61d594fd" />
7. You will notice that the column heading has appeared in the first row of the data. To correct this, either select **Transform > Use first row as headers** from the Home tab or select the **Transform** tab and then **Use first row as headers.**
<img width="1440" height="755" alt="Screenshot 2025-12-07 at 5 42 38 PM" src="https://github.com/user-attachments/assets/abcc388b-7cb7-4d70-b5be-ce7875cd74a0" />
8. Because we have ingested data from a Text/CSV source, all columns are defaulted to a 'Text' Data Type. To successfully ingest and model the data, we can set the data type for non-text columns. To change the data type, select the ABC icon on each column heading. Update the data type for these columns:
   - **DateOfBirth:** Date
   - **CreatedOn:** Date
   - **Income:** Currency
<img width="1440" height="756" alt="Screenshot 2025-12-07 at 5 44 39 PM" src="https://github.com/user-attachments/assets/c077a38a-edfe-4585-84e8-907387dbcbd7" />
9. Verify the Name field on the Query settings pane is set to Contacts. Select **Next**. Select **Save.**
   - Congratulations. You have now successfully created your first data source with a data set! We'll continue importing the next data set in the next task.
<img width="1440" height="755" alt="Screenshot 2025-12-07 at 6 45 14 PM" src="https://github.com/user-attachments/assets/d4c5ab3d-8a81-4da6-be6e-fc192c8a2c0e" />

## Task 2 - Ingest Online Purchase Data
In this task, we will ingest Online Purchase data, representing purchases made via the Contoso Coffee website.

1. In Customer Insights, expand **Data** on the left menu and select **Data sources.**
2. Under *Managed by me (1)*, select the **eCommerce** data set and select **Edit**. Select **Next.**
   - **Note:** If your data is still refreshing, you will need to wait for it to finish before editing. You can skip directly to Task 3, and then return to Task 2 after you have completed Tasks 3-5.
3. You should be presented with the Power Query view of the eCommerce Contacts data that you ingested in Task 1. On the **Home** tab, select **Get data.**
<img width="1440" height="756" alt="Screenshot 2025-12-07 at 6 48 01 PM" src="https://github.com/user-attachments/assets/b3ddfa60-b749-4348-ad02-3399d4009cf3" />
4. You will be presented with a view of data source connectors that Customer Insights is able to ingest. Select the **Text/CSV Connector.**
5. Enter https://aka.ms/CI-ILT/OnlinePurchases for File path or URL and select **Next**. Select **Create.**
6. As before, select **Transform**, then **Use first row as headers.**
7. Update the data types for the following columns:
   - **PurchasedOn:** Date
   - **TotalPrice:** Currency
8. Name this query *Purchases* and select **Save.**
<img width="1440" height="755" alt="Screenshot 2025-12-07 at 6 51 03 PM" src="https://github.com/user-attachments/assets/6b3efcf9-9b1c-4095-b333-b25a869ace32" />

## Task 3 - Ingest Customer Data from Loyalty Scheme
1. In Customer Insights, expand **Data** on the left menu and select **Data sources.**
2. Select **+Add a Data Source** and choose **Microsoft Power Query** as the import method. Name the source *Loyalty*, then select **Next.**
3. Select the **Text/CSV connector.**
4. Enter https://aka.ms/CI-ILT/LoyaltySchemeCustomers for File path or URL, select **Next** and then select **Transform data.**
5. As before, select Transform, then Use first row as headers.
6. Update the data type for these columns:
   - **DateOfBirth:** Date
   - **RewardPoints:** Whole number
   - **CreatedOn:** Date
7. Rename this query to *Customers* in the Query settings pane and select **Next.**
<img width="1440" height="754" alt="Screenshot 2025-12-07 at 7 07 29 PM" src="https://github.com/user-attachments/assets/fc141215-492c-43e9-9069-cb9a001fc7c6" />
8. On the refresh screen, select **Save.**

## Task 4 - Ingest Customer Data from Point of Sale Purchases
1. In Customer Insights, expand **Data** on the left navigation menu and select **Data sources.**
2. Select **+ Add a data source**, choose **Microsoft Power Query** and name the source *PoS*, then select **Next.**
3. Select the **Text/CSV connector.**
4. Enter https://aka.ms/CI-ILT/POSPurchases for File path or URL. Select **Next** and then select **Transform data.**
5. As before, select **Transform**, then **Use first row as headers.**
6. Update the data type for these columns:
   - **PurchasedOn:** Date
   - **TotalPrice:** Currency
   - **RewardPointsAdded:** Whole number
7. In the **Name** field on the Query settings pane, rename the query to *Purchases.* Select **Next.**
<img width="1440" height="755" alt="Screenshot 2025-12-07 at 7 00 32 PM" src="https://github.com/user-attachments/assets/80750ce5-272c-47b1-bd37-5d47875097a4" />
8. On the data refresh screen, select **Save.**

## Task 5 - Ingest Customer Data from Website Reviews
1. In Customer Insights, expand **Data** on the left navigation menu and select **Data sources.**
2. Select **+ Add a data source**. Choose **Microsoft Power Query** and name the source *Website,* then select **Next.**
3. Select the **Text/CSV connector.**
4. Enter https://aka.ms/CI-ILT/WebReviews for File path or URL. Select **Next** and then select **Transform data.**
5. As before, select **Transform,** then **Use first row as headers.**
6. Update the data type for these columns:
   - **ReviewRating:** Whole number
   - **ReviewDate:** Date
7. In the **Name** field on the Query settings pane, rename the query to *Reviews.* Select **Next**.
<img width="1440" height="755" alt="Screenshot 2025-12-07 at 7 03 03 PM" src="https://github.com/user-attachments/assets/c4fa0169-f2a5-474f-aed4-b3298d7f2e36" />
8. On the Refresh settings screen, select **Save.**
