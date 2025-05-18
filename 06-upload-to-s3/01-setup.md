## 如何將圖片儲存到資料庫中？

一般來說，不會將圖片這類的檔案直接存在資料庫。所以會有一些方案可以使用：

- AWS S3
- Firebase

## 如何設定 AWS S3?

需要一些前置作業：

- ASW 帳號
- S3 Bucket
- IAM User

主要會在專案中新增一個環境變數，並按照下面的格式依序填入：

```
AWS_ACCESS_KEY_ID= access key id
AWS_SECRET_ACCESS_KEY= secret access key
AWS_REGION= AWS 區域
S3_BUCKET_NAME= S3 bucket 名稱
```

### IAM (Identity & Access Management)

1. 登入並進入 AWS Console
2. 搜尋 `IAM` 並進入該頁面
3. 點擊左邊 sidebar 的 Users，並新增 user
4. 取一個方便辨識的名稱，例如 `imageUploaderBot`
5. Set permissions，選擇 `Attach policies directly`，搜尋 `AmazonS3FullAccess` 並勾選之後，下一步 Create user
6. 再次進到 Users 頁面，並點擊剛剛建立的 user 名稱，並點擊 `Create access key`
7. 選擇 `Application running outside AWS` 後點擊 `Create access key`
8. 拿到 Access key 跟 Secret access key

### S3

1. 搜尋 `S3` 並進入該頁面，點擊 `Create bucket`
2. 取一個名稱，例如 `imagesaver`，然後 create bucket
3. 這裡可以看到 AWS Region，例如 `Asia Pacific (Sydney) ap-southeast-2`，就是 `ap-southeast-2`
4. 設定 `S3_BUCKET_NAME`

## 安裝必要 SDK 跟套件

因為需要按照 AWS 的需求去設定專案，儘量按照 [AWS 官網](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started-nodejs.html) 去安裝相關 SDK。

```bash
npm install express multer @aws-sdk/client-s3 dotenv @aws-sdk/s3-request-presigner
```