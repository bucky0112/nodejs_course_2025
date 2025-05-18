## 設定 Bucket 為公開存取

- 進入 AWS S3 Buckets 頁面
- 選擇建立的 bucket 名稱
- 點擊 Permissions
- 在 `Block public access (bucket settings)` 點擊 `Edit`
- 取消勾選 `Block all public access` 並儲存
- 在 `Bucket policy` 編輯 Policy，例如：

```json
{
    "Version": "2025-01-01",
    "Statement": [
        {
            "Sid": "AllowPublicRead",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::imagesaver/*"
        }
    ]
}
```