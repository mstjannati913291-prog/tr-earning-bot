# TR Earning Bot Mini App — Demo

এই ZIP-এ Telegram Mini App-এর একটি **ফ্রন্টএন্ড ডেমো** রয়েছে।

## চালু করা
1. ZIP extract করুন।
2. `index.html` একটি HTTPS hosting-এ upload করুন (যেমন GitHub Pages/Vercel)।
3. Telegram-এর `@BotFather` থেকে আপনার bot-এর Menu Button / Web App URL হিসেবে hosted URL দিন।
4. Telegram-এর ভেতর bot খুলে Mini App চালান।

## Demo-তে আছে
- Home, Task, Refer, Profile navigation
- Balance ও transaction history (শুধু এই browser-এর localStorage-এ)
- Task list এবং demo task submission
- Deposit/Withdraw request preview (বাস্তব লেনদেন নয়)
- নির্ধারিত Admin ID `8996484843`-এর জন্য demo task-add panel
- Bot username: `@TREarningHubBot`

## গুরুত্বপূর্ণ সীমাবদ্ধতা
এটি backend ছাড়া demo। localStorage-এর ব্যালেন্স/হিস্ট্রি নিরাপদ বা server-synced নয়। কোনো বাস্তব deposit, withdrawal, payment verification বা referral commission স্বয়ংক্রিয়ভাবে সম্পন্ন হয় না। বাস্তব অর্থের ফিচার চালুর আগে নিরাপদ backend, database, server-side Telegram initData verification, admin authentication, audit log এবং বৈধ payment-provider integration তৈরি ও পরীক্ষা করতে হবে। কখনো ব্যবহারকারীর Gmail/password সংগ্রহ করবেন না।
