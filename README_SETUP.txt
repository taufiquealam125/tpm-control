TAUFIQUE CONTROL  -  mobile app (GitHub) + tool setup
=====================================================

Is app se tum phone se kisi bhi flash-drive copy ko ON/OFF / KILL kar sakte ho.
Ye GitHub ki ek file (control.json) ko badalti hai; tool wahi file padhta hai.

--------------------------------------------------------------------
PART A - GitHub taiyaar karo (ek baar, ~5 min)
--------------------------------------------------------------------
1. github.com pe free account banao (agar nahi hai).
2. New repository banao, naam jaise  tpm-control , visibility = PUBLIC.
   (Public theek hai - ismein sirf stick IDs + ON/OFF hai, kuch sensitive nahi.
    Likh sirf tum sakte ho token se; doosra sirf padh sakta hai.)
3. Us repo mein ye 5 files daalo (is folder se):
      index.html
      manifest.webmanifest
      sw.js
      icon-192.png
      icon-512.png
      control.json
   (GitHub website pe "Add file -> Upload files" se phone/PC se upload kar do.)
4. GitHub Pages ON karo:
      repo -> Settings -> Pages -> Branch: main , folder: / (root) -> Save
   Thodi der baad tumhe ek link milega jaise:
      https://TUMHARA-USERNAME.github.io/tpm-control/
   Yahi tumhari APP ka link hai.
5. Personal Access Token banao (app ko likhne ke liye):
   GitHub -> Settings -> Developer settings -> Fine-grained tokens ->
   Generate new token -> sirf is repo ko select karo ->
   Permissions: Repository -> Contents -> Read and write -> Generate.
   Token (ghp_...) copy kar lo.

--------------------------------------------------------------------
PART B - App phone pe lagao
--------------------------------------------------------------------
1. Phone (Chrome) mein app ka link kholo:  https://...github.io/tpm-control/
2. Setup screen mein bharo: username, repo (tpm-control), branch (main),
   path (control.json), aur Token (ghp_...). SAVE & CONNECT.
3. Chrome menu -> "Add to Home screen" -> ab ye app icon ki tarah khulega.
   (Token phone pe hi save rehta hai, kahin nahi jata.)

--------------------------------------------------------------------
PART C - Tool ko is GitHub se jodo (ps1 ke top mein, build se pehle)
--------------------------------------------------------------------
  $global:LIC_URL='https://raw.githubusercontent.com/TUMHARA-USERNAME/tpm-control/main/control.json'
  $global:LIC_KEY=''                 (GitHub public raw ke liye khali rakho)
  $global:LIC_OWNERKEY='koi-apna-secret-word'
  $global:LIC_GRACEDAYS=4
Phir Build_v9_54.bat chala ke EXE banao.

Apni MASTER copy: tool folder mein file  owner.key  banao jisme wahi secret word ho
(LIC_OWNERKEY wala) -> tumhari ye copy kabhi band nahi hogi.
Worker sticks mein owner.key MAT daalna.

--------------------------------------------------------------------
PART D - Rozana use
--------------------------------------------------------------------
- Har stick pe tool chalte hi folder mein StickID.txt ban jati hai -> us ID ko
  app mein "ADD STICK" se daal do (note ke saath, jaise kis worker ki hai).
- Kisi ko band karna ho -> app mein us stick ka switch OFF karo (ya KILL ALL).
- Wo copy agli baar internet ke saath khulte hi warning dikha ke khud delete ho jayegi.
- Wapas chalu karna ho -> switch ON.

Note: offline stick LIC_GRACEDAYS din tak chalegi, phir internet maangegi.

--------------------------------------------------------------------
PART E - Per-device PASSWORD (app se set karo)
--------------------------------------------------------------------
- App mein har stick ke aage ek chaabi (key) button hai. Us pe tap karke
  us device ka password set/change kar sakte ho. Khali chhod ke OK = password hata do.
- Jis stick pe password set hai, us PC pe tool khulte waqt password maangega;
  galat 3 baar -> tool nahi khulega.
- Password sirf HASH ke roop mein store hota hai (public GitHub file mein bhi
  asli password nahi dikhta). Tumhari owner.key wali master copy pe password nahi lagta.
- NOTE: app sirf HTTPS pe chahiye (GitHub Pages link HTTPS hota hai) - tabhi
  hashing kaam karti hai. Local file se mat kholo.
