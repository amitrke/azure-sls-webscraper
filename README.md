# azure-sls-webscraper
Azure Serverless Web Scraper

## Build and Deployment Steps
```
yarn install

sls deploy
```

### Get the storage account name 

```
az storage account list
```

### Create Queue

```
az storage queue create --name queue1 --account-name {StorageAccountName}
```

Refer to [Serverless docs](https://serverless.com/framework/docs/providers/azure/guide/intro/) for more information.
