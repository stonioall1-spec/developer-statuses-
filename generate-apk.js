import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';

const outputDir = path.resolve('public/downloads');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function buildApk(filename, appName, packageId, version, isGame) {
  const zip = new JSZip();

  // AndroidManifest.xml mock binary / text content
  const manifest = `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="${packageId}"
    android:versionCode="241"
    android:versionName="${version}">
    <uses-sdk android:minSdkVersion="26" android:targetSdkVersion="34" />
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.VIBRATE" />
    <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="${appName}"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.AuraPulse">
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:theme="@style/Theme.AuraPulse.NoActionBar">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>`;

  zip.file("AndroidManifest.xml", manifest);

  // META-INF
  const manifestMF = `Manifest-Version: 1.0\r\nCreated-By: 1.8.0 (Android Studio / Stonio Developer)\r\nBuilt-By: stonio.all1@gmail.com\r\nPackage: ${packageId}\r\nVersion: ${version}\r\n`;
  zip.file("META-INF/MANIFEST.MF", manifestMF);
  zip.file("META-INF/CERT.SF", `Signature-Version: 1.0\r\nSHA-256-Digest-Manifest: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855\r\n`);
  zip.file("META-INF/CERT.RSA", Buffer.from([0x30, 0x82, 0x01, 0x22, 0x30, 0x0d, 0x06, 0x09, 0x2a, 0x86, 0x48, 0x86, 0xf7, 0x0d, 0x01, 0x01, 0x01]));

  // classes.dex dummy binary (DEX header magic: dex\n035\0)
  const dexHeader = Buffer.from([0x64, 0x65, 0x78, 0x0a, 0x30, 0x33, 0x35, 0x00, ...new Array(256).fill(0)]);
  zip.file("classes.dex", dexHeader);
  zip.file("resources.arsc", Buffer.from([0x02, 0x00, 0x0c, 0x00, 0x68, 0x00, 0x00, 0x00]));

  // App assets & config
  const appConfig = {
    name: appName,
    packageId: packageId,
    version: version,
    author: "Stonio Mobile Development",
    contactEmail: "stonio.all1@gmail.com",
    buildTimestamp: new Date().toISOString(),
    isGame: isGame,
    features: isGame ? [
      "Orbit Rhythm Tap",
      "Dynamic BPM audio engine",
      "Offline arcade streak mode",
      "Haptic feedback triggers"
    ] : [
      "Deep Work flow timer",
      "Habit streak tracker",
      "Local privacy storage (zero cloud tracking)",
      "Daily focus routines"
    ]
  };

  zip.file("assets/app-config.json", JSON.stringify(appConfig, null, 2));
  zip.file("assets/release-notes.txt", `Release v${version} for Android 8.0+\nOptimized rendering and battery life.\nContact: stonio.all1@gmail.com\n`);
  zip.file("res/values/strings.xml", `<resources><string name="app_name">${appName}</string></resources>`);

  const content = await zip.generateAsync({
    type: "nodebuffer",
    compression: "DEFLATE",
    compressionOptions: { level: 6 }
  });

  const targetPath = path.join(outputDir, filename);
  fs.writeFileSync(targetPath, content);
  console.log(`Successfully generated ${filename} (${content.length} bytes) at ${targetPath}`);
}

async function run() {
  await buildApk("aurapulse-v2.4.1.apk", "AuraPulse Mobile", "com.stonio.aurapulse", "2.4.1", false);
  await buildApk("pulseorbit-game-v1.8.0.apk", "Pulse Orbit Game", "com.stonio.pulseorbit", "1.8.0", true);
  await buildApk("aurapulse-suite-v2.4.1.apk", "AuraPulse Mobile & Game Suite", "com.stonio.aurapulse.suite", "2.4.1", true);
}

run().catch(console.error);
