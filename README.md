![PunkCity Header](PunkCity_header.png)

> *Night City doesn't respect you. It doesn't see you as anybody.*
> *Survival is not a right it's a privilege. Earn your place, or become another body on the street.*

---

> [!IMPORTANT]
> - PunkCity is built for **Cyberpunk 2077**. Phantom Liberty DLC is **strongly recommended**.
> - This list is currently in active development. Expect additions and changes between versions.

> [!WARNING]
> Always launch the game through **Mod Organizer 2**. Launching through Steam directly will bypass the mod setup and break the list.

---

## Table of Contents

- [About](#what-is-this)
- [System Requirements](#system-requirements)
- [Preinstallation](#preinstallation)
- [Installation](#installation)
- [Post-Installation](#post-installation)
- [Core Mods](#core-mods)
- [Updating the Modlist](#updating-the-modlist)
- [Known Issues](#known-issues)

---

## About

**PunkCity** is a Wabbajack modlist for *Cyberpunk 2077* built around one idea: **the city owes you nothing**.

Most playthroughs let you become a legend overnight. PunkCity pushes back. Your body has needs. Your reputation has weight. The story won't drag you along, it waits for you to earn the right to be part of it. The city is indifferent, the streets are dangerous, and every cold decision you make will follow you.

This is no power fantasy, you'll create no montage nor any highlight reels. You'll suffer and you'll be content.

**What you're getting into:**

- **Survival mechanics** that makes your body a resource you have to manage
- A **paced experience** that rewards immersion over rushing
- True **reputation system** where senseless violence has real costs
- *(More systems being added, check back as the list develops)*

---

## System Requirements

> [!WARNING]
> - You need an **official, fully updated** copy of *Cyberpunk 2077*.
> - An **SSD is required.** Do not attempt to run this from an HDD.
> - Only **Windows 10/11** is supported.

*Minimum specs and recommended hardware will be listed here as the list is finalized.*

<details>
<summary><strong>Estimated Size Breakdown</strong></summary>

> *Exact figures will be updated as the list grows.*

- **Base Game + DLC:** ~84.6 GB
- **Modlist Downloads:** TBD
- **Modlist Install Size:** TBD

</details>

---

## Preinstallation

> The steps below assume you're using the **Steam** version of the game.

1. Perform a [clean install](https://support.cdprojektred.com/en/cyberpunk/pc/sp-technical/issue/2233/how-do-i-perform-a-clean-install-of-the-game) of *Cyberpunk 2077*. Install it **outside of `Program Files`**.

2. Install the [Visual C++ Redistributables (All-in-One)](https://www.techpowerup.com/download/visual-c-redistributable-runtime-package-all-in-one/), extract and run `install_all.bat` as administrator (for full automation).

3. Disable Steam auto-updates for Cyberpunk 2077:
   <details>
   <summary>How to disable auto-updates</summary>

   1. Right-click *Cyberpunk 2077* in your Steam Library → **Properties**
   2. Go to the **Updates** tab
   3. Set Automatic Updates to **"Only update this game when I launch it"**
   4. From now on, **only launch through Mod Organizer 2**

   </details>

4. Make sure all official DLC is installed.

5. Install [REDmod](https://store.steampowered.com/app/2060310/Cyberpunk_2077_REDmod/) if you haven't already.

6. Update your GPU drivers [NVIDIA App](https://www.nvidia.com/en-us/software/nvidia-app/) or [AMD Adrenalin](https://www.amd.com/en/support/download/drivers.html).

7. Install the [.NET Runtime](https://dotnet.microsoft.com/en-us/download/dotnet/9.0) (latest version).

8. Install the [DirectX End-User Runtime](https://www.microsoft.com/en-us/download/details.aspx?id=35).

---

**Before moving on**, confirm that Steam shows both **Cyberpunk 2077: REDmod** and **Cyberpunk 2077: Phantom Liberty** as installed.

---

## Installation

*Wabbajack gallery listing coming soon. Installation steps will be filled in here once the list is published.*

### Quick Overview

1. Download [Wabbajack](https://www.wabbajack.org) and place it somewhere outside your Cyberpunk folder and outside `Program Files`.
   > Example: `D:\Wabbajack`

2. Launch Wabbajack, go to **Browse Modlists**, and search for **PunkCity**.

3. Set your install paths:
   - **Installation:** e.g. `D:\Wabbajack\PunkCity`
   - **Downloads:** e.g. `D:\Wabbajack\downloads`

   > ⚠️ Both paths must be on the **same drive** as your Cyberpunk install, and **not** inside the game directory or `Program Files`.

4. Hit **Install** and let Wabbajack handle the rest.

5. Once complete, open the install folder and launch `ModOrganizer.exe`.

6. Confirm the profile is set to **PunkCity**, then hit **Run**.

---

## Post-Installation

### Antivirus

> [!WARNING]
> Third-party antivirus software (BitDefender, Norton, Webroot, etc.) can interfere with MO2's Virtual File System. If you're experiencing issues, you may need to disable or remove it. Windows Defender with sensible browsing habits is sufficient.

If you're using Windows Defender, add your PunkCity install folder as an exclusion:

<details>
<summary>How to add a Windows Defender exclusion</summary>

1. Open **Windows Security**
2. Go to **Virus & threat protection**
3. Click **Manage settings**
4. Scroll to **Exclusions** → **Add or remove exclusions**
5. Add your PunkCity installation folder
6. Optionally also exclude `ModOrganizer.exe` and `Cyberpunk2077.exe`

</details>

Disable all overlays from Steam, Discord, GPU software, and Xbox Game Bar before launching.

---

# Core Mods

These are the pillars that define how **PunkCity** plays. They are designed to work together; removing or replacing any of them will break the intended experience.

## • Immersion Mods

* ### [Dark Future](https://www.nexusmods.com/cyberpunk2077/mods/16300)

The foundation of the survival experience. It reminds you that no matter how chromed up you are, you’re still human.
** **Survival Mechanics:** Active requirements for eating, drinking, and sleeping.
** **Nerve System:** A dynamic meter that drains over time (faster in combat), applying escalating debuffs.
** **Quest Integration:** Certain story beats lock your Nerve meter, forcing you to endure high-pressure situations.

* ### [Take a Breather](https://www.nexusmods.com/cyberpunk2077/mods/23290)

Reframes the game from a frantic sprint to a calculated climb by pacing the narrative.
** **Social Pass System:** Services, Ripperdocs, and apartments are gated behind your Street Cred.
** **Narrative Pacing:** Quests "breathe" with realistic delays, giving you time to build your reputation between major jobs.
** **Living World:** Forces you to actually exist in Night City rather than just teleporting between waypoints.

* ### [Pariah](https://www.nexusmods.com/cyberpunk2077/mods/15014)

A consequence system that tracks the "monster" you become.
** **Reputation Loss:** Witnessed civilian deaths and executions shatter public trust.
** **Heat System:** High infamy causes police to attack on sight and civilians to flee your presence.
** **Moral Choice:** Forces a decision between being a respected mercenary or a feared butcher.

---

*More mods will be documented here as the list grows.*

---

## Updating the Modlist

1. Download the latest `.wabbajack` file.
2. Follow the installation steps from step 2 onward.
3. **Check the `Overwrite` box** before installing so updated files are properly replaced.

> [!WARNING]
> If you've added your own mods, tag them with `[NoDelete]` in MO2 to protect them across updates.

---

## Known Issues

> This section will be updated as the list develops.

*No known issues at this time.*

---

*PunkCity is an unofficial Wabbajack modlist and is not affiliated with CD Projekt Red or any individual mod authors. All credit for included mods belongs to their respective creators.*
